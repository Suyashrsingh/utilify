const fs = require('fs');
const path = require('path');

const seoToolUrls = {
    social: "social-media-text-formatter",
    rich: "rich-text-editor",
    words: "word-counter-readability-analyzer",
    case: "smart-case-converter",
    slug: "seo-url-slug-generator",
    qr: "custom-qr-code-generator",
    imgcomp: "image-compressor",
    pdfmerge: "pdf-merger",
    pdfsplit: "pdf-splitter",
    pdfrotate: "pdf-page-rotator",
    imagetopdf: "image-to-pdf-converter",
    pdftoimage: "pdf-to-image-converter",
    pdfcompress: "pdf-compressor",
    pdfprotect: "pdf-password-protector",
    pdfunlock: "pdf-password-remover",
    pdfremove: "pdf-page-remover",
    digisign: "digital-signature-creator",
    imgwatermark: "image-watermark-tool",
    htmltopdf: "html-to-pdf-converter",
    htmltoimage: "html-to-image-converter",
    imgresize: "image-resizer",
    imgcrop: "image-cropper",
    imgconvert: "image-format-converter",
    svgtopng: "svg-to-png-converter",
    pngtosvg: "png-to-svg-converter",
    imgtobase64: "image-to-base64-converter",
    exif: "exif-data-viewer-remover",
    imgmerge: "image-merger-stitcher",
    scicalc: "scientific-calculator",
    cgpacalc: "cgpa-calculator",
    percentcalc: "percentage-calculator",
    attendcalc: "attendance-calculator",
    emicalc: "emi-loan-calculator",
    gstcalc: "gst-tax-calculator",
    loancalc: "simple-loan-calculator",
    agecalc: "age-date-of-birth-calculator",
    datediff: "date-difference-calculator",
    unitconv: "universal-unit-converter",
    uuid: "uuid-v4-guid-generator",
    password: "secure-random-password-generator",
    lorem: "lorem-ipsum-text-generator",
    textutils: "regex-search-replace-text-cleaner",
    metatag: "meta-tags-seo-generator",
    robotstxt: "robots-txt-generator",
    json: "json-prettifier-validator",
    yamljson: "yaml-to-json-converter",
    jwt: "jwt-debugger-decoder-encoder",
    base64: "base64-encoder-decoder",
    url: "url-encoder-decoder",
    hash: "cryptographic-hash-generator",
    diff: "text-diff-checker-comparison",
    dockerfile: "dockerfile-generator-builder",
    compose: "docker-compose-generator-builder",
    ghactions: "github-actions-workflow-generator",
    nginx: "nginx-config-generator-builder",
    iam: "aws-iam-policy-generator-builder",
    cron: "crontab-schedule-generator-helper",
    linuxcmd: "linux-command-helper-reference",
    colorconv: "color-converter-hex-rgb-hsl",
    boxshadow: "css-box-shadow-generator-builder",
    gradient: "css-gradient-background-generator",
    cipher: "caesar-rot13-vigenere-cipher",
    pwdinspector: "password-strength-inspector-analyzer"
};

// Read routes and toolRoutes directly from app.js to ensure 100% synchronization
const appJsPath = path.join(__dirname, '../app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

const routesMatch = appJsContent.match(/const routes = \{([\s\S]*?)\n\s*\};/);
const toolRoutesMatch = appJsContent.match(/const toolRoutes = \{([\s\S]*?)\n\s*\};/);

let routes = {};
let toolRoutes = {};
eval('routes = {' + routesMatch[1] + '}');
eval('toolRoutes = {' + toolRoutesMatch[1] + '}');

const distPath = path.join(__dirname, '../dist');
const distHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(distHtmlPath)) {
    console.error(`Error: ${distHtmlPath} does not exist. Run vite build first.`);
    process.exit(1);
}

const templateHtml = fs.readFileSync(distHtmlPath, 'utf8');

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

let generatedToolsCount = 0;
let generatedViewsCount = 0;

