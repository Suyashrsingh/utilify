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

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace header and footer sitemaps/standard paths
html = html.replace(/href="#\/about"/g, 'href="/about"');
html = html.replace(/href="#\/privacy"/g, 'href="/privacy"');
html = html.replace(/href="#\/terms"/g, 'href="/terms"');
html = html.replace(/href="#\/disclaimer"/g, 'href="/disclaimer"');
html = html.replace(/href="#\/sitemap"/g, 'href="/sitemap"');
html = html.replace(/href="#\/contact"/g, 'href="/contact"');
html = html.replace(/href="#\/home"/g, 'href="/"');

// 2. Replace tool paths
const regex = /href="#\/tools\/([a-zA-Z0-9_-]+)"/g;
let replacedCount = 0;
html = html.replace(regex, (match, toolKey) => {
    if (seoToolUrls[toolKey]) {
        replacedCount++;
        return `href="/tools/${seoToolUrls[toolKey]}"`;
    }
    return match;
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`Replaced standard routes and ${replacedCount} tool URLs inside index.html with clean path SEO URLs!`);
