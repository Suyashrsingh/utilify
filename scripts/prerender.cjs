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
    pdfmerge: "merge-pdf",
    pdfsplit: "split-pdf",
    pdfrotate: "rotate-pdf",
    imagetopdf: "image-to-pdf",
    pdftoimage: "pdf-to-image",
    pdfcompress: "compress-pdf",
    pdfprotect: "protect-pdf",
    pdfunlock: "unlock-pdf",
    pdfremove: "remove-pdf-pages",
    digisign: "sign-pdf",
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

// Rich HowTo Schema Definitions for High-Converting Google Search Cards
const toolHowToSteps = {
    pdfmerge: {
        name: "How to Merge Multiple PDF Files Online for Free",
        description: "Combine multiple PDF documents into a single PDF file locally in your browser with zero server uploads.",
        steps: [
            { name: "Upload or Drop PDF Files", text: "Select or drag-and-drop multiple PDF files from your device into the upload dropzone." },
            { name: "Reorder Documents", text: "Arrange your PDF files in the exact sequence you want them merged." },
            { name: "Merge & Download", text: "Click 'Merge & Download PDF'. Your files are compiled instantly inside your browser RAM without uploading." }
        ]
    },
    imagetopdf: {
        name: "How to Convert Images to PDF Online",
        description: "Convert JPG, PNG, and WebP images into a single PDF document client-side.",
        steps: [
            { name: "Select Images", text: "Choose or drag-and-drop your JPG, PNG, or WebP images into the tool." },
            { name: "Configure Layout", text: "Set orientation, page margins, and fit options for your PDF document." },
            { name: "Convert & Save", text: "Click 'Convert to PDF' and download your freshly created document instantly." }
        ]
    },
    pdfcompress: {
        name: "How to Compress and Reduce PDF File Size Online",
        description: "Reduce PDF document file size with high visual quality in local browser memory.",
        steps: [
            { name: "Select PDF Document", text: "Upload the PDF file you wish to compress from your computer or phone." },
            { name: "Choose Compression Level", text: "Select your preferred compression quality (Extreme, Recommended, or Low Compression)." },
            { name: "Download Compressed PDF", text: "Click 'Compress PDF' and save the optimized, smaller PDF file immediately." }
        ]
    },
    pdfsplit: {
        name: "How to Split PDF Pages Online",
        description: "Extract specific pages or page ranges from a PDF document privately.",
        steps: [
            { name: "Upload PDF", text: "Drop your PDF file into the browser workspace." },
            { name: "Specify Page Range", text: "Enter the page numbers or ranges you wish to extract (e.g. 1-3, 5)." },
            { name: "Export Split PDF", text: "Click 'Split PDF' to generate and download your extracted pages immediately." }
        ]
    },
    pdftoimage: {
        name: "How to Convert PDF Pages to JPG and PNG Images",
        description: "Extract high-resolution image files from PDF pages client-side.",
        steps: [
            { name: "Open PDF Document", text: "Select the PDF file you want to convert into images." },
            { name: "Choose Image Format", text: "Select PNG or JPG and set your desired DPI or resolution scale." },
            { name: "Download Images", text: "Render all pages or specific pages and download as single images or a ZIP archive." }
        ]
    },
    pdfrotate: {
        name: "How to Permanently Rotate PDF Pages",
        description: "Rotate individual pages or entire PDF documents 90, 180, or 270 degrees.",
        steps: [
            { name: "Select PDF", text: "Upload the PDF document needing page orientation adjustment." },
            { name: "Select Rotation Angle", text: "Rotate individual pages or all pages 90° clockwise or counterclockwise." },
            { name: "Save Rotated PDF", text: "Download the permanently rotated PDF file directly to your device." }
        ]
    },
    pdfprotect: {
        name: "How to Password Protect and Encrypt a PDF",
        description: "Add a secure password and encryption to your PDF document client-side.",
        steps: [
            { name: "Select PDF", text: "Choose the confidential PDF document you want to secure." },
            { name: "Enter Strong Password", text: "Type in your chosen user password and confirm it." },
            { name: "Download Encrypted PDF", text: "Click 'Protect PDF' to encrypt locally and download the password-protected file." }
        ]
    },
    pdfunlock: {
        name: "How to Unlock and Remove Passwords from PDF",
        description: "Remove passwords and security restrictions from PDF files client-side.",
        steps: [
            { name: "Upload Locked PDF", text: "Select the password-protected PDF document." },
            { name: "Enter Current Password", text: "Provide the decryption password to unlock the document." },
            { name: "Save Unlocked PDF", text: "Download the unrestricted, decrypted PDF file." }
        ]
    },
    pdfremove: {
        name: "How to Remove Pages from a PDF",
        description: "Delete unwanted pages or blank sheets from any PDF file.",
        steps: [
            { name: "Upload PDF", text: "Drop your PDF file into the page remover workspace." },
            { name: "Select Pages to Remove", text: "Click the pages or enter page numbers you want deleted." },
            { name: "Download Clean PDF", text: "Export and save your modified PDF without the deleted pages." }
        ]
    },
    digisign: {
        name: "How to Digitally Sign a PDF Online",
        description: "Create an electronic signature and stamp it onto PDF documents securely.",
        steps: [
            { name: "Upload Document", text: "Open the PDF document you need to sign in the viewer." },
            { name: "Create Your Signature", text: "Draw your signature with your mouse/touchscreen, type your name, or upload an image." },
            { name: "Stamp & Download", text: "Place the signature on the required page and download the signed PDF." }
        ]
    }
};

