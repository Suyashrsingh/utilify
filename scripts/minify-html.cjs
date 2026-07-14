const fs = require('fs');
const path = require('path');

const distHtmlPath = path.join(__dirname, '../dist/index.html');

if (!fs.existsSync(distHtmlPath)) {
    console.error(`Error: Compiled HTML file not found at ${distHtmlPath}`);
    process.exit(1);
}

const rawHtml = fs.readFileSync(distHtmlPath, 'utf8');

function safeMinifyHtml(html) {
    const placeholders = [];
    let counter = 0;
    
    // Protect <pre>, <textarea>, <script>, <style> tags
    const protectRegex = /<(pre|textarea|script|style)\b[^>]*>([\s\S]*?)<\/\1>/gi;
    
    let protectedHtml = html.replace(protectRegex, (match) => {
        const key = `__PROTECTED_BLOCK_${counter++}__`;
        placeholders.push({ key, content: match });
        return key;
    });
    
    // Remove HTML comments
    protectedHtml = protectedHtml.replace(/<!--[\s\S]*?-->/g, '');
    
    // Collapse multiple whitespaces
    protectedHtml = protectedHtml.replace(/\s+/g, ' ');
    
    // Remove whitespace between tags
    protectedHtml = protectedHtml.replace(/>\s+</g, '><');
    
    // Restore protected blocks in reverse order
    for (let i = placeholders.length - 1; i >= 0; i--) {
        const item = placeholders[i];
        protectedHtml = protectedHtml.replace(item.key, item.content);
    }
    
    return protectedHtml.trim();
}

console.log(`[HTML Minifier] Original compiled HTML size: ${(rawHtml.length / 1024).toFixed(2)} KB`);
const minified = safeMinifyHtml(rawHtml);
fs.writeFileSync(distHtmlPath, minified, 'utf8');
console.log(`[HTML Minifier] Minified compiled HTML size: ${(minified.length / 1024).toFixed(2)} KB (Saved: ${((rawHtml.length - minified.length) / 1024).toFixed(2)} KB)`);
