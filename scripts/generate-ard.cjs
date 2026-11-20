const fs = require('fs');
const path = require('path');

// Complete metadata dictionary for all tools and views
const ardEntries = [
    {
        slug: "sign-pdf",
        name: "Sign PDF Online Free",
        category: "pdf",
        description: "Sign PDF documents online free with zero signup or file uploads. Draw, type, or upload digital signatures and edit signed PDFs in private browser memory.",
        queries: ["sign pdf online free", "pdf signature creator", "online signature pdf", "signed pdf edit", "digital signature online"]
    },
    {
        slug: "merge-pdf",
        name: "Merge PDF",
        category: "pdf",
        description: "Combine multiple PDF documents into a single organized file in local browser memory without server uploads.",
        queries: ["merge pdf online free", "combine pdf files", "merge pdf without upload", "pdf joiner"]
    },
    {
        slug: "compress-pdf",
        name: "Compress PDF",
        category: "pdf",
        description: "Reduce PDF document file size with high visual quality in local browser memory without privacy leaks.",
        queries: ["compress pdf online free", "reduce pdf size", "shrink pdf file", "pdf size reducer"]
    },
    {
        slug: "pdf-to-image",
        name: "PDF to Image Converter",
        category: "pdf",
        description: "Extract and convert PDF pages into high-resolution JPG or PNG images client-side with 100% data privacy.",
        queries: ["pdf to image", "pdf to image converter", "pdf to jpg", "convert pdf to png free"]
    },
    {
        slug: "image-to-pdf",
        name: "Image to PDF Converter",
        category: "pdf",
        description: "Convert JPG, PNG, and WebP images to a clean, paginated PDF document directly in browser memory.",
        queries: ["image to pdf", "jpg to pdf converter online", "image to pdf converter free", "jpg to pdf"]
    },
    {
        slug: "split-pdf",
        name: "Split PDF",
        category: "pdf",
        description: "Extract specific page ranges or split individual pages from PDF documents securely client-side.",
        queries: ["split pdf online free", "extract pages from pdf", "separate pdf pages", "pdf cutter"]
    },
    {
        slug: "rotate-pdf",
        name: "Rotate PDF",
        category: "pdf",
        description: "Permanently rotate individual pages or entire PDF files 90, 180, or 270 degrees client-side.",
        queries: ["rotate pdf online free", "turn pdf pages", "fix pdf orientation", "rotate pdf permanently"]
    },
    {
        slug: "protect-pdf",
        name: "Protect PDF Online",
        category: "pdf",
        description: "Encrypt and password protect confidential PDF documents client-side using strong local cryptography.",
        queries: ["protect pdf", "protect pdf online", "add password to pdf", "encrypt pdf free"]
    },
    {
        slug: "unlock-pdf",
        name: "Unlock PDF",
        category: "pdf",
        description: "Remove passwords and security restrictions from encrypted PDF documents client-side.",
        queries: ["unlock pdf online free", "remove password from pdf", "decrypt pdf", "pdf password remover"]
    },
    {
        slug: "remove-pdf-pages",
        name: "Remove PDF Pages",
        category: "pdf",
        description: "Delete unwanted pages or blank sheets from any PDF document client-side without re-uploading.",
        queries: ["remove pages from pdf", "delete pdf pages online", "discard pdf pages", "clean pdf document"]
    },
    {
        slug: "image-compressor",
        name: "Image Compressor",
        category: "image",
        description: "Compress and optimize JPEG, PNG, and WebP images client-side directly in browser memory.",
        queries: ["compress image online free", "reduce photo size", "image optimizer", "compress png jpg"]
    },
    {
        slug: "image-resizer",
        name: "Image Resizer",
        category: "image",
        description: "Resize photos and image dimensions to custom pixels or percentages with aspect ratio lock.",
        queries: ["resize image online", "photo dimension resizer", "scale image pixels", "image size changer"]
    },
    {
        slug: "image-cropper",
        name: "Image Cropper",
        category: "image",
        description: "Crop pictures and graphics with custom aspect ratios (1:1, 16:9, 4:3) and visual preview controls.",
        queries: ["crop image online free", "photo cropper", "crop square image", "picture cutter"]
    },
    {
        slug: "image-format-converter",
        name: "Image Format Converter",
        category: "image",
        description: "Convert images seamlessly between PNG, JPG, WebP, GIF, and BMP formats in browser canvas.",
        queries: ["convert image format", "png to jpg converter", "webp to png", "image type converter"]
    },
    {
        slug: "svg-to-png-converter",
        name: "SVG to PNG Converter",
        category: "image",
        description: "Convert vector SVG graphics into high-resolution raster PNG images with custom DPI scaling.",
        queries: ["svg to png converter", "convert svg to raster", "export svg as png", "vector to png"]
    },
    {
        slug: "png-to-svg-converter",
        name: "PNG to SVG Converter",
        category: "image",
        description: "Vectorize PNG and JPG images into scalable SVG vector paths with auto-tracing.",
        queries: ["png to svg converter", "vectorize image free", "convert raster to svg", "image trace to svg"]
    },
    {
        slug: "image-to-base64-converter",
        name: "Image to Base64 Converter",
        category: "image",
        description: "Convert image files into Base64 data URI strings for CSS, HTML, and web applications.",
        queries: ["image to base64", "convert photo to base64 uri", "base64 image encoder", "data uri generator"]
    },
    {
        slug: "exif-data-viewer-remover",
        name: "EXIF Data Viewer & Remover",
        category: "image",
        description: "View and strip GPS location, camera settings, and privacy metadata from photos before sharing.",
        queries: ["view exif data online", "remove photo gps metadata", "exif stripper", "photo privacy cleaner"]
    },
    {
        slug: "image-merger-stitcher",
        name: "Image Merger & Stitcher",
        category: "image",
        description: "Combine two or more images side-by-side (horizontally) or stacked (vertically) into a single picture.",
        queries: ["merge two images online", "stitch photos side by side", "combine pictures vertically", "photo joiner"]
    },
    {
        slug: "social-media-text-formatter",
        name: "Social Media Text Formatter",
        category: "text",
        description: "Convert plain text into bold, italic, gothic, and cursive Unicode fonts for LinkedIn, X, and Instagram.",
        queries: ["bold text for linkedin", "italic text generator", "fancy font converter", "social media fonts"]
    },
    {
        slug: "rich-text-editor",
        name: "Rich Text Editor",
        category: "text",
        description: "Browser-based WYSIWYG rich text editor with HTML, Markdown, and formatted clipboard export.",
        queries: ["online rich text editor", "wysiwyg web editor", "format text online", "html rich text builder"]
    },
    {
        slug: "word-counter-readability-analyzer",
        name: "Word Counter & Readability Analyzer",
        category: "text",
        description: "Calculate words, characters, sentences, reading time, and Flesch Reading Ease scores in real-time.",
        queries: ["word counter online", "character count tool", "flesch reading ease score", "readability checker"]
    },
    {
        slug: "smart-case-converter",
        name: "Smart Case Converter",
        category: "text",
        description: "Convert text capitalization between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
        queries: ["case converter online", "title case converter", "camelCase converter", "snake_case to camelCase"]
    },
    {
        slug: "seo-url-slug-generator",
        name: "SEO URL Slug Generator",
        category: "text",
        description: "Convert titles and article headlines into clean, URL-safe, hyphenated slugs for web optimization.",
        queries: ["url slug generator", "seo slug creator", "clean url builder", "generate slug from title"]
    },
    {
        slug: "lorem-ipsum-text-generator",
        name: "Lorem Ipsum Text Generator",
        category: "text",
        description: "Generate customizable placeholder text paragraphs, sentences, words, and list items for mockups.",
        queries: ["lorem ipsum generator", "placeholder text builder", "dummy text generator", "latin filler text"]
    },
    {
        slug: "regex-search-replace-text-cleaner",
        name: "Regex Search & Replace Text Cleaner",
        category: "text",
        description: "Powerful regular expression pattern tester, bulk replacement, and text sanitization utility.",
        queries: ["regex tester online", "regular expression replace", "regex string cleaner", "text regex search"]
    },
    {
        slug: "json-prettifier-validator",
        name: "JSON Prettifier & Validator",
        category: "developer",
        description: "Prettify, validate, format, and minify JSON data structures with syntax highlighting and tree view.",
        queries: ["json prettifier online", "json validator free", "format json payload", "json lint validator"]
    },
    {
        slug: "yaml-to-json-converter",
        name: "YAML to JSON Converter",
        category: "developer",
        description: "Bi-directional conversion between YAML and JSON formatted documents client-side.",
        queries: ["yaml to json converter", "json to yaml online", "convert yaml to json", "yaml parser"]
    },
    {
        slug: "jwt-debugger-decoder-encoder",
        name: "JWT Debugger & Decoder",
        category: "developer",
        description: "Decode and inspect JSON Web Tokens (JWT) headers, claims, expiration timestamps, and payloads locally.",
        queries: ["jwt decoder online", "jwt debugger free", "decode json web token", "inspect jwt claims"]
    },
    {
        slug: "base64-encoder-decoder",
        name: "Base64 Encoder & Decoder",
        category: "developer",
        description: "Encode and decode UTF-8 text strings and binary data into Base64 representations securely.",
        queries: ["base64 encoder online", "base64 decoder free", "convert string to base64", "decode base64 text"]
    },
    {
        slug: "url-encoder-decoder",
        name: "URL Encoder & Decoder",
        category: "developer",
        description: "Encode URI components and decode percent-encoded URLs according to RFC 3986 standards.",
        queries: ["url encoder online", "url decoder tool", "percent encode url", "decode uri component"]
    },
    {
        slug: "cryptographic-hash-generator",
        name: "Cryptographic Hash Generator",
        category: "security",
        description: "Compute MD5, SHA-1, SHA-256, and SHA-512 cryptographic digests using the native Web Crypto API.",
        queries: ["sha256 hash generator", "md5 generator online", "sha512 checksum tool", "cryptographic hash online"]
    },
    {
        slug: "text-diff-checker-comparison",
        name: "Text Diff Checker & Comparison",
        category: "developer",
        description: "Side-by-side text and code difference viewer with line-by-line and word-by-word visual highlighting.",
        queries: ["text diff checker", "compare two texts online", "code diff comparison", "diff viewer free"]
    },
    {
        slug: "dockerfile-generator-builder",
        name: "Dockerfile Generator & Builder",
        category: "developer",
        description: "Generate multi-stage production-ready Dockerfiles for Node.js, Python, Go, Rust, Java, and PHP.",
        queries: ["dockerfile generator", "build dockerfile online", "docker container config builder", "dockerfile template"]
    },
    {
        slug: "docker-compose-generator-builder",
        name: "Docker Compose Generator",
        category: "developer",
        description: "Interactive visual builder for multi-service docker-compose.yml files with databases and caching.",
        queries: ["docker compose generator", "docker compose builder", "generate docker-compose.yml", "docker compose template"]
    },
    {
        slug: "github-actions-workflow-generator",
        name: "GitHub Actions Workflow Generator",
        category: "developer",
        description: "Create CI/CD workflow YAML pipelines for automated testing, linting, building, and deployment.",
        queries: ["github actions generator", "ci cd workflow builder", "github workflow yaml creator", "actions template"]
    },
    {
        slug: "nginx-config-generator-builder",
        name: "Nginx Config Generator",
        category: "developer",
        description: "Generate secure, high-performance Nginx server blocks with reverse proxy, SSL, and gzip caching.",
        queries: ["nginx config generator", "nginx reverse proxy builder", "nginx configuration generator", "nginx conf template"]
    },
    {
        slug: "aws-iam-policy-generator-builder",
        name: "AWS IAM Policy Generator",
        category: "security",
        description: "Generate and validate least-privilege AWS IAM JSON policy documents for S3, EC2, Lambda, and DynamoDB.",
        queries: ["aws iam policy generator", "iam policy builder", "s3 bucket policy generator", "aws json policy creator"]
    },
    {
        slug: "crontab-schedule-generator-helper",
        name: "Crontab Schedule Generator",
        category: "developer",
        description: "Generate, visualize, and translate 5-part cron schedule expressions into plain English schedules.",
        queries: ["crontab generator", "cron expression generator", "cron schedule builder", "cron syntax translator"]
    },
    {
        slug: "linux-command-helper-reference",
        name: "Linux Command Helper & Reference",
        category: "developer",
        description: "Comprehensive cheat-sheet and search engine for everyday Linux bash commands, flags, and examples.",
        queries: ["linux command cheat sheet", "linux bash reference", "ubuntu commands list", "linux terminal helper"]
    },
    {
        slug: "color-converter-hex-rgb-hsl",
        name: "Color Converter (HEX, RGB, HSL)",
        category: "design",
        description: "Interactive color palette picker and instant converter between HEX, RGB, RGBA, HSL, and HSV formats.",
        queries: ["hex to rgb converter", "color code converter", "rgb to hsl converter", "color palette picker"]
    },
    {
        slug: "css-box-shadow-generator-builder",
        name: "CSS Box Shadow Generator",
        category: "design",
        description: "Design layered, smooth CSS box-shadows visually with blur, spread, elevation, and CSS export.",
        queries: ["css box shadow generator", "smooth shadow generator", "box shadow builder", "css shadow effect"]
    },
    {
        slug: "css-gradient-background-generator",
        name: "CSS Gradient Background Generator",
        category: "design",
        description: "Create beautiful linear and radial CSS gradients with multi-stop color pickers and CSS output.",
        queries: ["css gradient generator", "linear gradient builder", "radial gradient creator", "css background gradient"]
    },
    {
        slug: "custom-qr-code-generator",
        name: "Custom QR Code Generator",
        category: "marketing",
        description: "Create high-resolution vector SVG and PNG QR codes with custom error correction levels and colors.",
        queries: ["custom qr code generator", "qr code creator online free", "high resolution qr code", "vector qr generator"]
    },
    {
        slug: "meta-tags-seo-generator",
        name: "Meta Tags SEO Generator",
        category: "marketing",
        description: "Generate complete OpenGraph, Twitter Card, and Google Search meta tags with live snippet previews.",
        queries: ["meta tag generator", "open graph generator", "twitter card generator", "seo meta builder"]
    },
    {
        slug: "robots-txt-generator",
        name: "Robots.txt Generator",
        category: "marketing",
        description: "Build clean, crawlable robots.txt directives for Googlebot, Bingbot, and AI agent web crawlers.",
        queries: ["robots.txt generator", "create robots.txt online", "googlebot robots.txt builder", "robots directive creator"]
    },
    {
        slug: "scientific-calculator",
        name: "Scientific Calculator",
        category: "calculator",
        description: "Full-featured client-side scientific calculator supporting trigonometric functions, logarithms, and powers.",
        queries: ["scientific calculator online", "online math calculator", "trigonometry calculator", "scientific calc free"]
    },
    {
        slug: "cgpa-calculator",
        name: "CGPA Calculator",
        category: "calculator",
        description: "Calculate semester GPA and cumulative CGPA across university grading scales (10-point, 4-point).",
        queries: ["cgpa calculator online", "gpa calculator university", "calculate semester gpa", "cgpa to percentage"]
    },
    {
        slug: "percentage-calculator",
        name: "Percentage Calculator",
        category: "calculator",
        description: "Calculate percentage increases, percentage discounts, difference between values, and markups.",
        queries: ["percentage calculator online", "percent increase calculator", "percentage discount calculator", "calculate percent"]
    },
    {
        slug: "attendance-calculator",
        name: "Attendance Target Calculator",
        category: "calculator",
        description: "Calculate how many classes you must attend or can safely miss to maintain 75% or 80% college attendance.",
        queries: ["attendance calculator college", "75 percent attendance calculator", "how many classes can i miss", "bunk calculator"]
    },
    {
        slug: "emi-loan-calculator",
        name: "EMI Loan Calculator",
        category: "calculator",
        description: "Calculate monthly Equated Monthly Installment (EMI), total interest payable, and amortization schedules.",
        queries: ["emi calculator online", "home loan emi calculator", "car loan emi calculator", "monthly emi calculation"]
    },
    {
        slug: "gst-tax-calculator",
        name: "GST Tax Calculator",
        category: "calculator",
        description: "Calculate inclusive and exclusive Goods and Services Tax (GST) across 5%, 12%, 18%, and 28% tax slabs.",
        queries: ["gst calculator online", "calculate gst 18 percent", "gst reverse calculator", "gst tax calculation"]
    },
    {
        slug: "simple-loan-calculator",
        name: "Simple Loan Calculator",
        category: "calculator",
        description: "Compare total cost of loans, principal payback schedules, and interest rates for personal finances.",
        queries: ["loan calculator online", "personal loan calculator", "simple interest calculator", "loan comparison tool"]
    },
    {
        slug: "age-date-of-birth-calculator",
        name: "Age & Date of Birth Calculator",
        category: "calculator",
        description: "Calculate exact chronological age in years, months, weeks, days, hours, and minutes from birthdate.",
        queries: ["age calculator online", "calculate exact age from date of birth", "dob calculator", "chronological age finder"]
    },
    {
        slug: "date-difference-calculator",
        name: "Date Difference Calculator",
        category: "calculator",
        description: "Calculate exact number of days, weeks, months, and business working days between two dates.",
        queries: ["date difference calculator", "days between two dates", "business days calculator", "calculate days until"]
    },
    {
        slug: "universal-unit-converter",
        name: "Universal Unit Converter",
        category: "calculator",
        description: "Instant converter for length, mass, temperature, area, volume, digital storage, and time units.",
        queries: ["unit converter online", "length converter cm to inches", "kg to lbs converter", "metric unit converter"]
    },
    {
        slug: "uuid-v4-guid-generator",
        name: "UUID v4 & GUID Generator",
        category: "developer",
        description: "Generate cryptographically secure Version 4 UUIDs (Universally Unique Identifiers) in bulk.",
        queries: ["uuid generator online", "guid generator free", "generate random uuid v4", "bulk uuid creator"]
    },
    {
        slug: "secure-random-password-generator",
        name: "Secure Random Password Generator",
        category: "security",
        description: "Generate cryptographically secure random passwords and passphrases with entropy scores in browser memory.",
        queries: ["secure password generator", "random password creator", "generate strong password online", "crypto password maker"]
    },
    {
        slug: "caesar-rot13-vigenere-cipher",
        name: "AES & Classical Cipher Tool",
        category: "security",
        description: "Encrypt and decrypt text messages with AES-GCM, Caesar shift, ROT13, and Vigenère ciphers locally.",
        queries: ["caesar cipher online", "rot13 decoder", "vigenere cipher tool", "aes text encrypter"]
    },
    {
        slug: "password-strength-inspector-analyzer",
        name: "Password Strength Inspector",
        category: "security",
        description: "Analyze password security, Shannon entropy, crack time estimations, and common dictionary vulnerabilities.",
        queries: ["password strength checker", "test password security", "password entropy calculator", "how secure is my password"]
    },
    {
        slug: "jpg-to-pdf",
        name: "JPG to PDF Converter Free",
        category: "pdf",
        description: "Convert JPG and PNG images into clean PDF documents in seconds client-side with zero uploads.",
        queries: ["jpg to pdf", "convert jpg to pdf", "jpg to pdf converter online", "image to pdf free"]
    },
    {
        slug: "pdf-to-jpg",
        name: "PDF to JPG Converter Free",
        category: "pdf",
        description: "Extract high-resolution JPG images from each page of your PDF document directly inside your browser memory.",
        queries: ["pdf to jpg", "convert pdf to jpg", "pdf to jpg converter online free", "extract images from pdf"]
    },
    {
        slug: "pdf-to-text",
        name: "PDF to Text Converter Free",
        category: "pdf",
        description: "Extract text from PDF documents online 100% free with no sign-up. Fast in-browser text extraction with zero server uploads.",
        queries: ["pdf to text", "extract text from pdf", "pdf to txt", "convert pdf to text online free"]
    },
    {
        slug: "add-page-numbers-to-pdf",
        name: "Add Page Numbers to PDF",
        category: "pdf",
        description: "Add page numbers to PDF files online 100% free with custom position, format (Page X of Y), and font size in browser RAM.",
        queries: ["add page numbers to pdf", "number pdf pages", "pdf page numberer online free", "paginate pdf"]
    },
    {
        slug: "watermark-pdf",
        name: "Watermark PDF Online Free",
        category: "pdf",
        description: "Add watermark to PDF documents online 100% free with custom diagonal or horizontal text, opacity, and color in browser RAM.",
        queries: ["watermark pdf", "add watermark to pdf", "pdf watermark online free", "confidential stamp pdf"]
    },
    {
        slug: "text-to-pdf",
        name: "Text to PDF Converter Free",
        category: "pdf",
        description: "Convert plain text, notes, and code into formatted PDF documents online 100% free with instant in-browser generation.",
        queries: ["text to pdf", "convert text to pdf", "txt to pdf online free", "notes to pdf"]
    },
    {
        slug: "youtube-thumbnail-downloader",
        name: "YouTube Thumbnail Downloader Free",
        category: "creator",
        description: "Extract and download official original YouTube video and Shorts thumbnails in 4K, 1080p Full HD, and 720p with 1-click download.",
        queries: ["youtube thumbnail downloader", "download youtube thumbnail", "get youtube thumbnail hd", "youtube thumbnail grabber", "download yt thumbnail"]
    },
    {
        slug: "instagram-font-generator",
        name: "Instagram Font Generator Free",
        category: "social",
        description: "Generate 35+ stylish aesthetic, cursive, bold, and gothic Unicode fonts for your Instagram Bio, reels, and captions with 1-click copy.",
        queries: ["instagram fonts", "font generator for instagram", "fancy font for bio", "ig fonts generator", "aesthetic fonts instagram"]
    },
    {
        slug: "youtube-tag-extractor",
        name: "YouTube Tag Extractor Free",
        category: "seo",
        description: "Discover and copy hidden SEO tags, keywords, and metadata from public YouTube videos for YouTube Studio.",
        queries: ["youtube tag extractor", "extract youtube tags", "youtube tags finder", "see youtube tags online", "youtube keywords extractor"]
    }
];