// High-Intent Search Aliases to Pre-render
const aliasPages = [
    {
        aliasSlug: "jpg-to-pdf",
        toolKey: "imagetopdf",
        title: "JPG to PDF - Convert JPG Images to PDF Online Free | Utilify",
        description: "Convert JPG to PDF online free. Combine multiple JPG images into a single PDF document in seconds with zero file uploads and 100% privacy.",
        canonicalUrl: "https://utilify.co.in/tools/jpg-to-pdf"
    },
    {
        aliasSlug: "pdf-to-jpg",
        toolKey: "pdftoimage",
        title: "PDF to JPG - Convert PDF Pages to JPG Online Free | Utilify",
        description: "Convert PDF to JPG online free. Extract high-resolution JPG images from each page of your PDF document directly inside your browser memory.",
        canonicalUrl: "https://utilify.co.in/tools/pdf-to-jpg"
    },
    {
        aliasSlug: "pdf-merger",
        toolKey: "pdfmerge",
        title: "PDF Merger - Combine Multiple PDF Files Online Free | Utilify",
        description: "Merge multiple PDF files into one single document client-side in seconds with complete privacy. 100% free with no uploads.",
        canonicalUrl: "https://utilify.co.in/tools/merge-pdf"
    },
    {
        aliasSlug: "pdf-compressor",
        toolKey: "pdfcompress",
        title: "PDF Compressor - Reduce PDF File Size Online Free | Utilify",
        description: "Compress PDF documents online free without uploading. Reduce file size client-side while preserving crystal-clear quality.",
        canonicalUrl: "https://utilify.co.in/tools/compress-pdf"
    },
    {
        aliasSlug: "pdf-splitter",
        toolKey: "pdfsplit",
        title: "PDF Splitter - Extract PDF Pages Online Free | Utilify",
        description: "Split PDF files and extract custom page ranges client-side without sending your documents to remote cloud servers.",
        canonicalUrl: "https://utilify.co.in/tools/split-pdf"
    },
    {
        aliasSlug: "image-to-pdf-converter",
        toolKey: "imagetopdf",
        title: "Image to PDF Converter - Convert Photos to PDF Free | Utilify",
        description: "Convert images to PDF documents online free. Private client-side image conversion with no file size limits.",
        canonicalUrl: "https://utilify.co.in/tools/image-to-pdf"
    },
    {
        aliasSlug: "pdf-to-image-converter",
        toolKey: "pdftoimage",
        title: "PDF to Image Converter - Extract Pages as Images Free | Utilify",
        description: "Convert PDF files into crisp PNG and JPG images client-side. Zero server uploads.",
        canonicalUrl: "https://utilify.co.in/tools/pdf-to-image"
    },
    {
        aliasSlug: "digital-signature-creator",
        toolKey: "digisign",
        title: "Digital Signature Creator - Sign PDFs Online Free | Utilify",
        description: "Create your digital signature and sign PDF documents online free with total privacy.",
        canonicalUrl: "https://utilify.co.in/tools/sign-pdf"
    }
];

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