// 1. Generate Pre-rendered Static Pages for all 63 Tools
for (const [toolKey, seoSlug] of Object.entries(seoToolUrls)) {
    const meta = toolRoutes[toolKey];
    if (!meta) continue;

    const toolUrl = `https://utilify.co.in/tools/${seoSlug}`;
    const cleanTitle = escapeHtml(meta.title);
    const cleanDesc = escapeHtml(meta.description);

    let html = templateHtml;

    // Update <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${cleanTitle}</title>`);

    // Update <meta name="description">
    html = html.replace(/<meta name="description" content="[\s\S]*?">/i, `<meta name="description" content="${cleanDesc}">`);

    // Update canonical link
    html = html.replace(/<link rel="canonical" href="[\s\S]*?">/i, `<link rel="canonical" href="${toolUrl}">`);

    // Update Open Graph tags
    html = html.replace(/<meta property="og:url" content="[\s\S]*?">/i, `<meta property="og:url" content="${toolUrl}">`);
    html = html.replace(/<meta property="og:title" content="[\s\S]*?">/i, `<meta property="og:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="og:description" content="[\s\S]*?">/i, `<meta property="og:description" content="${cleanDesc}">`);

    // Update Twitter Card tags
    html = html.replace(/<meta property="twitter:url" content="[\s\S]*?">/i, `<meta property="twitter:url" content="${toolUrl}">`);
    html = html.replace(/<meta property="twitter:title" content="[\s\S]*?">/i, `<meta property="twitter:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="twitter:description" content="[\s\S]*?">/i, `<meta property="twitter:description" content="${cleanDesc}">`);

    // Injected Structured Data: WebApplication + BreadcrumbList
    const toolNameShort = meta.title.split(' - ')[0].trim();
    const schemaJson = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "@id": `${toolUrl}#webapp`,
                "url": toolUrl,
                "name": cleanTitle,
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "description": cleanDesc,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "creator": {
                    "@type": "Person",
                    "name": "Rushikesh Wagh"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${toolUrl}#breadcrumbs`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://utilify.co.in/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Tools",
                        "item": "https://utilify.co.in/#tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": toolNameShort,
                        "item": toolUrl
                    }
                ]
            }
        ]
    });

    const schemaTag = `<script type="application/ld+json">${schemaJson}</script>`;
    html = html.replace('</head>', `${schemaTag}</head>`);

    // DOM Body modifications:
    // Demote home hero h1 to p on tool subpages so the tool title is the sole H1
    html = html.replace(/<h1\b([^>]*)class="([^"]*hero-title[^"]*)"([^>]*)>([\s\S]*?)<\/h1>/i, '<p$1class="$2"$3>$4</p>');

    // 1. Switch active view from view-home to view-tools
    html = html.replace('id="view-home" class="view-panel active-view"', 'id="view-home" class="view-panel"');
    html = html.replace('class="view-panel active-view" id="view-home"', 'class="view-panel" id="view-home"');
    html = html.replace('id="view-tools" class="view-panel"', 'id="view-tools" class="view-panel active-view"');
    html = html.replace('class="view-panel" id="view-tools"', 'class="view-panel active-view" id="view-tools"');

    // 2. Hide all other panels in view-tools and display the current tool panel
    html = html.replace(/class="panel active"/g, 'class="panel"');
    html = html.replace(`id="panel-${toolKey}" class="panel"`, `id="panel-${toolKey}" class="panel active" style="display:block;"`);
    html = html.replace(`class="panel" id="panel-${toolKey}"`, `class="panel active" id="panel-${toolKey}" style="display:block;"`);

    // 3. Highlight the active menu item in sidebar
    html = html.replace(/class="menu-item active" aria-current="page"/g, 'class="menu-item"');
    html = html.replace(/class="menu-item active"/g, 'class="menu-item"');
    html = html.replace(`data-panel="${toolKey}"`, `data-panel="${toolKey}" class="menu-item active" aria-current="page"`);

    // 4. Ensure the tool panel's main heading is treated as primary topic (h1)
    const panelStart = html.indexOf(`id="panel-${toolKey}"`);
    if (panelStart !== -1) {
        const nextH2 = html.indexOf('<h2', panelStart);
        const nextH2End = html.indexOf('</h2>', nextH2);
        const nextPanel = html.indexOf('id="panel-', panelStart + 15);
        if (nextH2 !== -1 && (nextPanel === -1 || nextH2 < nextPanel)) {
            const h2Substring = html.substring(nextH2, nextH2End + 5);
            const h1Replacement = h2Substring.replace('<h2', '<h1 class="tool-seo-heading" style="font-size: 1.75rem; font-weight: 700; margin: 0;"').replace('</h2>', '</h1>');
            html = html.substring(0, nextH2) + h1Replacement + html.substring(nextH2End + 5);
        }
    }

    const toolDir = path.join(distPath, 'tools', seoSlug);
    fs.mkdirSync(toolDir, { recursive: true });
    fs.writeFileSync(path.join(toolDir, 'index.html'), html, 'utf8');
    generatedToolsCount++;
}