// Build ARD Manifest according to Agentic Resource Discovery v0.91+ standard
const ardManifest = {
    "$schema": "https://agenticresourcediscovery.org/schema/v1/ard.json",
    "@context": "https://agenticresourcediscovery.org/context/v1",
    "name": "Utilify",
    "version": "2.0.0",
    "description": "70+ free, private, offline-first client-side web utilities for developers, creators, and professionals. All operations execute 100% in local browser memory with zero server uploads.",
    "url": "https://utilify.co.in",
    "documentation": "https://utilify.co.in/llms-full.txt",
    "llms_txt": "https://utilify.co.in/llms.txt",
    "publisher": {
        "name": "Rushikesh Wagh",
        "url": "https://utilify.co.in/about"
    },
    "entries": ardEntries.map(tool => ({
        "identifier": `urn:air:utilify.co.in:tools:${tool.slug}`,
        "displayName": tool.name,
        "type": "text/html",
        "url": `https://utilify.co.in/tools/${tool.slug}/`,
        "description": tool.description,
        "representativeQueries": tool.queries,
        "tags": [tool.category, tool.slug, "utility", "client-side", "offline-first"]
    }))
};

const jsonStr = JSON.stringify(ardManifest, null, 2);

function safeWrite(filePath, data) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, data, 'utf8');
}

safeWrite(path.join(__dirname, '..', 'public', '.well-known', 'ard.json'), jsonStr);
safeWrite(path.join(__dirname, '..', '.well-known', 'ard.json'), jsonStr);

// If dist exists, write there as well; otherwise minify-html/prerender/vite will handle it
const distWellKnown = path.join(__dirname, '..', 'dist', '.well-known');
if (fs.existsSync(path.join(__dirname, '..', 'dist'))) {
    safeWrite(path.join(distWellKnown, 'ard.json'), jsonStr);
}

console.log(`[ARD Generator] Successfully generated valid ARD Manifest with ${ardEntries.length} entries!`);