function generateToolPage(toolKey, seoSlug, customTitle, customDesc, canonicalOverride) {
    const meta = toolRoutes[toolKey];
    if (!meta) return;

    const pageTitle = customTitle || meta.title;
    const pageDesc = customDesc || meta.description;
    const toolUrl = canonicalOverride || `https://utilify.co.in/tools/${seoSlug}`;
    const cleanTitle = escapeHtml(pageTitle);
    const cleanDesc = escapeHtml(pageDesc);

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

    // Injected Structured Data: WebApplication + BreadcrumbList + FAQPage + HowTo
    const toolNameShort = pageTitle.split(' - ')[0].trim();

    const howToData = toolHowToSteps[toolKey] || {
        name: `How to Use ${toolNameShort} Online`,
        description: cleanDesc,
        steps: [
            { name: `Enter Inputs or Select Files`, text: `Open ${toolNameShort} and enter your content or select your input files in the workspace.` },
            { name: `Configure Settings`, text: `Customize formatting, conversion parameters, or options to suit your preferences.` },
            { name: `Generate and Export`, text: `Click the action button to process your data client-side and copy or download the results immediately.` }
        ]
    };

    const schemaGraph = [
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
        },
        {
            "@type": "FAQPage",
            "@id": `${toolUrl}#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `Is the ${toolNameShort} tool free to use on Utilify?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `Yes, ${toolNameShort} on Utilify is 100% free with no usage limits, no credit card, and no signups required. All tasks execute directly inside your web browser.`
                    }
                },
                {
                    "@type": "Question",
                    "name": `Are my files uploaded to a server when using ${toolNameShort}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `No. Utilify is an offline-first privacy platform. Your files, text, and inputs are processed locally in your browser memory and are never uploaded to any remote server or cloud database.`
                    }
                },
                {
                    "@type": "Question",
                    "name": `How does ${toolNameShort} work?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `${cleanDesc} Simply open the tool, input your content or choose your files, apply your preferred settings, and download or copy the result instantly.`
                    }
                }
            ]
        },
        {
            "@type": "HowTo",
            "@id": `${toolUrl}#howto`,
            "name": howToData.name,
            "description": howToData.description,
            "totalTime": "PT1M",
            "step": howToData.steps.map((st, sIdx) => ({
                "@type": "HowToStep",
                "position": sIdx + 1,
                "name": st.name,
                "text": st.text,
                "url": `${toolUrl}#step${sIdx + 1}`
            }))
        }
    ];

    const schemaTag = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph })}</script>`;
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

// 1. Generate Pre-rendered Static Pages for all 63 Canonical Tools
for (const [toolKey, seoSlug] of Object.entries(seoToolUrls)) {
    generateToolPage(toolKey, seoSlug);
}

// 2. Generate Pre-rendered Static Pages for High-Intent Search Aliases
for (const alias of aliasPages) {
    generateToolPage(alias.toolKey, alias.aliasSlug, alias.title, alias.description, alias.canonicalUrl);
}

// 3. Generate Pre-rendered Static Pages for the 6 views (about, privacy, terms, disclaimer, sitemap, contact)
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

console.log(`[Pre-renderer] Generated ${generatedToolsCount} static tool/alias pages and ${generatedViewsCount} static view pages!`);