// 2. Generate Pre-rendered Static Pages for the 6 views (about, privacy, terms, disclaimer, sitemap, contact)
const views = ["about", "privacy", "terms", "disclaimer", "sitemap", "contact"];

for (const viewName of views) {
    const meta = routes[viewName];
    if (!meta) continue;

    const viewUrl = `https://utilify.co.in/${viewName}`;
    const cleanTitle = escapeHtml(meta.title);
    const cleanDesc = escapeHtml(meta.description);

    let html = templateHtml;

    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${cleanTitle}</title>`);
    html = html.replace(/<meta name="description" content="[\s\S]*?">/i, `<meta name="description" content="${cleanDesc}">`);
    html = html.replace(/<link rel="canonical" href="[\s\S]*?">/i, `<link rel="canonical" href="${viewUrl}">`);
    html = html.replace(/<meta property="og:url" content="[\s\S]*?">/i, `<meta property="og:url" content="${viewUrl}">`);
    html = html.replace(/<meta property="og:title" content="[\s\S]*?">/i, `<meta property="og:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="og:description" content="[\s\S]*?">/i, `<meta property="og:description" content="${cleanDesc}">`);
    html = html.replace(/<meta property="twitter:url" content="[\s\S]*?">/i, `<meta property="twitter:url" content="${viewUrl}">`);
    html = html.replace(/<meta property="twitter:title" content="[\s\S]*?">/i, `<meta property="twitter:title" content="${cleanTitle}">`);
    html = html.replace(/<meta property="twitter:description" content="[\s\S]*?">/i, `<meta property="twitter:description" content="${cleanDesc}">`);

    // Injected BreadcrumbList
    const viewTitleShort = meta.title.split(' - ')[0].trim();
    const schemaJson = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://utilify.co.in/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": viewTitleShort,
                "item": viewUrl
            }
        ]
    });
    const schemaTag = `<script type="application/ld+json">${schemaJson}</script>`;
    html = html.replace('</head>', `${schemaTag}</head>`);

    // Demote home hero h1 to p on view subpages
    html = html.replace(/<h1\b([^>]*)class="([^"]*hero-title[^"]*)"([^>]*)>([\s\S]*?)<\/h1>/i, '<p$1class="$2"$3>$4</p>');

    // Switch active view
    html = html.replace('id="view-home" class="view-panel active-view"', 'id="view-home" class="view-panel"');
    html = html.replace('class="view-panel active-view" id="view-home"', 'class="view-panel" id="view-home"');
    html = html.replace(`id="view-${viewName}" class="view-panel"`, `id="view-${viewName}" class="view-panel active-view"`);
    html = html.replace(`class="view-panel" id="view-${viewName}"`, `class="view-panel active-view" id="view-${viewName}"`);

    // Upgrade this view's h2 to h1
    const viewStart = html.indexOf(`id="view-${viewName}"`);
    if (viewStart !== -1) {
        const nextH2 = html.indexOf('<h2', viewStart);
        const nextH2End = html.indexOf('</h2>', nextH2);
        if (nextH2 !== -1 && nextH2End !== -1) {
            const h2Sub = html.substring(nextH2, nextH2End + 5);
            const h1Sub = h2Sub.replace('<h2', '<h1').replace('</h2>', '</h1>');
            html = html.substring(0, nextH2) + h1Sub + html.substring(nextH2End + 5);
        }
    }

    const viewDir = path.join(distPath, viewName);
    fs.mkdirSync(viewDir, { recursive: true });
    fs.writeFileSync(path.join(viewDir, 'index.html'), html, 'utf8');
    generatedViewsCount++;
}

console.log(`[Pre-renderer] Generated ${generatedToolsCount} static tool pages and ${generatedViewsCount} static view pages!`);
