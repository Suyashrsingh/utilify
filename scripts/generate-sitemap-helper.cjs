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

const views = ["about", "privacy", "terms", "disclaimer", "sitemap", "contact"];

const today = new Date().toISOString().split('T')[0];

// 1. Generate sitemap.xml
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Primary Landing Page -->
  <url>
    <loc>https://utilify.co.in/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

views.forEach(view => {
    sitemap += `  <!-- View: ${view} -->
  <url>
    <loc>https://utilify.co.in/${view}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
});

for (const toolKey in seoToolUrls) {
    const seoSlug = seoToolUrls[toolKey];
    sitemap += `  <!-- Tool: ${toolKey} -->
  <url>
    <loc>https://utilify.co.in/tools/${seoSlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
}

sitemap += `</urlset>\n`;

const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
const rootSitemapPath = path.join(__dirname, '../sitemap.xml');

fs.writeFileSync(publicSitemapPath, sitemap, 'utf8');
fs.writeFileSync(rootSitemapPath, sitemap, 'utf8');
console.log('Successfully generated clean History API paths sitemap.xml in public/ and root folders!');

// 2. Generate llms.txt for AI crawlers (GEO / AEO) with clean URLs
let llmsTxt = `# Utilify - Premium Offline-First Toolbox

Utilify is a privacy-focused collection of 63+ offline-first browser utilities designed for developers, creators, and students. All operations, computations, and conversions run completely client-side in the browser memory, ensuring 100% data security.

## Core Resources

- [Utilify Home](https://utilify.co.in/) - Main application dashboard and tool directory.
- [HTML Sitemap Directory](https://utilify.co.in/sitemap) - Category-wise directory of all 63 utilities.
- [About Utilify](https://utilify.co.in/about) - Architecture details, privacy safeguards, and credit attributions.
- [Contact Us](https://utilify.co.in/contact) - Direct support inquiry form and credits details.
- [Privacy Policy](https://utilify.co.in/privacy) - Privacy policies confirming offline local storage operation.
- [Terms of Service](https://utilify.co.in/terms) - Platform usage terms.
- [General Disclaimer](https://utilify.co.in/disclaimer) - Cryptographic and formatting limitations.

---

## Utility Tools Directory

`;

for (const [toolKey, slug] of Object.entries(seoToolUrls)) {
    const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    llmsTxt += `- [${formattedName}](https://utilify.co.in/tools/${slug}) - Clean offline-first browser utility.\n`;
}

const publicLlmsPath = path.join(__dirname, '../public/llms.txt');
const rootLlmsPath = path.join(__dirname, '../llms.txt');

fs.writeFileSync(publicLlmsPath, llmsTxt, 'utf8');
fs.writeFileSync(rootLlmsPath, llmsTxt, 'utf8');
console.log('Successfully generated clean llms.txt in public/ and root folders!');
