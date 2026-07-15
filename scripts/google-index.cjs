const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const credentialsPath = path.join(__dirname, '../service-account.json');

// 1. Load credentials
if (!fs.existsSync(credentialsPath)) {
    console.error('\x1b[31mError: service-account.json not found in the project root directory.\x1b[0m');
    console.log('Please download your Service Account key JSON file from Google Cloud Console, rename it to "service-account.json", and save it in the root folder.');
    process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// 2. Load URLs from sitemap
if (!fs.existsSync(sitemapPath)) {
    console.error(`\x1b[31mError: sitemap.xml not found at ${sitemapPath}\x1b[0m`);
    process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlRegex = /<loc>(https?:\/\/[^\s<]+)<\/loc>/g;
const urls = [];
let match;
while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
}

if (urls.length === 0) {
    console.error('\x1b[31mError: No URLs found in sitemap.xml\x1b[0m');
    process.exit(1);
}

console.log(`Found ${urls.length} URLs in sitemap.xml. Starting indexing request...`);

// Helper to sign JWT using native crypto
function signJWT(payload, privateKey) {
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    };
    const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const tokenInput = `${encode(header)}.${encode(payload)}`;
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(tokenInput);
    const signature = sign.sign(privateKey, 'base64url');
    return `${tokenInput}.${signature}`;
}

// Request access token from Google OAuth2
function getAccessToken() {
    return new Promise((resolve, reject) => {
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: credentials.client_email,
            scope: 'https://www.googleapis.com/auth/indexing',
            aud: 'https://oauth2.googleapis.com/token',
            exp: now + 3600,
            iat: now
        };

        const jwt = signJWT(payload, credentials.private_key);
        const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;

        const req = https.request({
            hostname: 'oauth2.googleapis.com',
            path: '/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const data = JSON.parse(body);
                if (data.access_token) {
                    resolve(data.access_token);
                } else {
                    reject(new Error(body));
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Submit a URL to Google Indexing API
function submitToGoogle(url, token) {
    return new Promise((resolve) => {
        const postData = JSON.stringify({
            url: url,
            type: 'URL_UPDATED'
        });

        const req = https.request({
            hostname: 'indexing.googleapis.com',
            path: '/v3/urlNotifications:publish',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`\x1b[32m[SUCCESS]\x1b[0m Submitted: ${url}`);
                } else {
                    console.error(`\x1b[31m[FAILED]\x1b[0m ${url} - Status ${res.statusCode}: ${body}`);
                }
                resolve();
            });
        });

        req.on('error', (err) => {
            console.error(`\x1b[31m[ERROR]\x1b[0m ${url}: ${err.message}`);
            resolve();
        });

        req.write(postData);
        req.end();
    });
}

// Execute batch sequentially to avoid rate-limiting
async function run() {
    try {
        console.log('Authenticating with Google OAuth...');
        const token = await getAccessToken();
        console.log('Authentication successful! Submitting URLs...');

        for (let i = 0; i < urls.length; i++) {
            await submitToGoogle(urls[i], token);
            // Small delay between requests to avoid overloading
            await new Promise(r => setTimeout(r, 200));
        }

        console.log('\n\x1b[32mIndexing requests processing finished!\x1b[0m');
    } catch (err) {
        console.error('\x1b[31mAuthentication Failed:\x1b[0m', err.message);
    }
}

run();
