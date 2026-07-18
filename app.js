document.addEventListener("DOMContentLoaded", () => {
    // ================= DOM SELECTORS =================
    
    // Global Navigation & Views
    const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-menu .mobile-nav-link");
    const footerLinks = document.querySelectorAll(".footer-view-link");
    const viewPanels = document.querySelectorAll(".view-panel");
    const navLogo = document.getElementById("nav-logo");
    const heroCtaBtn = document.getElementById("hero-cta-btn");
    const launchToolBtns = document.querySelectorAll(".launch-tool-btn");
    const sidebarMenuItems = document.querySelectorAll(".sidebar-menu .menu-item");
    const workspacePanels = document.querySelectorAll(".workspace .panel");
    
    // Theme Toggle Elements
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Mobile Navigation Drawer Toggle
    const mobileNavToggle = document.getElementById("mobile-nav-toggle");
    const mobileNavMenu = document.getElementById("mobile-nav-menu");
    
    // Workspace Selection Sidebar (Responsive)
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
    const appSidebar = document.getElementById("app-sidebar");
    
    const socialInput = document.getElementById("social-input");
    const clearSocial = document.getElementById("clear-social");
    const previewGrid = document.getElementById("preview-grid");
    
    // Selection styling selectors for Social Media Mode
    const socialStyleBtns = document.querySelectorAll(".social-style-btn");
    const btnSocialNormal = document.getElementById("btn-social-normal");
    const copySocialBtn = document.getElementById("copy-social-btn");
    
    // Active Tools: Rich Text Editor Tab Controls
    const richEditor = document.getElementById("rich-editor");
    const clearRich = document.getElementById("clear-rich");
    const copyRichBtn = document.getElementById("copy-rich-btn");
    
    // Toolbar Formatting Selectors
    const rtFont = document.getElementById("rt-font");
    const rtSize = document.getElementById("rt-size");
    const btnBold = document.getElementById("btn-bold");
    const btnItalic = document.getElementById("btn-italic");
    const btnUnderline = document.getElementById("btn-underline");
    const btnStrike = document.getElementById("btn-strike");
    const btnClearFormat = document.getElementById("btn-clear-format");
    
    // Color Palette Controls
    const btnColor = document.getElementById("btn-color");
    const btnHighlight = document.getElementById("btn-highlight");
    const textPalette = document.getElementById("text-palette");
    const bgPalette = document.getElementById("bg-palette");
    const textColorIndicator = document.getElementById("text-color-indicator");
    const bgColorIndicator = document.getElementById("bg-color-indicator");
    
    // Text Length / Word Counters
    const socialWordCount = document.getElementById("social-word-count");
    const richWordCount = document.getElementById("rich-word-count");
    
    // Dynamic Active Platform Limits & Simulator Selectors
    const socialPlatformSelect = document.getElementById("social-platform-select");
    const activeLimitLbl = document.getElementById("active-limit-lbl");
    const activeLimitVal = document.getElementById("active-limit-val");
    const activeLimitBar = document.getElementById("active-limit-bar");
    const simulatorBody = document.getElementById("simulator-body");
    const helperBtns = document.querySelectorAll(".formatting-helpers-tray .helper-btn");
    
    // Collapsible Presets Controls
    const socialPresetsHeader = document.getElementById("social-presets-header");
    const socialPresetsDesc = document.getElementById("social-presets-desc");
    
    // Toast Alert
    const toast = document.getElementById("toast");

    // Colors list
    const colors = [
        { name: "Default White/Black", hex: "var(--text-color)" },
        { name: "Slate Gray", hex: "#94a3b8" },
        { name: "Charcoal Dark", hex: "#334155" },
        { name: "Coral Red", hex: "#f43f5e" },
        { name: "Peach Orange", hex: "#f97316" },
        { name: "Amber Yellow", hex: "#f59e0b" },
        { name: "Emerald Green", hex: "#10b981" },
        { name: "Sky Cyan", hex: "#0ea5e9" },
        { name: "Indigo Blue", hex: "#6366f1" },
        { name: "Violet Purple", hex: "#a855f7" }
    ];

    const highlights = [
        { name: "No Highlight", hex: "transparent" },
        { name: "Soft Coral", hex: "rgba(244, 63, 94, 0.25)" },
        { name: "Soft Peach", hex: "rgba(249, 115, 22, 0.25)" },
        { name: "Soft Amber", hex: "rgba(245, 158, 11, 0.25)" },
        { name: "Soft Emerald", hex: "rgba(16, 185, 129, 0.25)" },
        { name: "Soft Sky", hex: "rgba(14, 165, 233, 0.25)" },
        { name: "Soft Indigo", hex: "rgba(99, 102, 241, 0.25)" },
        { name: "Soft Violet", hex: "rgba(168, 85, 247, 0.25)" },
        { name: "Solid Charcoal", hex: "#1e293b" },
        { name: "Solid Slate", hex: "#475569" }
    ];

    // ================= THEME SWITCHER LOGIC =================
    
    // Check local storage for theme configuration
    const savedTheme = localStorage.getItem("utilify-theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    }

    themeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            localStorage.setItem("utilify-theme", "light");
            showToast("Switched to Light Theme ☀️");
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            localStorage.setItem("utilify-theme", "dark");
            showToast("Switched to Dark Theme 🌙");
        }
    });

    // ================= SPA VIEWS NAVIGATION & HASH ROUTER =================
    
    const routes = {
        home: { title: "Utilify | Client-Side Browser Tools for Text, Files & Images", description: "Utilify has 63+ client-side browser tools to format text, files & images locally and privately. Fast, offline-first conversion. Developed by Rushikesh Wagh." },
        about: { title: "About Us - Utilify Creators & Developers Info", description: "Learn about Utilify, our 100% client-side privacy sandbox commitment, optimized code speed, and under-the-hood web API designs by Rushikesh Wagh." },
        privacy: { title: "Privacy Policy - Utilify Client-Side Sandbox Safety", description: "Read our strict privacy guarantees. All formatting, hashing, and encoding happen locally in your browser. No databases, no cloud retention." },
        terms: { title: "Terms of Service Agreement - Utilify Tools Hub Rules", description: "Review terms of use, intellectual property copyrights of creator Rushikesh Wagh, and client-side utility limitations." },
        disclaimer: { title: "General Disclaimer - Cryptographic & Formatting Limits", description: "Limits liability regarding Unicode text fonts rendering, browser mathematical symbols compatibility, and MD5 cryptographic security." },
        sitemap: { title: "HTML Sitemap Directory - Utilify Tools Hub Index", description: "Crawlable list of all active online utilities, compliance views, and platform details." },
        contact: { title: "Contact Us - Feedback & Custom Tool Requests", description: "Get in touch with Rushikesh Wagh for recommendations, bug reviews, and custom creator tool suggestions." }
    };

    const toolRoutes = {
        social: { title: "Social Text Formatter - Unicode Bold & Italic Fonts | Utilify", description: "Convert standard text to bold, italics, cursive script, and gothic Unicode symbols for LinkedIn, X (Twitter), and Instagram captions." },
        rich: { title: "Rich Text Editor - Custom HTML Font Colors & Highlights | Utilify", description: "WYSIWYG document editor to apply sizes, text colors, and highlights. Copy styled text directly to Gmail, Outlook, Word, and Notion." },
        words: { title: "Advanced Word Counter & Readability Level Analyzer | Utilify", description: "Calculate word and character metrics, estimates speaking/reading times, keyword density, and Flesch reading ease scores." },
        case: { title: "Smart Case Converter - Title Case, camelCase, snake_case | Utilify", description: "Quickly convert text capitalization styles between sentence case, Title Case, camelCase, snake_case, kebab-case, and toggleCase." },
        slug: { title: "SEO URL Slug Generator - Clean Web URLs | Utilify", description: "Convert titles and headlines to clean, URL-safe hyphenated lowercase strings to maximize Google ranking crawl indices." },
        qr: { title: "Custom QR Code Generator - High-Res PNG Download | Utilify", description: "Generate vector QR codes from URLs or text strings with size selection and Reed-Solomon error correction presets." },
        json: { title: "JSON Formatter, Prettifier, Parser & Validator | Utilify", description: "Prettify nested JSON objects with indentations, validate syntax schemas, minify strings, and diagnostic parser error highlights." },
        base64: { title: "Base64 Encoder & Decoder - Offline Utility Tool | Utilify", description: "Convert raw text strings to Base64 format or decode Base64 data blocks to standard UTF-8 characters." },
        url: { title: "URL Encoder & Decoder - Percent Encoding Tool | Utilify", description: "Percent-encode special query string parameters or decode encoded query addresses conforming to RFC 3986 specs." },
        hash: { title: "Cryptographic Hash Generator - MD5 & SHA-256 Checksums | Utilify", description: "Compute standard MD5 checksum hashes and secure SHA-256 hash codes client-side using browser subtle digest interfaces." },
        diff: { title: "Text Diff Checker - Side-by-Side Code Compare | Utilify", description: "Compare two text versions or source code scripts side-by-side to highlight line additions and deletion diff offsets." },
        dockerfile: { title: "Dockerfile Generator - Multi-Stage Build Template | Utilify", description: "Generate optimized, production-ready multi-stage Dockerfiles for Node.js, Python, Go, Java, PHP, and Nginx with best-practice layer caching." },
        compose: { title: "Docker Compose Builder - Multi-Service YAML Generator | Utilify", description: "Generate docker-compose.yml with Node.js, PostgreSQL, MySQL, Redis, MongoDB, and Nginx services in one click — fully client-side." },
        ghactions: { title: "GitHub Actions Workflow Generator - CI/CD YAML Builder | Utilify", description: "Generate production-ready GitHub Actions CI/CD pipeline YAML files for Node.js, Python, Go, Java, and Docker deployments." },
        cron: { title: "Cron Expression Generator & Explainer - Visual Schedule Builder | Utilify", description: "Build and explain cron schedule expressions visually for Linux crontab, GitHub Actions, AWS CloudWatch, Kubernetes CronJobs, and node-cron." },
        yamljson: { title: "YAML to JSON Converter & JSON to YAML - Instant Converter | Utilify", description: "Convert YAML configuration files to JSON and back instantly, client-side. No uploads, no server processing — supports nested structures." },
        jwt: { title: "JWT Decoder & Inspector - Decode JSON Web Tokens Safely | Utilify", description: "Decode and inspect JWT token headers, payload claims, expiry, and algorithm client-side. Never uploaded to servers." },
        boxshadow: { title: "CSS Box Shadow Generator - Live Preview Tool | Utilify", description: "Visually design CSS box shadows with real-time live preview. Control horizontal offset, vertical offset, blur, spread, color, and opacity." },
        gradient: { title: "CSS Gradient Generator - Linear & Radial Backgrounds | Utilify", description: "Generate beautiful linear and radial CSS gradients with a live preview, angle controls, color pickers, and one-click CSS copy." },
        colorconv: { title: "HEX to RGB to HSL Color Converter - Online Tool | Utilify", description: "Convert color codes between HEX, RGB, and HSL formats instantly with a live color preview and individual copy buttons." },
        uuid: { title: "UUID v4 Generator - Bulk RFC 4122 UUID Creator | Utilify", description: "Generate cryptographically secure UUID v4 strings using the browser's native crypto.randomUUID() API — single or bulk batches." },
        password: { title: "Secure Password Generator - Custom Length & Character Sets | Utilify", description: "Generate strong, random passwords with custom length and character set controls — uppercase, lowercase, numbers, and symbols." },
        lorem: { title: "Lorem Ipsum Generator - Placeholder Text by Paragraphs | Utilify", description: "Generate placeholder filler text by paragraph, word, or sentence count for UI mockups, wireframes, and design prototypes." },
        textutils: { title: "Text Utilities Workspace - Sort, Dedupe, Reverse & Trim | Utilify", description: "Quick-action text processing: sort lines alphabetically, remove duplicates, reverse text, strip empty lines, trim spaces, and convert to CSV." },
        metatag: { title: "SEO Meta Tag Generator - Open Graph & Twitter Card Builder | Utilify", description: "Generate complete HTML meta tags including Open Graph, Twitter Card, canonical URL, and author tags to maximize Google search rankings." },
        robotstxt: { title: "Robots.txt Generator - Crawler Directives Builder | Utilify", description: "Generate a valid robots.txt file with custom crawler allow/disallow rules and sitemap location for Google, Bing, and other web bots." },
        linuxcmd: { title: "Linux Command Builder - Visual Bash Command Generator | Utilify", description: "Build common Linux and Bash commands visually — find, grep, tar, chmod, curl, rsync, ssh, scp, ps, df, and du." },
        nginx: { title: "Nginx Config Generator - Reverse Proxy & SSL Setup | Utilify", description: "Generate production-ready Nginx server block configurations for static sites, reverse proxies, HTTPS with SSL certificates, and SPAs." },
        iam: { title: "AWS IAM Policy Generator - S3, EC2, Lambda JSON Policies | Utilify", description: "Generate valid AWS IAM JSON policy documents for S3, EC2, Lambda, DynamoDB, CloudWatch, SNS, and SQS with read/write/full access." },
        imgcomp: { title: "Vivid Image Compressor - Optimize PNG, JPG, and WebP Online | Utilify", description: "Optimize, compress, and resize JPEG, PNG, and WebP images client-side directly in your browser. Maintain aspect ratio, choose formats, and compare visual savings." },
        pdfmerge: { title: "PDF Merge - Combine PDF Documents Online | Utilify", description: "Combine multiple PDF files client-side into a single document instantly." },
        pdfsplit: { title: "PDF Splitter - Extract PDF Pages Online | Utilify", description: "Extract page ranges or individual pages from a PDF document securely in your browser." },
        pdfrotate: { title: "PDF Rotator - Rotate PDF Pages Online | Utilify", description: "Rotate pages of your PDF document easily in the browser." },
        imgresize: { title: "Image Resizer - Scale Dimensions Online | Utilify", description: "Scale image dimensions to custom pixel sizes client-side." },
        imgcrop: { title: "Image Cropper - Crop Photos Online | Utilify", description: "Crop images visually with direct local canvas operations." },
        imgconvert: { title: "Image Converter - Change Formats Online | Utilify", description: "Convert color profiles and image extensions locally inside canvas memory." },
        svgtopng: { title: "SVG to PNG - Rasterize Vector Graphics | Utilify", description: "Rasterize vector graphics into high-resolution PNG images client-side." },
        pngtosvg: { title: "PNG to SVG - Vectorize Raster Images | Utilify", description: "Wrap raster images inside vector SVG structures client-side." },
        imgtobase64: { title: "Image to Base64 - Convert Images to Data URL | Utilify", description: "Convert local image files to base64 encoding strings for web embeddings." },
        exif: { title: "EXIF Viewer - Extract Photo Metadata | Utilify", description: "Parse photographic camera configurations and geospatial EXIF metadata locally." },
        scicalc: { title: "Scientific Calculator - Evaluate Math Online | Utilify", description: "Evaluate math expressions, trigonometric functions, and logs client-side." },
        cgpacalc: { title: "CGPA Calculator - Academic GPA Tracker | Utilify", description: "Calculate academic grade point averages cleanly by semester courses." },
        percentcalc: { title: "Percentage Calculator - Solve Percent Queries | Utilify", description: "Solve standard percentage queries and score percentages." },
        attendcalc: { title: "Attendance Calculator - Track Class Goals | Utilify", description: "Calculate class counts needed to meet target percentage rules." },
        emicalc: { title: "EMI Calculator - Loan & Mortgage Repayments | Utilify", description: "Compute monthly installments and overall interest payable." },
        gstcalc: { title: "GST Calculator - Calculate Taxes Online | Utilify", description: "Add or remove GST tax values with complete CGPA/SGST components." },
        loancalc: { title: "Loan Calculator - Amortization Tables | Utilify", description: "Analyze mortgage loan payments and full amortization tables." },
        agecalc: { title: "Age Calculator - Exact Birthday Math | Utilify", description: "Compute exact age in years, months, days, and intervals from birthday calendar entries." },
        datediff: { title: "Date Difference - Calculate Time Between Dates | Utilify", description: "Count total calendar days, weeks, and months between two selected dates." },
        unitconv: { title: "Unit Converter - Weight, Length & Temp | Utilify", description: "Convert Length, Weight, Temperature, Area, Speed, and Data storage values." },
        cipher: { title: "AES Text Encrypter & Decrypter - Secure Offline Cryptography | Utilify", description: "Locally encrypt and decrypt text messages using industry-standard Advanced Encryption Standard (AES-GCM/CBC) directly inside your browser memory." },
        pwdinspector: { title: "Password Strength & Entropy Inspector - Real-time Complexity Analysis | Utilify", description: "Analyze password complexity, calculate Shannon entropy bits, check against dictionary patterns, and estimate brute-force crack times securely." },
        imgmerge: { title: "Two Image Merger - Combine Images Side-by-Side | Utilify", description: "Merge two images horizontally or vertically with custom scaling, padding, and alignments completely offline in your browser." },
        imagetopdf: { title: "Image to PDF Converter - Convert Photos to PDF | Utilify", description: "Convert JPG, PNG, and WebP images client-side into a single PDF document. Custom margins and page sizes." },
        pdftoimage: { title: "PDF to Image - Extract PDF Pages as Images | Utilify", description: "Render and extract all pages of a PDF document into high-resolution JPG or PNG files offline." },
        pdfcompress: { title: "Compress PDF - Reduce PDF File Size Online | Utilify", description: "Optimize and reduce PDF document sizes using client-side compression settings directly in your browser." },
        pdfprotect: { title: "Protect PDF - Password Encrypt PDF Files | Utilify", description: "Secure PDF files by adding a strong password layer client-side before sharing or downloading." },
        digisign: { title: "Digital Signature Creator - Sign PDFs & Documents | Utilify", description: "Draw or upload custom signatures, place them anywhere on your documents, and download securely." },
        imgwatermark: { title: "Watermark Image - Add Watermarks to Photos | Utilify", description: "Protect copyright by embedding text or logo watermarks on photos with transparency controls." },
        htmltopdf: { title: "HTML to PDF - Render HTML Code to PDF | Utilify", description: "Write or paste custom HTML/CSS code and convert it directly into a clean, paginated PDF document." },
        htmltoimage: { title: "HTML to Image - Render HTML Code to Image | Utilify", description: "Compile custom HTML layouts, structures, or components client-side into PNG or JPG images." },
        pdfunlock: { title: "Unlock PDF - Remove Password from PDF | Utilify", description: "Remove passwords, encryption, and permission restrictions from protected PDF documents client-side." },
        pdfremove: { title: "Remove PDF Pages - Remove Pages from PDF | Utilify", description: "Remove specific pages or custom ranges of pages from your PDF documents client-side." }
    };

    const updateSEO = (title, description) => {
        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", description);
        }
    };

    const switchToolPanel = (panelName) => {
        // Toggle menu items active state
        sidebarMenuItems.forEach(item => {
            if (item.getAttribute("data-panel") === panelName) {
                item.classList.add("active");
                item.setAttribute("aria-current", "page");
            } else {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            }
        });

        // Toggle panel display active state
        workspacePanels.forEach(panel => {
            if (panel.id === `panel-${panelName}`) {
                panel.style.display = "block";
                setTimeout(() => panel.classList.add("active"), 50);
            } else {
                panel.classList.remove("active");
                panel.style.display = "none";
            }
        });

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navigateToView = (viewName) => {
        // Toggle view container panels
        viewPanels.forEach(panel => {
            if (panel.id === `view-${viewName}`) {
                panel.classList.add("active-view");
            } else {
                panel.classList.remove("active-view");
            }
        });

        // Update navigation link selections
        const updateLinksState = (linkList) => {
            linkList.forEach(link => {
                if (link.getAttribute("data-view") === viewName) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        };

        updateLinksState(navLinks);
        updateLinksState(mobileNavLinks);

        // Smooth scroll to top on nav click
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        // Close mobile dropdown menu if open
        mobileNavMenu.classList.remove("show");
        mobileNavToggle.setAttribute("aria-expanded", "false");
    };

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

    const urlToToolKey = {};
    for (const key in seoToolUrls) {
        urlToToolKey[seoToolUrls[key]] = key;
    }

    const navigate = (urlPath) => {
        window.history.pushState(null, "", urlPath);
        handleRouting();
    };

    const handleRouting = () => {
        let path = window.location.pathname;
        
        // Handle legacy hash routing fallback
        if (window.location.hash) {
            const cleanHash = window.location.hash.replace(/^#\/?/, "");
            if (cleanHash.startsWith("tools/")) {
                const toolName = cleanHash.replace("tools/", "");
                const seoSlug = seoToolUrls[toolName] || toolName;
                window.history.replaceState(null, "", `/tools/${seoSlug}`);
                path = `/tools/${seoSlug}`;
            } else if (routes[cleanHash]) {
                window.history.replaceState(null, "", `/${cleanHash}`);
                path = `/${cleanHash}`;
            } else if (cleanHash === "home") {
                window.history.replaceState(null, "", "/");
                path = "/";
            }
        }

        const cleanPath = path.replace(/^\/|\/$/g, "") || "home";

        if (cleanPath.startsWith("tools/")) {
            const urlSlug = cleanPath.replace(/^tools\//, "");
            const toolKey = urlToToolKey[urlSlug] || urlSlug;
            
            if (toolRoutes[toolKey]) {
                navigateToView("tools");
                switchToolPanel(toolKey);
                updateSEO(toolRoutes[toolKey].title, toolRoutes[toolKey].description);
            } else {
                window.history.replaceState(null, "", "/");
                navigateToView("home");
                updateSEO(routes.home.title, routes.home.description);
            }
        } else {
            const viewName = cleanPath === "index.html" ? "home" : cleanPath;
            if (routes[viewName]) {
                navigateToView(viewName);
                updateSEO(routes[viewName].title, routes[viewName].description);
            } else {
                window.history.replaceState(null, "", "/");
                navigateToView("home");
                updateSEO(routes.home.title, routes.home.description);
            }
        }
    };

    // Bind popstate listener
    window.addEventListener("popstate", handleRouting);

    // Navigation item click bindings
    const scrollToToolsShowcase = () => {
        navigate("/");
        setTimeout(() => {
            const showcaseSec = document.querySelector(".tools-showcase");
            if (showcaseSec) {
                showcaseSec.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 150);
    };

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetView = link.getAttribute("data-view");
            if (targetView === "tools") {
                scrollToToolsShowcase();
            } else {
                navigate(`/${targetView}`);
            }
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetView = link.getAttribute("data-view");
            if (targetView === "tools") {
                scrollToToolsShowcase();
            } else {
                navigate(`/${targetView}`);
            }
        });
    });

    footerLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetView = link.getAttribute("data-view");
            const toolType = link.getAttribute("data-tool");
            
            if (targetView === "tools") {
                if (toolType) {
                    const seoSlug = seoToolUrls[toolType] || toolType;
                    navigate(`/tools/${seoSlug}`);
                } else {
                    scrollToToolsShowcase();
                }
            } else {
                navigate(`/${targetView}`);
            }
        });
    });

    navLogo.addEventListener("click", (e) => { e.preventDefault(); navigate("/"); });
    heroCtaBtn.addEventListener("click", (e) => { e.preventDefault(); scrollToToolsShowcase(); });
    
    launchToolBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const tool = btn.getAttribute("data-tool");
            const seoSlug = seoToolUrls[tool] || tool;
            navigate(`/tools/${seoSlug}`);
        });
    });

    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tool = item.getAttribute("data-tool");
            const seoSlug = seoToolUrls[tool] || tool;
            navigate(`/tools/${seoSlug}`);
        });
    });

    // Global click listener to intercept all internal routing links (including sidebar tools)
    document.addEventListener("click", (e) => {
        const anchor = e.target.closest("a");
        if (anchor) {
            const href = anchor.getAttribute("href");
            // Only intercept relative, local paths starting with /
            if (href && href.startsWith("/") && !anchor.getAttribute("target") && !anchor.getAttribute("download")) {
                e.preventDefault();
                navigate(href);
            }
        }
    });

    // ================= CATEGORY FILTER TABS FOR HOME VIEW =================
    const categoryTabBtns = document.querySelectorAll(".category-tab-btn");
    const showcaseCards = document.querySelectorAll(".showcase-card");

    categoryTabBtns.forEach(tabBtn => {
        tabBtn.addEventListener("click", () => {
            // Remove active state from all tabs
            categoryTabBtns.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });

            // Set active state on clicked tab
            tabBtn.classList.add("active");
            tabBtn.setAttribute("aria-selected", "true");

            const selectedCategory = tabBtn.getAttribute("data-category");

            // Filter cards based on selected category
            showcaseCards.forEach(card => {
                const cardCategory = card.getAttribute("data-card-category");
                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    card.style.display = "flex";
                    card.classList.add("animate-fade");
                } else {
                    card.style.display = "none";
                    card.classList.remove("animate-fade");
                }
            });
        });
    });

    // ================= MOBILE NAVIGATION DRAWER =================
    mobileNavToggle.addEventListener("click", () => {
        const isOpen = mobileNavMenu.classList.toggle("show");
        mobileNavToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menus when clicking body
    document.addEventListener("click", (e) => {
        if (!mobileNavToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
            mobileNavMenu.classList.remove("show");
            mobileNavToggle.setAttribute("aria-expanded", "false");
        }
    });

    // ================= RESPONSIVE SIDEBAR MOBILE toggles =================
    if (menuToggleBtn && sidebarCloseBtn && appSidebar) {
        menuToggleBtn.addEventListener("click", () => {
            appSidebar.classList.add("show");
        });
        sidebarCloseBtn.addEventListener("click", () => {
            appSidebar.classList.remove("show");
        });
        
        // Close sidebar if user clicks menu links
        const menuItems = appSidebar.querySelectorAll(".menu-item:not(.disabled)");
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                appSidebar.classList.remove("show");
            });
        });
    }

    // ================= SOCIAL MEDIA: UNICODE ENGINE =================
    
    const convertToUnicode = (text, style) => {
        let result = "";
        for (let char of text) {
            let code = char.codePointAt(0);
            let converted = char;

            if (code >= 65 && code <= 90) { // A-Z
                switch(style) {
                    case "Sans Bold": converted = String.fromCodePoint(code - 65 + 0x1D5D4); break;
                    case "Serif Bold": converted = String.fromCodePoint(code - 65 + 0x1D400); break;
                    case "Sans Italic": converted = String.fromCodePoint(code - 65 + 0x1D608); break;
                    case "Serif Italic": converted = String.fromCodePoint(code - 65 + 0x1D434); break;
                    case "Sans Bold Italic": converted = String.fromCodePoint(code - 65 + 0x1D63C); break;
                    case "Serif Bold Italic": converted = String.fromCodePoint(code - 65 + 0x1D468); break;
                    case "Monospace": converted = String.fromCodePoint(code - 65 + 0x1D670); break;
                    case "Double Struck": 
                        const dsGaps = { 'C': 0x2102, 'H': 0x210D, 'N': 0x2115, 'P': 0x2119, 'Q': 0x211A, 'R': 0x211D, 'Z': 0x2124 };
                        converted = dsGaps[char] ? String.fromCodePoint(dsGaps[char]) : String.fromCodePoint(code - 65 + 0x1D538);
                        break;
                    case "Script":
                        const scrGaps = { 'B': 0x212C, 'E': 0x2130, 'F': 0x2131, 'H': 0x210B, 'I': 0x2110, 'L': 0x2112, 'M': 0x2133, 'R': 0x211B };
                        converted = scrGaps[char] ? String.fromCodePoint(scrGaps[char]) : String.fromCodePoint(code - 65 + 0x1D49C);
                        break;
                    case "Bold Script": converted = String.fromCodePoint(code - 65 + 0x1D4D0); break;
                    case "Gothic":
                        const gothGaps = { 'C': 0x212D, 'H': 0x210C, 'I': 0x2111, 'R': 0x211C, 'Z': 0x2128 };
                        converted = gothGaps[char] ? String.fromCodePoint(gothGaps[char]) : String.fromCodePoint(code - 65 + 0x1D504);
                        break;
                    case "Bold Gothic": converted = String.fromCodePoint(code - 65 + 0x1D56C); break;
                    case "Circled": converted = String.fromCodePoint(code - 65 + 0x24B6); break;
                }
            } else if (code >= 97 && code <= 122) { // a-z
                switch(style) {
                    case "Sans Bold": converted = String.fromCodePoint(code - 97 + 0x1D5EE); break;
                    case "Serif Bold": converted = String.fromCodePoint(code - 97 + 0x1D41A); break;
                    case "Sans Italic": converted = String.fromCodePoint(code - 97 + 0x1D622); break;
                    case "Serif Italic": 
                        converted = (char === 'h') ? 'ℎ' : String.fromCodePoint(code - 97 + 0x1D44E); 
                        break;
                    case "Sans Bold Italic": converted = String.fromCodePoint(code - 97 + 0x1D656); break;
                    case "Serif Bold Italic": converted = String.fromCodePoint(code - 97 + 0x1D482); break;
                    case "Monospace": converted = String.fromCodePoint(code - 97 + 0x1D68A); break;
                    case "Double Struck": converted = String.fromCodePoint(code - 97 + 0x1D552); break;
                    case "Script":
                        const scrLowGaps = { 'e': 0x212F, 'g': 0x210A, 'o': 0x2134 };
                        converted = scrLowGaps[char] ? String.fromCodePoint(scrLowGaps[char]) : String.fromCodePoint(code - 97 + 0x1D4B6);
                        break;
                    case "Bold Script": converted = String.fromCodePoint(code - 97 + 0x1D4EA); break;
                    case "Gothic": converted = String.fromCodePoint(code - 97 + 0x1D51C); break;
                    case "Bold Gothic": converted = String.fromCodePoint(code - 97 + 0x1D586); break;
                    case "Circled": converted = String.fromCodePoint(code - 97 + 0x24D0); break;
                }
            } else if (code >= 48 && code <= 57) { // 0-9
                switch(style) {
                    case "Sans Bold": converted = String.fromCodePoint(code - 48 + 0x1D7EC); break;
                    case "Serif Bold": converted = String.fromCodePoint(code - 48 + 0x1D7CE); break;
                    case "Monospace": converted = String.fromCodePoint(code - 48 + 0x1D7F6); break;
                    case "Double Struck": converted = String.fromCodePoint(code - 48 + 0x1D7D8); break;
                    case "Circled": converted = (char === '0') ? String.fromCodePoint(0x24EA) : String.fromCodePoint(code - 49 + 0x2460); break;
                }
            }
            result += converted;
        }
        return result;
    };

    // Reverse Unicode translation engine (converts styled math symbols back to standard ASCII)
    const convertToNormal = (text) => {
        let result = "";
        for (let char of text) {
            let code = char.codePointAt(0);
            let converted = char;

            // 1. Sans Bold
            if (code >= 0x1D5D4 && code <= 0x1D5ED) { // A-Z
                converted = String.fromCodePoint(code - 0x1D5D4 + 65);
            } else if (code >= 0x1D5EE && code <= 0x1D607) { // a-z
                converted = String.fromCodePoint(code - 0x1D5EE + 97);
            } else if (code >= 0x1D7EC && code <= 0x1D7F5) { // 0-9
                converted = String.fromCodePoint(code - 0x1D7EC + 48);
            }
            // 2. Serif Bold
            else if (code >= 0x1D400 && code <= 0x1D419) {
                converted = String.fromCodePoint(code - 0x1D400 + 65);
            } else if (code >= 0x1D41A && code <= 0x1D433) {
                converted = String.fromCodePoint(code - 0x1D41A + 97);
            } else if (code >= 0x1D7CE && code <= 0x1D7D7) {
                converted = String.fromCodePoint(code - 0x1D7CE + 48);
            }
            // 3. Sans Italic
            else if (code >= 0x1D608 && code <= 0x1D621) {
                converted = String.fromCodePoint(code - 0x1D608 + 65);
            } else if (code >= 0x1D622 && code <= 0x1D63B) {
                converted = String.fromCodePoint(code - 0x1D622 + 97);
            }
            // 4. Serif Italic
            else if (code >= 0x1D434 && code <= 0x1D44D) {
                converted = String.fromCodePoint(code - 0x1D434 + 65);
            } else if (code >= 0x1D44E && code <= 0x1D467) {
                converted = String.fromCodePoint(code - 0x1D44E + 97);
            } else if (code === 0x210E) {
                converted = 'h';
            }
            // 5. Sans Bold Italic
            else if (code >= 0x1D63C && code <= 0x1D655) {
                converted = String.fromCodePoint(code - 0x1D63C + 65);
            } else if (code >= 0x1D656 && code <= 0x1D66F) {
                converted = String.fromCodePoint(code - 0x1D656 + 97);
            }
            // 6. Serif Bold Italic
            else if (code >= 0x1D468 && code <= 0x1D481) {
                converted = String.fromCodePoint(code - 0x1D468 + 65);
            } else if (code >= 0x1D482 && code <= 0x1D49B) {
                converted = String.fromCodePoint(code - 0x1D482 + 97);
            }
            // 7. Monospace
            else if (code >= 0x1D670 && code <= 0x1D689) {
                converted = String.fromCodePoint(code - 0x1D670 + 65);
            } else if (code >= 0x1D68A && code <= 0x1D6A3) {
                converted = String.fromCodePoint(code - 0x1D68A + 97);
            } else if (code >= 0x1D7F6 && code <= 0x1D7FF) {
                converted = String.fromCodePoint(code - 0x1D7F6 + 48);
            }
            // 8. Double Struck
            else if (code >= 0x1D538 && code <= 0x1D551) {
                converted = String.fromCodePoint(code - 0x1D538 + 65);
            } else if (code >= 0x1D552 && code <= 0x1D56B) {
                converted = String.fromCodePoint(code - 0x1D552 + 97);
            } else if (code >= 0x1D7D8 && code <= 0x1D7E1) {
                converted = String.fromCodePoint(code - 0x1D7D8 + 48);
            }
            // Double Struck Specials
            else if (code === 0x2102) converted = 'C';
            else if (code === 0x210D) converted = 'H';
            else if (code === 0x2115) converted = 'N';
            else if (code === 0x2119) converted = 'P';
            else if (code === 0x211A) converted = 'Q';
            else if (code === 0x211D) converted = 'R';
            else if (code === 0x2124) converted = 'Z';
            // 9. Script
            else if (code >= 0x1D49C && code <= 0x1D4B5) {
                converted = String.fromCodePoint(code - 0x1D49C + 65);
            } else if (code >= 0x1D4B6 && code <= 0x1D4CF) {
                converted = String.fromCodePoint(code - 0x1D4B6 + 97);
            }
            // Script Specials
            else if (code === 0x212C) converted = 'B';
            else if (code === 0x2130) converted = 'E';
            else if (code === 0x2131) converted = 'F';
            else if (code === 0x210B) converted = 'H';
            else if (code === 0x2110) converted = 'I';
            else if (code === 0x2112) converted = 'L';
            else if (code === 0x2133) converted = 'M';
            else if (code === 0x211B) converted = 'R';
            else if (code === 0x212F) converted = 'e';
            else if (code === 0x210A) converted = 'g';
            else if (code === 0x2134) converted = 'o';
            // 10. Bold Script
            else if (code >= 0x1D4D0 && code <= 0x1D4E9) {
                converted = String.fromCodePoint(code - 0x1D4D0 + 65);
            } else if (code >= 0x1D4EA && code <= 0x1D503) {
                converted = String.fromCodePoint(code - 0x1D4EA + 97);
            }
            // 11. Gothic
            else if (code >= 0x1D504 && code <= 0x1D51D) {
                converted = String.fromCodePoint(code - 0x1D504 + 65);
            } else if (code >= 0x1D51C && code <= 0x1D535) {
                converted = String.fromCodePoint(code - 0x1D51C + 97);
            }
            // Gothic Specials
            else if (code === 0x212D) converted = 'C';
            else if (code === 0x210C) converted = 'H';
            else if (code === 0x2111) converted = 'I';
            else if (code === 0x211C) converted = 'R';
            else if (code === 0x2128) converted = 'Z';
            // 12. Bold Gothic
            else if (code >= 0x1D56C && code <= 0x1D585) {
                converted = String.fromCodePoint(code - 0x1D56C + 65);
            } else if (code >= 0x1D586 && code <= 0x1D59B) {
                converted = String.fromCodePoint(code - 0x1D586 + 97);
            }
            // 13. Circled
            else if (code >= 0x24B6 && code <= 0x24CF) {
                converted = String.fromCodePoint(code - 0x24B6 + 65);
            } else if (code >= 0x24D0 && code <= 0x24E9) {
                converted = String.fromCodePoint(code - 0x24D0 + 97);
            } else if (code >= 0x2460 && code <= 0x2468) {
                converted = String.fromCodePoint(code - 0x2460 + 49);
            } else if (code === 0x24EA) {
                converted = '0';
            }

            result += converted;
        }
        return result;
    };

    const socialStyles = [
        "Sans Bold", "Serif Bold", "Sans Italic", "Serif Italic", 
        "Sans Bold Italic", "Serif Bold Italic", "Monospace", 
        "Double Struck", "Script", "Bold Script", "Gothic", 
        "Bold Gothic", "Circled"
    ];

    // Toast Alert Helper
    const showToast = (message, success = true) => {
        toast.textContent = message;
        toast.style.background = success ? "rgba(16, 185, 129, 0.92)" : "rgba(244, 63, 94, 0.92)";
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    };

    // Render Preview Grids
    const updateSocialPreviews = () => {
        const text = socialInput.value || "Your text preview here";
        previewGrid.innerHTML = "";

        socialStyles.forEach(style => {
            const convertedText = convertToUnicode(text, style);
            
            const card = document.createElement("div");
            card.className = "preview-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("aria-label", `Copy text in ${style} style`);
            
            card.innerHTML = `
                <div class="style-info">
                    <span class="style-name">${style}</span>
                    <span class="copy-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </span>
                </div>
                <div class="text-render">${convertedText}</div>
            `;

            const triggerCopy = () => {
                const textToCopy = socialInput.value ? convertedText : "";
                if (!textToCopy) {
                    showToast("Please type some text first!", false);
                    return;
                }
                navigator.clipboard.writeText(textToCopy)
                    .then(() => showToast(`Copied ${style} successfully!`))
                    .catch(() => showToast("Failed to copy", false));
            };

            card.addEventListener("click", triggerCopy);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    triggerCopy();
                }
            });

            previewGrid.appendChild(card);
        });
    };

    // Platform configurations & limits
    const platformConfigs = {
        "linkedin-post": { name: "LinkedIn Post", limit: 3000, warnAt: 2800 },
        "linkedin-headline": { name: "LinkedIn Headline", limit: 220, warnAt: 200 },
        "twitter-post": { name: "X/Twitter Post", limit: 280, warnAt: 240 },
        "insta-bio": { name: "Instagram Bio", limit: 150, warnAt: 135 },
        "insta-caption": { name: "Instagram Caption", limit: 2200, warnAt: 2000 },
        "youtube-desc": { name: "YouTube Description", limit: 5000, warnAt: 4700 },
        "tiktok-bio": { name: "TikTok Bio", limit: 80, warnAt: 70 }
    };

    // Caret character/text insertion helper
    const insertAtCaret = (textToInsert) => {
        const start = socialInput.selectionStart;
        const end = socialInput.selectionEnd;
        const rawText = socialInput.value;
        
        socialInput.value = rawText.substring(0, start) + textToInsert + rawText.substring(end);
        
        // Re-focus and position selection caret right after inserted text
        socialInput.focus();
        socialInput.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
        
        updateSocialPreviews();
        updateCounters();
    };

    // Helper tray click bindings
    helperBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const textToInsert = btn.getAttribute("data-insert");
            insertAtCaret(textToInsert);
        });
    });

    // Feed Preview Simulator Renderer
    let linkedinExpanded = false; // expansion toggle state for LinkedIn mock see-more

    const updateSimulatorPreview = () => {
        const platform = socialPlatformSelect.value;
        const text = socialInput.value || "Your mock post preview content will render here in real-time...";
        simulatorBody.innerHTML = "";

        if (platform === "twitter-post") {
            const card = document.createElement("div");
            card.className = "tweet-mock";
            card.innerHTML = `
                <div class="tweet-header">
                    <div class="tweet-avatar"></div>
                    <div class="tweet-user-details">
                        <span class="tweet-name">Utilify Creator</span>
                        <span class="tweet-handle">@utilify_app · Just now</span>
                    </div>
                </div>
                <div class="tweet-text">${text}</div>
                <div class="tweet-actions">
                    <span>💬 0</span><span>🔁 0</span><span>❤️ 0</span><span>📊 0</span>
                </div>
            `;
            simulatorBody.appendChild(card);
        } 
        else if (platform === "linkedin-post") {
            const card = document.createElement("div");
            card.className = "linkedin-mock";
            
            // Truncation logic (140 characters limit in LinkedIn feed collapses text)
            let displayText = text;
            let showSeeMoreBtn = false;
            
            if (text.length > 140 && !linkedinExpanded) {
                displayText = text.substring(0, 140);
                showSeeMoreBtn = true;
            }

            card.innerHTML = `
                <div class="li-header">
                    <div class="li-avatar"></div>
                    <div class="li-user-details">
                        <span class="li-name">Utilify Professional</span>
                        <span class="li-headline">AI Post Optimizer & Creator</span>
                    </div>
                </div>
                <div class="li-text">${displayText}${showSeeMoreBtn ? '... <span class="li-see-more" id="li-see-more-btn">see more</span>' : ''}</div>
                <div class="li-actions">
                    <span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>✉️ Send</span>
                </div>
            `;
            
            simulatorBody.appendChild(card);

            if (showSeeMoreBtn) {
                document.getElementById("li-see-more-btn").addEventListener("click", () => {
                    linkedinExpanded = true;
                    updateSimulatorPreview();
                });
            }
        } 
        else if (platform === "linkedin-headline") {
            const card = document.createElement("div");
            card.className = "linkedin-mock";
            card.innerHTML = `
                <div class="li-header" style="margin-bottom: 0;">
                    <div class="li-avatar" style="width: 56px; height: 56px;"></div>
                    <div class="li-user-details" style="justify-content: center;">
                        <span class="li-name" style="font-size: 1.05rem;">Utilify Professional</span>
                        <span class="li-headline" style="font-size: 0.85rem; color: var(--text-color); margin-top: 0.15rem; font-weight: 500;">${text}</span>
                    </div>
                </div>
            `;
            simulatorBody.appendChild(card);
        }
        else if (platform === "insta-bio") {
            const card = document.createElement("div");
            card.className = "insta-mock";
            card.innerHTML = `
                <div class="insta-profile-row">
                    <div class="insta-avatar"><div class="insta-avatar-inner"></div></div>
                    <div class="insta-stats">
                        <div><div class="insta-stat-val">12</div><div class="insta-stat-lbl">posts</div></div>
                        <div><div class="insta-stat-val">4.8k</div><div class="insta-stat-lbl">followers</div></div>
                        <div><div class="insta-stat-val">350</div><div class="insta-stat-lbl">following</div></div>
                    </div>
                </div>
                <div class="insta-name">Utilify App</div>
                <div class="insta-bio-text">${text}</div>
                <a href="#" class="insta-link" onclick="return false;">🔗 linkin.bio/utilify</a>
            `;
            simulatorBody.appendChild(card);
        }
        else if (platform === "insta-caption") {
            const card = document.createElement("div");
            card.className = "insta-mock";
            card.innerHTML = `
                <div class="insta-profile-row" style="margin-bottom: 0.75rem;">
                    <div class="insta-avatar" style="width: 32px; height: 32px; padding: 2px;"><div class="insta-avatar-inner"></div></div>
                    <div class="insta-name" style="margin-bottom: 0;">utilify_creator</div>
                </div>
                <div style="aspect-ratio: 1; background: var(--primary-gradient); border-radius: 4px; margin-bottom: 0.75rem;"></div>
                <div class="insta-bio-text" style="font-size: 0.85rem;"><span style="font-weight: 700; margin-right: 0.4rem;">utilify_creator</span>${text}</div>
            `;
            simulatorBody.appendChild(card);
        }
        else if (platform === "youtube-desc") {
            const card = document.createElement("div");
            card.className = "tweet-mock";
            card.style.background = "rgba(255,255,255,0.03)";
            card.style.borderColor = "var(--border-color)";
            card.innerHTML = `
                <div style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-color);">Description</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">125K views · 2 days ago</div>
                <div style="font-size: 0.88rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word; color: var(--text-color);">${text}</div>
            `;
            simulatorBody.appendChild(card);
        }
        else if (platform === "tiktok-bio") {
            const card = document.createElement("div");
            card.className = "insta-mock";
            card.style.borderColor = "#fe2c55";
            card.innerHTML = `
                <div class="insta-profile-row" style="flex-direction: column; text-align: center; gap: 0.5rem; align-items: center;">
                    <div class="insta-avatar" style="width: 80px; height: 80px; background: #00f2fe; padding: 2px;"><div class="insta-avatar-inner" style="background:#111;"></div></div>
                    <div class="insta-name" style="font-size: 1.05rem;">@utilify_tiktok</div>
                </div>
                <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 0.75rem; font-size: 0.82rem; color: var(--text-muted);">
                    <span><b>0</b> Following</span><span><b>45.2K</b> Followers</span><span><b>920K</b> Likes</span>
                </div>
                <div class="insta-bio-text" style="text-align: center; font-size: 0.85rem; color: var(--text-color);">${text}</div>
            `;
            simulatorBody.appendChild(card);
        }
    };

    // Limits & counters
    const updateCounters = () => {
        const text = socialInput.value;
        const charCount = text.length;
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        socialWordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;

        // Get config for selected platform
        const currentPlatform = socialPlatformSelect.value;
        const config = platformConfigs[currentPlatform];

        activeLimitLbl.textContent = config.name;
        activeLimitVal.textContent = `${charCount}/${config.limit}`;
        
        const percentage = Math.min((charCount / config.limit) * 100, 100);
        activeLimitBar.style.width = `${percentage}%`;

        // Warnings check
        const chip = document.getElementById("active-limit-chip");
        chip.classList.remove("warning", "exceeded");
        if (charCount > config.limit) {
            chip.classList.add("exceeded");
        } else if (charCount >= config.warnAt) {
            chip.classList.add("warning");
        }

        // Trigger simulator updates
        updateSimulatorPreview();
    };

    // Platform selection change
    socialPlatformSelect.addEventListener("change", () => {
        linkedinExpanded = false; // reset expansion toggles
        updateCounters();
    });

    socialInput.addEventListener("input", () => {
        updateSocialPreviews();
        updateCounters();
    });

    clearSocial.addEventListener("click", () => {
        socialInput.value = "";
        linkedinExpanded = false;
        updateSocialPreviews();
        updateCounters();
        socialInput.focus();
    });

    // Collapsible Presets Section Toggle
    if (socialPresetsHeader && socialPresetsDesc && previewGrid) {
        socialPresetsHeader.addEventListener("click", () => {
            const isCollapsed = socialPresetsHeader.classList.toggle("collapsed");
            socialPresetsDesc.style.display = isCollapsed ? "none" : "block";
            previewGrid.style.display = isCollapsed ? "none" : "grid";
        });
    }

    // --- Social Media Mode: In-Place Selection Styling Logic ---
    const applySocialSelectionStyle = (styleName, isReset = false) => {
        const start = socialInput.selectionStart;
        const end = socialInput.selectionEnd;
        
        if (start === end) {
            showToast("Highlight the word(s) you want to format first!", false);
            return;
        }

        const rawText = socialInput.value;
        const selectedText = rawText.substring(start, end);
        
        // Convert to Unicode style or convert back to normal ASCII text
        const convertedText = isReset ? convertToNormal(selectedText) : convertToUnicode(selectedText, styleName);
        
        socialInput.value = rawText.substring(0, start) + convertedText + rawText.substring(end);
        
        // Refocus and restore selection over the styled characters
        socialInput.focus();
        socialInput.setSelectionRange(start, start + convertedText.length);
        
        updateSocialPreviews();
        updateCounters();
    };

    socialStyleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const style = btn.getAttribute("data-style");
            applySocialSelectionStyle(style, false);
        });
    });

    if (btnSocialNormal) {
        btnSocialNormal.addEventListener("click", (e) => {
            e.preventDefault();
            applySocialSelectionStyle("", true);
        });
    }

    if (copySocialBtn) {
        copySocialBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const textToCopy = socialInput.value.trim();
            if (!textToCopy) {
                showToast("Please type some text first!", false);
                return;
            }
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast("Custom formatted social post copied successfully!");
                })
                .catch(() => {
                    showToast("Copy failed", false);
                });
        });
    }

    // (Note: Sidebar navigation menu triggers are now bound dynamically through hash routing)

    // --- 1. WORD COUNTER & READABILITY MODULE ---
    const wordsInput = document.getElementById("words-input");
    if (wordsInput) {
        const metricChars = document.getElementById("metric-chars");
        const metricWords = document.getElementById("metric-words");
        const metricSentences = document.getElementById("metric-sentences");
        const metricParagraphs = document.getElementById("metric-paragraphs");
        
        const readTimeVal = document.getElementById("read-time-val");
        const speakTimeVal = document.getElementById("speak-time-val");
        const fleschScoreVal = document.getElementById("flesch-score-val");
        const readabilityLevelVal = document.getElementById("readability-level-val");
        const keywordDensityList = document.getElementById("keyword-density-list");
        const clearWords = document.getElementById("clear-words");

        const countSyllables = (word) => {
            word = word.toLowerCase();
            if (word.length <= 3) return 1;
            word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            word = word.replace(/^y/, '');
            const vowels = word.match(/[aeiouy]{1,2}/g);
            return vowels ? vowels.length : 1;
        };

        const updateWordAnalysis = () => {
            const text = wordsInput.value;
            const charCount = text.length;
            
            // Word list extraction
            const wordsList = text.trim() === "" ? [] : text.trim().split(/\s+/).filter(w => w.length > 0);
            const wordCount = wordsList.length;

            // Sentence extraction (match punctuation)
            const sentenceList = text.trim() === "" ? [] : text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const sentenceCount = sentenceList.length || (text.trim().length > 0 ? 1 : 0);

            // Paragraph extraction
            const paragraphList = text.trim() === "" ? [] : text.split(/\n+/).filter(p => p.trim().length > 0);
            const paragraphCount = paragraphList.length;

            // Update stats grid
            metricChars.textContent = charCount;
            metricWords.textContent = wordCount;
            metricSentences.textContent = sentenceCount;
            metricParagraphs.textContent = paragraphCount;

            // Update word count display in textarea footer
            document.getElementById("words-word-count").textContent = `${wordCount} word${wordCount !== 1 ? 's' : ''}`;

            // Reading / Speaking times
            const readMinutes = Math.ceil(wordCount / 225);
            readTimeVal.textContent = `${readMinutes} min`;
            const speakMinutes = Math.ceil(wordCount / 150);
            speakTimeVal.textContent = `${speakMinutes} min`;

            // Flesch Reading Ease score computation
            if (wordCount === 0 || sentenceCount === 0) {
                fleschScoreVal.textContent = "0 / 100";
                readabilityLevelVal.textContent = "N/A";
            } else {
                let totalSyllables = 0;
                wordsList.forEach(w => totalSyllables += countSyllables(w));
                
                const score = 206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (totalSyllables / wordCount));
                const roundedScore = Math.max(0, Math.min(100, Math.round(score)));
                fleschScoreVal.textContent = `${roundedScore} / 100`;

                // Map readability score levels
                if (roundedScore > 90) readabilityLevelVal.textContent = "Very Easy (5th Grade)";
                else if (roundedScore > 80) readabilityLevelVal.textContent = "Easy (6th Grade)";
                else if (roundedScore > 70) readabilityLevelVal.textContent = "Fairly Easy (7th Grade)";
                else if (roundedScore > 60) readabilityLevelVal.textContent = "Standard (8th-9th Grade)";
                else if (roundedScore > 50) readabilityLevelVal.textContent = "Fairly Difficult (High School)";
                else if (roundedScore > 30) readabilityLevelVal.textContent = "Difficult (College)";
                else readabilityLevelVal.textContent = "Very Difficult (Graduate)";
            }

            // Keyword Density computation
            const stopWords = new Set(["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", "of", "is", "are", "was", "were", "it", "this", "that", "i", "you", "he", "she", "they", "we"]);
            const freqs = {};
            wordsList.forEach(w => {
                const clean = w.toLowerCase().replace(/[^a-zA-Z]/g, "");
                if (clean.length > 2 && !stopWords.has(clean)) {
                    freqs[clean] = (freqs[clean] || 0) + 1;
                }
            });

            const sorted = Object.entries(freqs).sort((a, b) => b[1] - a[1]).slice(0, 5);
            keywordDensityList.innerHTML = "";

            if (sorted.length === 0) {
                keywordDensityList.innerHTML = '<span class="empty-list-msg">Type some words to see keyword frequency.</span>';
            } else {
                sorted.forEach(([word, count]) => {
                    const item = document.createElement("div");
                    item.className = "density-item";
                    item.innerHTML = `<span>${word}</span><span>${count} (${Math.round((count / wordCount) * 100)}%)</span>`;
                    keywordDensityList.appendChild(item);
                });
            }
        };

        wordsInput.addEventListener("input", updateWordAnalysis);
        clearWords.addEventListener("click", () => {
            wordsInput.value = "";
            updateWordAnalysis();
            wordsInput.focus();
        });
    }

    // --- 2. SMART CASE CONVERTER MODULE ---
    const caseInput = document.getElementById("case-input");
    if (caseInput) {
        const valCaseSentence = document.getElementById("val-case-sentence");
        const valCaseTitle = document.getElementById("val-case-title");
        const valCaseUpper = document.getElementById("val-case-upper");
        const valCaseLower = document.getElementById("val-case-lower");
        const valCaseCamel = document.getElementById("val-case-camel");
        const valCaseSnake = document.getElementById("val-case-snake");
        const valCaseKebab = document.getElementById("val-case-kebab");
        const valCaseMock = document.getElementById("val-case-mock");
        const clearCase = document.getElementById("clear-case");

        // Helper case operations
        const toTitleCase = (str) => {
            const minors = ["a", "an", "the", "and", "but", "for", "or", "nor", "at", "by", "to", "from", "in", "on", "of"];
            return str.toLowerCase().split(' ').map((word, index) => {
                if (index > 0 && minors.includes(word)) return word;
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        };

        const toSentenceCase = (str) => {
            if (str.length === 0) return "";
            return str.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m) => m.toUpperCase());
        };

        const toCamelCase = (str) => {
            return str.toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
                .replace(/[^a-zA-Z0-9]/g, "");
        };

        const updateCaseConversions = () => {
            const text = caseInput.value;
            
            // Footer word counter
            const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
            document.getElementById("case-word-count").textContent = `${words} word${words !== 1 ? 's' : ''}`;

            valCaseSentence.textContent = toSentenceCase(text) || "Your sentence case text preview...";
            valCaseTitle.textContent = toTitleCase(text) || "Your Title Case Text Preview...";
            valCaseUpper.textContent = text.toUpperCase() || "YOUR UPPERCASE TEXT PREVIEW...";
            valCaseLower.textContent = text.toLowerCase() || "your lowercase text preview...";
            
            valCaseCamel.textContent = toCamelCase(text) || "yourCamelCaseTextPreview...";
            valCaseSnake.textContent = text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "your_snake_case_text_preview...";
            valCaseKebab.textContent = text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "your-kebab-case-text-preview...";
            
            // Alternating case
            let mockStr = "";
            for (let i = 0; i < text.length; i++) {
                mockStr += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
            }
            valCaseMock.textContent = mockStr || "YoUr AlTeRnAtInG cAsE tExT pReViEw...";
        };

        caseInput.addEventListener("input", updateCaseConversions);
        clearCase.addEventListener("click", () => {
            caseInput.value = "";
            updateCaseConversions();
            caseInput.focus();
        });

        // Copy buttons listeners
        const caseCards = document.querySelectorAll(".case-card");
        caseCards.forEach(card => {
            const copyBtn = card.querySelector(".case-copy-btn");
            const valDiv = card.querySelector(".case-val");
            if (copyBtn && valDiv) {
                copyBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const textToCopy = valDiv.textContent;
                    if (textToCopy.startsWith("Your ") || textToCopy.startsWith("YOUR ") || textToCopy.startsWith("your")) {
                        showToast("Please write some text first!", false);
                        return;
                    }
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => showToast("Copied converted case successfully!"))
                        .catch(() => showToast("Copy failed", false));
                });
            }
        });
    }

    // --- 3. CUSTOMIZABLE QR CODE GENERATOR MODULE ---
    const qrTextInput = document.getElementById("qr-text-input");
    if (qrTextInput) {
        const qrSizeSelect = document.getElementById("qr-size-select");
        const qrEccSelect = document.getElementById("qr-ecc-select");
        const qrImage = document.getElementById("qr-image");
        const qrSpinner = document.getElementById("qr-spinner");
        const downloadQrBtn = document.getElementById("download-qr-btn");
        const clearQr = document.getElementById("clear-qr");

        const generateQRCode = () => {
            const text = qrTextInput.value.trim();
            if (!text) {
                qrImage.style.display = "none";
                qrSpinner.style.display = "block";
                qrSpinner.textContent = "Enter text to generate QR code";
                return;
            }

            qrSpinner.style.display = "block";
            qrSpinner.textContent = "Generating...";
            qrImage.style.display = "none";

            const size = qrSizeSelect.value;
            const ecc = qrEccSelect.value;

            // Load API source
            const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&ecc=${ecc}&data=${encodeURIComponent(text)}`;
            
            // Set image source
            qrImage.src = apiUrl;
            qrImage.onload = () => {
                qrSpinner.style.display = "none";
                qrImage.style.display = "block";
            };
        };

        qrTextInput.addEventListener("input", generateQRCode);
        qrSizeSelect.addEventListener("change", generateQRCode);
        qrEccSelect.addEventListener("change", generateQRCode);
        
        clearQr.addEventListener("click", () => {
            qrTextInput.value = "https://linkedin.com/in/rushikeshwagh";
            qrSizeSelect.value = "300";
            qrEccSelect.value = "M";
            generateQRCode();
        });

        generateQRCode();

        downloadQrBtn.addEventListener("click", () => {
            const text = qrTextInput.value.trim();
            if (!text) {
                showToast("Please enter a URL or text first!", false);
                return;
            }

            showToast("Downloading QR code PNG...");
            const size = qrSizeSelect.value;
            const ecc = qrEccSelect.value;
            const downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&ecc=${ecc}&data=${encodeURIComponent(text)}`;

            fetch(downloadUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `qr-code-${size}x${size}.png`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                })
                .catch(() => {
                    window.open(downloadUrl, "_blank");
                });
        });
    }

    // ================= VIVID IMAGE COMPRESSOR MODULE =================
    const imgCompFile = document.getElementById("imgcomp-file");
    const imgCompDropzone = document.getElementById("imgcomp-dropzone");
    const imgCompQuality = document.getElementById("imgcomp-quality");
    const imgCompQualityVal = document.getElementById("imgcomp-quality-val");
    const imgCompFormat = document.getElementById("imgcomp-format");
    const imgCompWidth = document.getElementById("imgcomp-width");
    const imgCompHeight = document.getElementById("imgcomp-height");
    const imgCompAspect = document.getElementById("imgcomp-aspect");
    const imgCompOrigSize = document.getElementById("imgcomp-orig-size");
    const imgCompCompSize = document.getElementById("imgcomp-comp-size");
    const imgCompSavings = document.getElementById("imgcomp-savings");
    const imgCompOrigPreview = document.getElementById("imgcomp-orig-preview");
    const imgCompCompPreview = document.getElementById("imgcomp-comp-preview");
    const imgCompOrigPlaceholder = document.getElementById("imgcomp-orig-placeholder");
    const imgCompCompPlaceholder = document.getElementById("imgcomp-comp-placeholder");
    const imgCompDownloadBtn = document.getElementById("imgcomp-download-btn");

    let loadedImgFile = null;
    let loadedImgObj = null;
    let originalWidth = 0;
    let originalHeight = 0;
    let originalFileSize = 0;
    let compressedImageBlob = null;

    const formatBytes = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleImgLoad = (file) => {
        if (!file) return;
        loadedImgFile = file;
        originalFileSize = file.size;
        if (imgCompOrigSize) imgCompOrigSize.textContent = formatBytes(file.size);

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                loadedImgObj = img;
                originalWidth = img.width;
                originalHeight = img.height;

                if (imgCompWidth) imgCompWidth.value = img.width;
                if (imgCompHeight) imgCompHeight.value = img.height;

                if (imgCompOrigPreview) {
                    imgCompOrigPreview.src = e.target.result;
                    imgCompOrigPreview.style.display = "block";
                }
                if (imgCompOrigPlaceholder) imgCompOrigPlaceholder.style.display = "none";

                executeCompression();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const executeCompression = () => {
        if (!loadedImgObj) return;

        const quality = (parseInt(imgCompQuality?.value) || 80) / 100;
        const format = imgCompFormat?.value || "image/webp";
        const w = parseInt(imgCompWidth?.value) || originalWidth;
        const h = parseInt(imgCompHeight?.value) || originalHeight;

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(loadedImgObj, 0, 0, w, h);

        canvas.toBlob((blob) => {
            if (!blob) return;
            compressedImageBlob = blob;

            if (imgCompCompSize) imgCompCompSize.textContent = formatBytes(blob.size);
            if (imgCompSavings) {
                const diff = originalFileSize - blob.size;
                const pct = diff > 0 ? Math.round((diff / originalFileSize) * 100) : 0;
                imgCompSavings.textContent = `-${pct}%`;
            }

            const blobUrl = URL.createObjectURL(blob);
            if (imgCompCompPreview) {
                imgCompCompPreview.src = blobUrl;
                imgCompCompPreview.style.display = "block";
            }
            if (imgCompCompPlaceholder) imgCompCompPlaceholder.style.display = "none";
            if (imgCompDownloadBtn) imgCompDownloadBtn.disabled = false;
        }, format, quality);
    };

    if (imgCompDropzone && imgCompFile) {
        imgCompDropzone.addEventListener("click", () => imgCompFile.click());
        imgCompFile.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) handleImgLoad(file);
        });

        // Drag & Drop
        imgCompDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            imgCompDropzone.style.borderColor = "var(--indigo)";
            imgCompDropzone.style.background = "rgba(99, 102, 241, 0.05)";
        });

        ["dragleave", "dragend", "drop"].forEach(event => {
            imgCompDropzone.addEventListener(event, (e) => {
                e.preventDefault();
                imgCompDropzone.style.borderColor = "var(--border-color)";
                imgCompDropzone.style.background = "none";
            });
        });

        imgCompDropzone.addEventListener("drop", (e) => {
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
                handleImgLoad(file);
            } else {
                showToast("Please drop a valid image file!", false);
            }
        });
    }

    if (imgCompQuality) {
        imgCompQuality.addEventListener("input", () => {
            if (imgCompQualityVal) imgCompQualityVal.textContent = imgCompQuality.value + "%";
            executeCompression();
        });
    }

    if (imgCompFormat) {
        imgCompFormat.addEventListener("change", executeCompression);
    }

    // Dimensions input listeners
    if (imgCompWidth) {
        imgCompWidth.addEventListener("input", () => {
            if (imgCompAspect?.checked && originalWidth > 0) {
                const ratio = originalHeight / originalWidth;
                const w = parseInt(imgCompWidth.value) || 0;
                if (imgCompHeight) imgCompHeight.value = Math.round(w * ratio);
            }
            executeCompression();
        });
    }

    if (imgCompHeight) {
        imgCompHeight.addEventListener("input", () => {
            if (imgCompAspect?.checked && originalHeight > 0) {
                const ratio = originalWidth / originalHeight;
                const h = parseInt(imgCompHeight.value) || 0;
                if (imgCompWidth) imgCompWidth.value = Math.round(h * ratio);
            }
            executeCompression();
        });
    }

    if (imgCompDownloadBtn) {
        imgCompDownloadBtn.addEventListener("click", () => {
            if (!compressedImageBlob) return;
            const originalName = loadedImgFile ? loadedImgFile.name : "image";
            const parts = originalName.split(".");
            const ext = imgCompFormat?.value === "image/webp" ? "webp" : imgCompFormat?.value === "image/jpeg" ? "jpg" : "png";
            
            // Format name cleanly
            const nameBase = parts.slice(0, -1).join(".");
            const filename = `optimized_${nameBase}.${ext}`;

            const url = URL.createObjectURL(compressedImageBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast("Optimized image downloaded!");
        });
    }

    // --- 4. JSON PRETTIFIER & VALIDATOR MODULE ---
    const jsonInput = document.getElementById("json-input");
    const jsonOutput = document.getElementById("json-output");
    if (jsonInput) {
        const jsonStatus = document.getElementById("json-status");
        const jsonMetrics = document.getElementById("json-metrics");
        const btnJsonPrettify2 = document.getElementById("btn-json-prettify-2");
        const btnJsonPrettify4 = document.getElementById("btn-json-prettify-4");
        const btnJsonMinify = document.getElementById("btn-json-minify");
        const btnJsonValidate = document.getElementById("btn-json-validate");
        const copyJsonBtn = document.getElementById("copy-json-btn");
        const clearJson = document.getElementById("clear-json");
        const jsonDedupe = document.getElementById("json-dedupe");
        const jsonTabIndent = document.getElementById("json-tab-indent");

        const updateJsonMetrics = () => {
            const text = jsonInput.value;
            const chars = text.length;
            const lines = text.split("\n").length;
            jsonMetrics.textContent = `Characters: ${chars} | Lines: ${lines}`;
        };

        const validateJSON = (showSuccessToast = false) => {
            const text = jsonInput.value.trim();
            if (!text) {
                jsonStatus.textContent = "JSON Empty";
                jsonStatus.className = "json-status-badge";
                return false;
            }

            try {
                JSON.parse(text);
                jsonStatus.textContent = "Valid JSON ✓";
                jsonStatus.className = "json-status-badge";
                if (showSuccessToast) showToast("Valid JSON structure confirmed!");
                return true;
            } catch (err) {
                jsonStatus.textContent = `Invalid JSON: ${err.message}`;
                jsonStatus.className = "json-status-badge error";
                if (showSuccessToast) showToast("JSON Syntax Error!", false);
                return false;
            }
        };

        const formatJSON = (spaces) => {
            const text = jsonInput.value.trim();
            if (!text) return;
            try {
                // JSON.parse automatically resolves duplicate keys by keeping the last one
                const parsed = JSON.parse(text);
                const indent = jsonTabIndent?.checked ? "\t" : spaces;
                const result = JSON.stringify(parsed, null, indent);
                if (jsonOutput) jsonOutput.value = result;
                validateJSON();
                updateJsonMetrics();
                showToast(`JSON formatted successfully!`);
            } catch (err) {
                validateJSON(true);
            }
        };

        jsonInput.addEventListener("input", () => {
            validateJSON();
            updateJsonMetrics();
        });

        if (btnJsonPrettify2) btnJsonPrettify2.addEventListener("click", () => formatJSON(2));
        if (btnJsonPrettify4) btnJsonPrettify4.addEventListener("click", () => formatJSON(4));
        
        if (btnJsonMinify) {
            btnJsonMinify.addEventListener("click", () => {
                const text = jsonInput.value.trim();
                if (!text) return;
                try {
                    const parsed = JSON.parse(text);
                    const result = JSON.stringify(parsed);
                    if (jsonOutput) jsonOutput.value = result;
                    validateJSON();
                    updateJsonMetrics();
                    showToast("JSON minified successfully!");
                } catch (err) {
                    validateJSON(true);
                }
            });
        }

        if (btnJsonValidate) btnJsonValidate.addEventListener("click", () => validateJSON(true));
        
        if (clearJson) {
            clearJson.addEventListener("click", () => {
                jsonInput.value = "";
                if (jsonOutput) jsonOutput.value = "";
                jsonStatus.textContent = "JSON Empty";
                jsonStatus.className = "json-status-badge";
                updateJsonMetrics();
                jsonInput.focus();
            });
        }

        if (copyJsonBtn) {
            copyJsonBtn.addEventListener("click", () => {
                const text = jsonOutput ? jsonOutput.value.trim() : jsonInput.value.trim();
                if (!text) {
                    showToast("No output JSON to copy!", false);
                    return;
                }
                navigator.clipboard.writeText(text)
                    .then(() => showToast("JSON copied to clipboard!"))
                    .catch(() => showToast("Copy failed", false));
            });
        }
    }

    // ================= RICH TEXT EDITING ENGINE =================
    
    const runEditorCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        richEditor.focus();
        updateRichCounters();
    };

    rtFont.addEventListener("change", (e) => {
        runEditorCommand("fontName", e.target.value);
    });

    rtSize.addEventListener("change", (e) => {
        runEditorCommand("fontSize", e.target.value);
    });

    btnBold.addEventListener("click", () => runEditorCommand("bold"));
    btnItalic.addEventListener("click", () => runEditorCommand("italic"));
    btnUnderline.addEventListener("click", () => runEditorCommand("underline"));
    btnStrike.addEventListener("click", () => runEditorCommand("strikeThrough"));
    btnClearFormat.addEventListener("click", () => runEditorCommand("removeFormat"));

    // Color Swatches Builder
    const generatePalette = (container, colorList, isBackground = false) => {
        colorList.forEach(color => {
            const cell = document.createElement("div");
            cell.className = "color-cell";
            cell.style.backgroundColor = color.hex;
            cell.title = color.name;
            cell.setAttribute("role", "menuitem");
            
            cell.addEventListener("click", (e) => {
                e.stopPropagation();
                if (isBackground) {
                    runEditorCommand("hiliteColor", color.hex);
                    bgColorIndicator.style.backgroundColor = color.hex;
                    bgColorIndicator.style.border = color.hex === "transparent" ? "1px dashed var(--border-color)" : "none";
                    bgPalette.classList.remove("active");
                    btnHighlight.setAttribute("aria-expanded", "false");
                } else {
                    runEditorCommand("foreColor", color.hex);
                    textColorIndicator.style.backgroundColor = color.hex;
                    textPalette.classList.remove("active");
                    btnColor.setAttribute("aria-expanded", "false");
                }
            });
            container.appendChild(cell);
        });
    };

    generatePalette(textPalette, colors, false);
    generatePalette(bgPalette, highlights, true);

    btnColor.addEventListener("click", (e) => {
        e.stopPropagation();
        const active = textPalette.classList.toggle("active");
        btnColor.setAttribute("aria-expanded", active ? "true" : "false");
        bgPalette.classList.remove("active");
        btnHighlight.setAttribute("aria-expanded", "false");
    });

    btnHighlight.addEventListener("click", (e) => {
        e.stopPropagation();
        const active = bgPalette.classList.toggle("active");
        btnHighlight.setAttribute("aria-expanded", active ? "true" : "false");
        textPalette.classList.remove("active");
        btnColor.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("click", () => {
        textPalette.classList.remove("active");
        bgPalette.classList.remove("active");
        btnColor.setAttribute("aria-expanded", "false");
        btnHighlight.setAttribute("aria-expanded", "false");
    });

    const updateRichCounters = () => {
        const text = richEditor.innerText || "";
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        richWordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
    };

    richEditor.addEventListener("input", updateRichCounters);

    clearRich.addEventListener("click", () => {
        richEditor.innerHTML = "";
        updateRichCounters();
        richEditor.focus();
    });

    // Multi-type clipboard copy operation
    copyRichBtn.addEventListener("click", () => {
        const htmlContent = richEditor.innerHTML.trim();
        const plainText = richEditor.innerText.trim();

        if (!plainText) {
            showToast("Please write some text first!", false);
            return;
        }

        const blobHtml = new Blob([htmlContent], { type: "text/html" });
        const blobText = new Blob([plainText], { type: "text/plain" });

        try {
            const data = [new ClipboardItem({
                "text/html": blobHtml,
                "text/plain": blobText
            })];

            navigator.clipboard.write(data)
                .then(() => {
                    showToast("Rich formatted text copied! Paste it in Gmail, Docs, Word, Outlook, etc.");
                })
                .catch(err => {
                    console.error("Clipboard write failure: ", err);
                    navigator.clipboard.writeText(plainText)
                        .then(() => showToast("Copied as plain text (formatting not supported in this browser)", false))
                        .catch(() => showToast("Copy failed", false));
                });
        } catch (e) {
            console.error("Clipboard API write failed: ", e);
            showToast("Copy failed. Your browser might lack support.", false);
        }
    });

    // --- 5. BASE64 ENCODER/DECODER MODULE ---
    const base64Input = document.getElementById("base64-input");
    if (base64Input) {
        const base64Output = document.getElementById("base64-output");
        const base64SizeBadge = document.getElementById("base64-size-badge");
        const btnBase64Encode = document.getElementById("btn-base64-encode");
        const btnBase64Decode = document.getElementById("btn-base64-decode");
        const copyBase64Btn = document.getElementById("copy-base64-btn");
        const clearBase64 = document.getElementById("clear-base64");

        const updateBase64Metrics = () => {
            const bytes = new Blob([base64Input.value]).size;
            base64SizeBadge.textContent = `Input size: ${bytes} bytes`;
        };

        const safeUtf8Encode = (str) => {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode(parseInt(p1, 16));
            }));
        };

        const safeUtf8Decode = (str) => {
            return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
        };

        const base64UrlSafe = document.getElementById("base64-urlsafe");
        const base64File = document.getElementById("base64-file");

        if (base64File) {
            base64File.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    let res = evt.target.result;
                    if (base64UrlSafe?.checked) {
                        const parts = res.split(",");
                        if (parts.length === 2) {
                            parts[1] = parts[1].replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
                            res = parts.join(",");
                        }
                    }
                    if (base64Output) base64Output.value = res;
                    if (base64SizeBadge) base64SizeBadge.textContent = `File size: ${file.size} bytes`;
                    showToast("File encoded successfully!");
                };
                reader.readAsDataURL(file);
            });
        }

        btnBase64Encode.addEventListener("click", () => {
            const text = base64Input.value;
            if (!text) {
                showToast("Please enter some text first!", false);
                return;
            }
            try {
                let encoded = safeUtf8Encode(text);
                if (base64UrlSafe?.checked) {
                    encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
                }
                base64Output.value = encoded;
                showToast("Text encoded to Base64 successfully!");
            } catch (err) {
                showToast("Encoding failed: " + err.message, false);
            }
        });

        btnBase64Decode.addEventListener("click", () => {
            let text = base64Input.value.trim();
            if (!text) {
                showToast("Please paste Base64 code first!", false);
                return;
            }
            try {
                if (base64UrlSafe?.checked) {
                    text = text.replace(/-/g, "+").replace(/_/g, "/");
                    while (text.length % 4) text += "=";
                }
                const decoded = safeUtf8Decode(text);
                base64Output.value = decoded;
                showToast("Base64 decoded successfully!");
            } catch (err) {
                showToast("Invalid Base64 format!", false);
            }
        });

        base64Input.addEventListener("input", updateBase64Metrics);
        clearBase64.addEventListener("click", () => {
            base64Input.value = "";
            base64Output.value = "";
            if (base64File) base64File.value = "";
            updateBase64Metrics();
            base64Input.focus();
        });

        copyBase64Btn.addEventListener("click", () => {
            const outputVal = base64Output.value;
            if (!outputVal) {
                showToast("Nothing to copy!", false);
                return;
            }
            navigator.clipboard.writeText(outputVal)
                .then(() => showToast("Output copied to clipboard!"))
                .catch(() => showToast("Copy failed", false));
        });
    }

    // --- 7. CRYPTOGRAPHIC HASH GENERATOR MODULE ---
    const hashInput = document.getElementById("hash-input");
    if (hashInput) {
        const valHashMd5 = document.getElementById("val-hash-md5");
        const valHashSha256 = document.getElementById("val-hash-sha256");
        const copyHashMd5 = document.getElementById("copy-hash-md5");
        const copyHashSha256 = document.getElementById("copy-hash-sha256");
        const clearHash = document.getElementById("clear-hash");

        // Self-contained MD5 implementation
        function calculateMD5(str) {
            function rotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            }
            function addUnsigned(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                } else return (lResult ^ lX8 ^ lY8);
            }
            function F(x, y, z) { return (x & y) | (~x & z); }
            function G(x, y, z) { return (x & z) | (y & ~z); }
            function H(x, y, z) { return (x ^ y ^ z); }
            function I(x, y, z) { return (y ^ (x | ~z)); }
            function FF(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function GG(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function HH(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function II(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function convertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            }
            function wordToHex(lValue) {
                var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                }
                return WordToHexValue;
            }
            function utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) utftext += String.fromCharCode(c);
                    else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            }
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;
            string = utf8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k+0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k+1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k+2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k+3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k+4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k+5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k+6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k+7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k+8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k+9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k+1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k+6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k+0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k+5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k+4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k+9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k+3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k+8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k+2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k+7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k+5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k+8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k+1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k+4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k+7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k+0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k+3], S33, 0xD4EF3085);
                b = HH(c, d, a, b, x[k+6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k+9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k+2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k+0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k+7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k+5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k+3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k+1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k+8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k+6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k+4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k+2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k+9], S44, 0xEB86D391);
                a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD);
            }
            var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return temp.toLowerCase();
        }

        // Native SubtleCrypto digest function
        const computeDigest = async (algo, text) => {
            try {
                const msgBuffer = new TextEncoder().encode(text);
                const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
            } catch (err) {
                return "Error computing " + algo;
            }
        };

        const updateHashes = async () => {
            const text = hashInput.value;
            const useUpper = document.getElementById("hash-uppercase")?.checked || false;

            // List of algos and their subtle name, UI elements
            const algos = [
                { id: "md5", element: document.getElementById("val-hash-md5"), card: document.getElementById("hash-card-md5"), algoCheck: document.getElementById("hash-algo-md5") },
                { id: "sha-1", element: document.getElementById("val-hash-sha1"), card: document.getElementById("hash-card-sha1"), algoCheck: document.getElementById("hash-algo-sha1") },
                { id: "sha-256", element: document.getElementById("val-hash-sha256"), card: document.getElementById("hash-card-sha256"), algoCheck: document.getElementById("hash-algo-sha256") },
                { id: "sha-384", element: document.getElementById("val-hash-sha384"), card: document.getElementById("hash-card-sha384"), algoCheck: document.getElementById("hash-algo-sha384") },
                { id: "sha-512", element: document.getElementById("val-hash-sha512"), card: document.getElementById("hash-card-sha512"), algoCheck: document.getElementById("hash-algo-sha512") }
            ];

            const defaultHashes = {
                "md5": "d41d8cd98f00b204e9800998ecf8427e",
                "sha-1": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
                "sha-256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "sha-384": "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b",
                "sha-512": "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e"
            };

            for (const item of algos) {
                const isChecked = item.algoCheck ? item.algoCheck.checked : true;
                if (item.card) {
                    item.card.style.display = isChecked ? "block" : "none";
                }
                if (!isChecked) continue;

                let hashVal = "";
                if (!text) {
                    hashVal = defaultHashes[item.id];
                } else if (item.id === "md5") {
                    hashVal = calculateMD5(text);
                } else {
                    // SubtleCrypto names: SHA-1, SHA-256, SHA-384, SHA-512
                    const subtleName = item.id.toUpperCase();
                    hashVal = await computeDigest(subtleName, text);
                }

                if (item.element) {
                    item.element.textContent = useUpper ? hashVal.toUpperCase() : hashVal.toLowerCase();
                }
            }
        };

        hashInput.addEventListener("input", updateHashes);

        // Configuration listeners
        ["hash-uppercase", "hash-algo-md5", "hash-algo-sha1", "hash-algo-sha256", "hash-algo-sha384", "hash-algo-sha512"].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener("change", updateHashes);
            }
        });
        
        clearHash.addEventListener("click", () => {
            hashInput.value = "";
            updateHashes();
            hashInput.focus();
        });

        // Setup individual copy listeners
        ["md5", "sha1", "sha256", "sha384", "sha512"].forEach(id => {
            const btn = document.getElementById(`copy-hash-${id}`);
            const val = document.getElementById(`val-hash-${id}`);
            if (btn && val) {
                btn.addEventListener("click", () => {
                    navigator.clipboard.writeText(val.textContent)
                        .then(() => showToast(`${id.toUpperCase()} hash copied!`))
                        .catch(() => showToast("Copy failed", false));
                });
            }
        });
    }

    // --- 8. SEO URL SLUG GENERATOR MODULE ---
    const slugInput = document.getElementById("slug-input");
    if (slugInput) {
        const valSlugOutput = document.getElementById("val-slug-output");
        const clearSlug = document.getElementById("clear-slug");
        const copySlugBtn = document.getElementById("copy-slug-btn");

        const updateSlug = () => {
            const text = slugInput.value.trim();
            if (!text) {
                valSlugOutput.textContent = "your-url-slug-preview-here";
                return;
            }
            // Convert to URL slug format
            let slug = text
                .toLowerCase()
                .replace(/[\s_]+/g, "-") // spaces/underscores to hyphens
                .replace(/[^a-z0-9\-]/g, "") // remove non-alphanumeric chars (except hyphens)
                .replace(/-+/g, "-") // collapse multiple hyphens
                .replace(/^-+|-+$/g, ""); // trim trailing/leading hyphens
            
            valSlugOutput.textContent = slug || "empty-slug";
        };

        slugInput.addEventListener("input", updateSlug);

        clearSlug.addEventListener("click", () => {
            slugInput.value = "";
            updateSlug();
            slugInput.focus();
        });

        copySlugBtn.addEventListener("click", () => {
            const output = valSlugOutput.textContent;
            if (output === "your-url-slug-preview-here" || output === "empty-slug") {
                showToast("Please enter headline text first!", false);
                return;
            }
            navigator.clipboard.writeText(output)
                .then(() => showToast("SEO slug copied successfully!"))
                .catch(() => showToast("Copy failed", false));
        });
    }

    // --- 9. TEXT DIFF CHECKER MODULE ---
    const diffInputA = document.getElementById("diff-input-a");
    if (diffInputA) {
        const diffInputB = document.getElementById("diff-input-b");
        const btnCompareDiff = document.getElementById("btn-compare-diff");
        const valDiffOutput = document.getElementById("val-diff-output");

        const escapeHtml = (text) => {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        const computeDiff = () => {
            const textA = diffInputA.value;
            const textB = diffInputB.value;
            if (!textA && !textB) {
                valDiffOutput.textContent = "Please insert text inside both Source boxes to calculate difference.";
                return;
            }

            const linesA = textA.split("\n");
            const linesB = textB.split("\n");
            let resultHtml = "";
            const maxLines = Math.max(linesA.length, linesB.length);

            for (let i = 0; i < maxLines; i++) {
                const lineA = linesA[i];
                const lineB = linesB[i];

                if (lineA === undefined) {
                    // Line added in B
                    resultHtml += `<div style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 2px 8px; border-left: 3px solid #10b981;">+ ${escapeHtml(lineB)}</div>`;
                } else if (lineB === undefined) {
                    // Line deleted from A
                    resultHtml += `<div style="background: rgba(244, 63, 94, 0.15); color: #f43f5e; padding: 2px 8px; border-left: 3px solid #f43f5e;">- ${escapeHtml(lineA)}</div>`;
                } else if (lineA === lineB) {
                    // Mapped line match
                    resultHtml += `<div style="padding: 2px 8px; color: var(--text-color); opacity: 0.85;">  ${escapeHtml(lineA)}</div>`;
                } else {
                    // Line mismatch
                    resultHtml += `<div style="background: rgba(244, 63, 94, 0.15); color: #f43f5e; padding: 2px 8px; border-left: 3px solid #f43f5e;">- ${escapeHtml(lineA)}</div>`;
                    resultHtml += `<div style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 2px 8px; border-left: 3px solid #10b981;">+ ${escapeHtml(lineB)}</div>`;
                }
            }
            valDiffOutput.innerHTML = resultHtml;
            showToast("Comparison completed successfully!");
        };

        btnCompareDiff.addEventListener("click", computeDiff);
    }

    // --- 10. URL ENCODER/DECODER MODULE ---
    const urlInput = document.getElementById("url-input");
    if (urlInput) {
        const urlOutput = document.getElementById("url-output");
        const btnUrlEncode = document.getElementById("btn-url-encode");
        const btnUrlDecode = document.getElementById("btn-url-decode");
        const copyUrlBtn = document.getElementById("copy-url-btn");
        const clearUrl = document.getElementById("clear-url");

        btnUrlEncode.addEventListener("click", () => {
            const text = urlInput.value;
            if (!text) {
                showToast("Please enter a URL parameter first!", false);
                return;
            }
            try {
                urlOutput.value = encodeURIComponent(text);
                showToast("URL encoded successfully!");
            } catch (err) {
                showToast("Encoding failed!", false);
            }
        });

        btnUrlDecode.addEventListener("click", () => {
            const text = urlInput.value.trim();
            if (!text) {
                showToast("Please paste encoded URL query first!", false);
                return;
            }
            try {
                urlOutput.value = decodeURIComponent(text);
                showToast("URL decoded successfully!");
            } catch (err) {
                showToast("Invalid URL encoding standard!", false);
            }
        });

        clearUrl.addEventListener("click", () => {
            urlInput.value = "";
            urlOutput.value = "";
            urlInput.focus();
        });

        copyUrlBtn.addEventListener("click", () => {
            const outputVal = urlOutput.value;
            if (!outputVal) {
                showToast("Nothing to copy!", false);
                return;
            }
            navigator.clipboard.writeText(outputVal)
                .then(() => showToast("Output copied to clipboard!"))
                .catch(() => showToast("Copy failed", false));
        });
    }

    // --- 7. ADSEN COMPLIANCE CONTACT FORM ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contact-name").value;
            const email = document.getElementById("contact-email").value;
            const subject = document.getElementById("contact-subject").value;
            const message = document.getElementById("contact-message").value;

            if (name && email && subject && message) {
                showToast(`Message sent! Thank you ${name}. Rushikesh Wagh will reply soon.`);
                contactForm.reset();
            }
        });
    }

    // ================= DOCKERFILE GENERATOR =================
    // ============================================================
    //  DOCKERFILE GENERATOR — Production Level
    // ============================================================
    const btnGenDockerfile = document.getElementById("btn-gen-dockerfile");
    const dockerfileOutput  = document.getElementById("dockerfile-output");
    const dockerignoreOutput = document.getElementById("dockerignore-output");
    const copyDockerfileBtn = document.getElementById("copy-dockerfile-btn");
    const copyDockerignoreBtn = document.getElementById("copy-dockerignore-btn");
    const dfTabFile   = document.getElementById("df-tab-file");
    const dfTabIgnore = document.getElementById("df-tab-ignore");
    const dfPanelFile   = document.getElementById("df-panel-file");
    const dfPanelIgnore = document.getElementById("df-panel-ignore");

    // Tab switcher
    if (dfTabFile && dfTabIgnore) {
        dfTabFile.addEventListener("click", () => {
            dfPanelFile.style.display = ""; dfPanelIgnore.style.display = "none";
            dfTabFile.style.background = "rgba(99,102,241,0.12)"; dfTabFile.style.color = "var(--indigo)"; dfTabFile.style.borderBottomColor = "var(--indigo)";
            dfTabIgnore.style.background = "transparent"; dfTabIgnore.style.color = "var(--text-muted)"; dfTabIgnore.style.borderBottomColor = "transparent";
        });
        dfTabIgnore.addEventListener("click", () => {
            dfPanelFile.style.display = "none"; dfPanelIgnore.style.display = "";
            dfTabIgnore.style.background = "rgba(99,102,241,0.12)"; dfTabIgnore.style.color = "var(--indigo)"; dfTabIgnore.style.borderBottomColor = "var(--indigo)";
            dfTabFile.style.background = "transparent"; dfTabFile.style.color = "var(--text-muted)"; dfTabFile.style.borderBottomColor = "transparent";
        });
    }

    // Version options per runtime
    const runtimeVersions = {
        node:   [["20-alpine","20-alpine (LTS, recommended)"],["18-alpine","18-alpine (LTS)"],["22-alpine","22-alpine (Current)"],["20-slim","20-slim (Debian slim)"],["20-bookworm-slim","20-bookworm-slim"]],
        python: [["3.12-slim","3.12-slim (latest)"],["3.11-slim","3.11-slim (stable)"],["3.10-slim","3.10-slim"],["3.12-alpine","3.12-alpine (smallest)"],["3.11-alpine","3.11-alpine"]],
        go:     [["1.22-alpine","1.22-alpine (latest)"],["1.21-alpine","1.21-alpine"],["1.22-bookworm","1.22-bookworm (Debian)"]],
        java:   [["21","21 (LTS)"],["17","17 (LTS)"],["11","11 (LTS)"]],
        php:    [["8.3-fpm-alpine","8.3-fpm-alpine"],["8.2-fpm-alpine","8.2-fpm-alpine"],["8.1-fpm-alpine","8.1-fpm-alpine"]],
        ruby:   [["3.3-alpine","3.3-alpine"],["3.2-alpine","3.2-alpine"]],
        rust:   [["1.78-alpine","1.78-alpine"],["1.77-slim","1.77-slim"]],
        nginx:  [["1.25-alpine","1.25-alpine (stable)"],["1.26-alpine","1.26-alpine (latest)"],["alpine","alpine (latest-stable)"]],
        dotnet: [["8.0-alpine","8.0-alpine (LTS)"],["6.0-alpine","6.0-alpine (LTS)"],["7.0-alpine","7.0-alpine"]]
    };
    const frameworksByRuntime = {
        node:   [["express","Express.js"],["fastify","Fastify"],["nestjs","NestJS"],["nextjs","Next.js"],["vite","Vite SPA"],["generic","Generic / Custom"]],
        python: [["fastapi","FastAPI + uvicorn"],["flask","Flask"],["django","Django"],["gunicorn","Gunicorn (WSGI)"],["generic","Generic / Custom"]],
        go:     [["gin","Gin"],["fiber","Fiber"],["echo","Echo"],["generic","Generic / Custom"]],
        java:   [["spring","Spring Boot"],["quarkus","Quarkus"],["generic","Generic / Custom"]],
        php:    [["laravel","Laravel"],["symfony","Symfony"],["generic","Generic / Custom"]],
        ruby:   [["rails","Ruby on Rails"],["sinatra","Sinatra"],["generic","Generic / Custom"]],
        rust:   [["actix","Actix-web"],["axum","Axum"],["generic","Generic / Custom"]],
        nginx:  [["react","React / Vite build"],["vue","Vue build"],["angular","Angular build"],["generic","Static HTML"]],
        dotnet: [["webapi","ASP.NET Web API"],["mvc","ASP.NET MVC"],["generic","Generic / Custom"]]
    };

    // Update version + framework dropdowns when runtime changes
    const dfLang      = document.getElementById("df-lang");
    const dfVersion   = document.getElementById("df-version");
    const dfFramework = document.getElementById("df-framework");
    const dfPkgmgr    = document.getElementById("df-pkgmgr");

    function updateDfDropdowns() {
        const lang = dfLang?.value || "node";
        if (dfVersion) {
            dfVersion.innerHTML = (runtimeVersions[lang] || runtimeVersions.node)
                .map(([v,l]) => `<option value="${v}">${l}</option>`).join("");
        }
        if (dfFramework) {
            dfFramework.innerHTML = (frameworksByRuntime[lang] || frameworksByRuntime.node)
                .map(([v,l]) => `<option value="${v}">${l}</option>`).join("");
        }
        // Show/hide package manager for Node.js only
        if (dfPkgmgr) {
            dfPkgmgr.closest(".qr-field").style.display = ["node","nginx"].includes(lang) ? "" : "none";
        }
    }
    if (dfLang) { dfLang.addEventListener("change", updateDfDropdowns); updateDfDropdowns(); }

    // ── Main Dockerfile generator ─────────────────────────────
    function generateDockerfileContent() {
        const lang       = document.getElementById("df-lang")?.value || "node";
        const version    = document.getElementById("df-version")?.value || "20-alpine";
        const env        = document.getElementById("df-env")?.value || "prod";
        const framework  = document.getElementById("df-framework")?.value || "express";
        const pkgmgr     = document.getElementById("df-pkgmgr")?.value || "npm";
        const port       = document.getElementById("df-port")?.value || "3000";
        const workdir    = document.getElementById("df-workdir")?.value || "/app";
        const appuser    = document.getElementById("df-appuser")?.value || "appuser";
        const maintainer = document.getElementById("df-maintainer")?.value || "";
        const envvars    = document.getElementById("df-envvars")?.value || "";
        const buildArgs  = document.getElementById("df-build-args")?.value || "";
        const useNonRoot   = document.getElementById("df-nonroot")?.checked !== false;
        const useHealth    = document.getElementById("df-healthcheck")?.checked !== false;
        const useLabels    = document.getElementById("df-labels")?.checked !== false;
        const useMultistage = document.getElementById("df-multistage")?.checked !== false;
        const useComments  = document.getElementById("df-comments")?.checked !== false;

        const c = useComments ? (s) => s : () => "";
        const now = new Date().toISOString().split("T")[0];

        // Parse extra ENV vars
        const extraEnv = envvars.trim().split("\n").filter(l => l.trim() && l.includes("="));
        const extraArgs = buildArgs.trim().split("\n").filter(l => l.trim());

        // Labels block
        let labelBlock = "";
        if (useLabels) {
            labelBlock = `LABEL org.opencontainers.image.created="${now}" \\\n`;
            if (maintainer) labelBlock += `      org.opencontainers.image.authors="${maintainer}" \\\n`;
            labelBlock += `      org.opencontainers.image.version="1.0.0" \\\n`;
            labelBlock += `      org.opencontainers.image.title="${lang}-app" \\\n`;
            labelBlock += `      org.opencontainers.image.description="Production ${lang} application"\n`;
        }

        // ARG block
        const argBlock = extraArgs.length
            ? extraArgs.map(a => `ARG ${a}`).join("\n") + "\n"
            : "";

        // ENV block  
        const envBlock = extraEnv.length
            ? "ENV " + extraEnv.map(e => e.trim()).join(" \\\n    ") + "\n"
            : "";

        // Non-root user block
        const userSetup = useNonRoot
            ? `RUN addgroup -S ${appuser} && adduser -S ${appuser} -G ${appuser}\n`
            : "";
        const userSwitch = useNonRoot ? `USER ${appuser}\n` : "";

        // Healthcheck
        const healthCheck = useHealth
            ? `HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \\\n  CMD wget --no-verbose --tries=1 --spider http://localhost:${port}/health || exit 1\n`
            : "";

        // Install command per package manager
        const installCmds = {
            npm:  { ci: "npm ci --only=production", dev: "npm install", run: "npm run" },
            yarn: { ci: "yarn install --frozen-lockfile --production", dev: "yarn install", run: "yarn" },
            pnpm: { ci: "corepack enable && pnpm install --frozen-lockfile --prod", dev: "corepack enable && pnpm install", run: "pnpm" },
            bun:  { ci: "bun install --production", dev: "bun install", run: "bun run" }
        };
        const pm = installCmds[pkgmgr] || installCmds.npm;
        const lockFile = { npm:"package-lock.json", yarn:"yarn.lock", pnpm:"pnpm-lock.yaml", bun:"bun.lockb" }[pkgmgr] || "package-lock.json";

        let dockerfile = "";

        if (lang === "node") {
            if (env === "prod" && useMultistage) {
                dockerfile = [
                    c("# ════════════════════════════════════════════════════════════"),
                    c(`# Stage 1: Dependencies — install production deps only`),
                    c("# ════════════════════════════════════════════════════════════"),
                    `FROM node:${version} AS deps`,
                    `WORKDIR ${workdir}`,
                    argBlock,
                    c("# Copy lockfile + manifest for optimal layer caching"),
                    `COPY package.json ${lockFile} ./`,
                    `RUN ${pm.ci}`,
                    "",
                    c("# ════════════════════════════════════════════════════════════"),
                    c(`# Stage 2: Builder — compile TypeScript / build assets`),
                    c("# ════════════════════════════════════════════════════════════"),
                    `FROM node:${version} AS builder`,
                    `WORKDIR ${workdir}`,
                    c("# Re-copy manifests and install all deps (including devDeps)"),
                    `COPY package.json ${lockFile} ./`,
                    `RUN ${pkgmgr === "npm" ? "npm ci" : pm.dev.replace("--production","").replace("--prod","")}`,
                    `COPY . .`,
                    framework === "nextjs" ? `RUN ${pm.run} build` :
                    framework === "nestjs" ? `RUN ${pm.run} build` :
                    framework === "vite"   ? `RUN ${pm.run} build` :
                    c("# RUN npm run build  ← uncomment if you have a build step"),
                    "",
                    c("# ════════════════════════════════════════════════════════════"),
                    c(`# Stage 3: Production runtime — lean final image`),
                    c("# ════════════════════════════════════════════════════════════"),
                    `FROM node:${version} AS production`,
                    "",
                    labelBlock,
                    c("# Security: create non-privileged user"),
                    userSetup,
                    `WORKDIR ${workdir}`,
                    "",
                    c("# Runtime environment"),
                    `ENV NODE_ENV=production`,
                    `ENV PORT=${port}`,
                    envBlock,
                    c("# Copy production node_modules from deps stage"),
                    `COPY --from=deps ${workdir}/node_modules ./node_modules`,
                    framework === "nextjs"
                        ? `COPY --from=builder ${workdir}/.next ./.next\nCOPY --from=builder ${workdir}/public ./public\nCOPY --from=builder ${workdir}/package.json ./`
                        : framework === "nestjs" || framework === "vite"
                        ? `COPY --from=builder ${workdir}/dist ./dist\nCOPY --from=builder ${workdir}/package.json ./`
                        : `COPY --from=builder ${workdir} .`,
                    "",
                    userSwitch,
                    healthCheck,
                    `EXPOSE ${port}`,
                    "",
                    framework === "nextjs"  ? `CMD ["node", "node_modules/.bin/next", "start"]` :
                    framework === "nestjs"  ? `CMD ["node", "dist/main.js"]` :
                    framework === "vite"    ? `CMD ["node", "dist/server.js"]` :
                    framework === "fastify" ? `CMD ["node", "src/index.js"]` :
                    `CMD ["node", "src/server.js"]`
                ].filter(l => l !== undefined).join("\n");

            } else {
                // Dev mode
                dockerfile = [
                    c("# Development Dockerfile — with hot reload"),
                    `FROM node:${version}`,
                    labelBlock,
                    `WORKDIR ${workdir}`,
                    `ENV NODE_ENV=development`,
                    `ENV PORT=${port}`,
                    envBlock,
                    c("# Install dependencies"),
                    `COPY package.json ${lockFile} ./`,
                    `RUN ${pm.dev}`,
                    c("# Copy source code (bind-mount in compose for live reload)"),
                    `COPY . .`,
                    `EXPOSE ${port}`,
                    framework === "nextjs"  ? `CMD ["${pkgmgr}", "run", "dev"]` :
                    framework === "nestjs"  ? `CMD ["${pkgmgr}", "run", "start:dev"]` :
                    `CMD ["${pkgmgr}", "run", "dev"]`
                ].filter(l => l !== undefined).join("\n");
            }

        } else if (lang === "python") {
            const pyVer = version.replace("-slim","").replace("-alpine","");
            const sitePackages = `/usr/local/lib/python${pyVer}/site-packages`;
            const runCmd = {
                fastapi: `CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "${port}", "--workers", "4"]`,
                flask:   `CMD ["gunicorn", "--bind", "0.0.0.0:${port}", "--workers", "4", "app:app"]`,
                django:  `CMD ["gunicorn", "--bind", "0.0.0.0:${port}", "--workers", "4", "config.wsgi:application"]`,
                gunicorn:`CMD ["gunicorn", "--bind", "0.0.0.0:${port}", "--workers", "4", "wsgi:app"]`,
                generic: `CMD ["python", "main.py"]`
            }[framework] || `CMD ["python", "main.py"]`;

            if (env === "prod" && useMultistage) {
                dockerfile = [
                    c("# ════════════════════════════════════════════════════════════"),
                    c("# Stage 1: Build — install Python dependencies"),
                    c("# ════════════════════════════════════════════════════════════"),
                    `FROM python:${version} AS builder`,
                    `WORKDIR /build`,
                    argBlock,
                    `RUN pip install --upgrade pip`,
                    c("# Install deps into isolated /install directory"),
                    `COPY requirements.txt .`,
                    `RUN pip install --no-cache-dir --prefix=/install -r requirements.txt`,
                    "",
                    c("# ════════════════════════════════════════════════════════════"),
                    c("# Stage 2: Production runtime"),
                    c("# ════════════════════════════════════════════════════════════"),
                    `FROM python:${version} AS production`,
                    "",
                    labelBlock,
                    c("# Copy installed packages from builder"),
                    `COPY --from=builder /install /usr/local`,
                    "",
                    c("# Security: non-root user"),
                    useNonRoot ? `RUN useradd -r -u 1001 -g root ${appuser}` : "",
                    `WORKDIR ${workdir}`,
                    "",
                    `ENV PYTHONDONTWRITEBYTECODE=1`,
                    `ENV PYTHONUNBUFFERED=1`,
                    `ENV PORT=${port}`,
                    envBlock,
                    "",
                    `COPY --chown=${appuser}:root . .`,
                    useNonRoot ? `USER ${appuser}` : "",
                    "",
                    healthCheck,
                    `EXPOSE ${port}`,
                    runCmd
                ].filter(l => l !== undefined && l !== null).join("\n");
            } else {
                dockerfile = [
                    c("# Python Development Dockerfile"),
                    `FROM python:${version}`,
                    labelBlock,
                    `WORKDIR ${workdir}`,
                    `ENV PYTHONDONTWRITEBYTECODE=1`,
                    `ENV PYTHONUNBUFFERED=1`,
                    `ENV PORT=${port}`,
                    envBlock,
                    `COPY requirements.txt .`,
                    `RUN pip install --no-cache-dir -r requirements.txt`,
                    `COPY . .`,
                    `EXPOSE ${port}`,
                    runCmd.replace("--workers\", \"4", "--workers\", \"1").replace("--reload","") + (framework === "fastapi" ? ` --reload` : "")
                ].filter(l=>l).join("\n");
            }

        } else if (lang === "go") {
            dockerfile = [
                c("# ════════════════════════════════════════════════════════════"),
                c("# Stage 1: Build Go binary (statically linked)"),
                c("# ════════════════════════════════════════════════════════════"),
                `FROM golang:${version} AS builder`,
                `WORKDIR /build`,
                argBlock,
                c("# Download modules first (cached layer)"),
                `COPY go.mod go.sum ./`,
                `RUN go mod download && go mod verify`,
                "",
                `COPY . .`,
                c("# Build: CGO disabled for static binary, strip debug symbols"),
                `RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \\`,
                `    go build -ldflags="-w -s -X main.Version=${buildArgs ? "\\${APP_VERSION}" : "1.0.0"}" \\`,
                `    -o /build/app ./cmd/... 2>/dev/null || go build -ldflags="-w -s" -o /build/app .`,
                "",
                c("# ════════════════════════════════════════════════════════════"),
                c("# Stage 2: Minimal final image (scratch or alpine)"),
                c("# ════════════════════════════════════════════════════════════"),
                useNonRoot ? `FROM alpine:3.19 AS production` : `FROM scratch AS production`,
                labelBlock,
                useNonRoot ? [
                    `RUN apk --no-cache add ca-certificates tzdata wget`,
                    `RUN addgroup -S ${appuser} && adduser -S ${appuser} -G ${appuser}`,
                ].join("\n") : `COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/`,
                `COPY --from=builder /build/app /app`,
                envBlock,
                useNonRoot ? `USER ${appuser}` : "",
                healthCheck.replace("wget --no-verbose --tries=1 --spider", "wget -q --spider"),
                `EXPOSE ${port}`,
                `ENTRYPOINT ["/app"]`
            ].filter(l=>l).join("\n");

        } else if (lang === "java") {
            dockerfile = [
                c("# ════════════════════════════════════════════════════════════"),
                c("# Stage 1: Build with Maven"),
                c("# ════════════════════════════════════════════════════════════"),
                `FROM maven:3.9-eclipse-temurin-${version} AS builder`,
                `WORKDIR /build`,
                argBlock,
                c("# Download dependencies first (cached)"),
                `COPY pom.xml .`,
                `RUN mvn dependency:go-offline -q`,
                "",
                `COPY src ./src`,
                `RUN mvn package -DskipTests -q`,
                "",
                c("# ════════════════════════════════════════════════════════════"),
                c("# Stage 2: JRE-only runtime image"),
                c("# ════════════════════════════════════════════════════════════"),
                `FROM eclipse-temurin:${version}-jre-alpine AS production`,
                labelBlock,
                useNonRoot ? `RUN addgroup -S ${appuser} && adduser -S ${appuser} -G ${appuser}` : "",
                `WORKDIR ${workdir}`,
                "",
                `ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseContainerSupport"`,
                `ENV SERVER_PORT=${port}`,
                envBlock,
                "",
                `COPY --from=builder /build/target/*.jar app.jar`,
                useNonRoot ? `RUN chown ${appuser}:${appuser} app.jar\nUSER ${appuser}` : "",
                "",
                healthCheck.replace("wget","wget").replace("/health",":${SERVER_PORT}/actuator/health"),
                `EXPOSE ${port}`,
                `ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`
            ].filter(l=>l).join("\n");

        } else if (lang === "nginx") {
            const buildTool = framework === "angular" ? "ng build --configuration=production" : "npm run build";
            const distDir   = { react:"dist", vue:"dist", angular:"dist/app/browser", generic:"." }[framework] || "dist";
            dockerfile = [
                c("# ════════════════════════════════════════════════════════════"),
                c(`# Stage 1: Build ${framework} application`),
                c("# ════════════════════════════════════════════════════════════"),
                `FROM node:20-alpine AS builder`,
                `WORKDIR /app`,
                argBlock,
                `COPY package.json package-lock.json ./`,
                `RUN npm ci`,
                `COPY . .`,
                `RUN ${buildTool}`,
                "",
                c("# ════════════════════════════════════════════════════════════"),
                c("# Stage 2: Nginx static file server"),
                c("# ════════════════════════════════════════════════════════════"),
                `FROM nginx:${version} AS production`,
                labelBlock,
                c("# Remove default nginx config"),
                `RUN rm -f /etc/nginx/conf.d/default.conf`,
                c("# Copy custom nginx config"),
                `COPY nginx.conf /etc/nginx/conf.d/default.conf`,
                c("# Copy built assets from builder stage"),
                `COPY --from=builder /app/${distDir} /usr/share/nginx/html`,
                "",
                c("# Nginx runs as non-root by default (nginx user)"),
                healthCheck.replace("wget --no-verbose --tries=1 --spider http://localhost:${port}/health","curl -f http://localhost:80/ "),
                `EXPOSE 80`,
                `CMD ["nginx", "-g", "daemon off;"]`
            ].filter(l=>l).join("\n");

        } else if (lang === "php") {
            dockerfile = [
                c("# PHP + Nginx Production Dockerfile"),
                `FROM composer:2 AS composer`,
                `WORKDIR /app`,
                `COPY composer.json composer.lock ./`,
                `RUN composer install --no-dev --optimize-autoloader --no-scripts`,
                "",
                `FROM php:${version} AS production`,
                labelBlock,
                `RUN apk --no-cache add nginx supervisor`,
                c("# Install PHP extensions"),
                `RUN docker-php-ext-install pdo pdo_mysql opcache`,
                `WORKDIR ${workdir}`,
                envBlock,
                `COPY --from=composer /app/vendor ./vendor`,
                `COPY . .`,
                `COPY docker/nginx.conf /etc/nginx/http.d/default.conf`,
                `COPY docker/supervisord.conf /etc/supervisord.conf`,
                `RUN chown -R www-data:www-data ${workdir}`,
                `EXPOSE ${port}`,
                `CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]`
            ].filter(l=>l).join("\n");

        } else if (lang === "rust") {
            dockerfile = [
                c("# Rust Multi-Stage Build"),
                `FROM rust:${version} AS builder`,
                `WORKDIR /build`,
                argBlock,
                c("# Cache dependencies layer"),
                `COPY Cargo.toml Cargo.lock ./`,
                `RUN mkdir src && echo 'fn main(){}' > src/main.rs`,
                `RUN cargo build --release && rm -f target/release/deps/app*`,
                `COPY src ./src`,
                `RUN cargo build --release`,
                "",
                `FROM alpine:3.19 AS production`,
                labelBlock,
                `RUN apk --no-cache add ca-certificates`,
                useNonRoot ? `RUN addgroup -S ${appuser} && adduser -S ${appuser} -G ${appuser}` : "",
                `WORKDIR ${workdir}`,
                `COPY --from=builder /build/target/release/app .`,
                envBlock,
                useNonRoot ? `USER ${appuser}` : "",
                healthCheck,
                `EXPOSE ${port}`,
                `CMD ["./app"]`
            ].filter(l=>l).join("\n");

        } else if (lang === "dotnet") {
            const sdkVer    = version.replace("-alpine","");
            const runtimeVer = sdkVer;
            dockerfile = [
                c("# .NET Multi-Stage Build"),
                `FROM mcr.microsoft.com/dotnet/sdk:${sdkVer} AS builder`,
                `WORKDIR /build`,
                argBlock,
                `COPY *.csproj ./`,
                `RUN dotnet restore`,
                `COPY . .`,
                `RUN dotnet publish -c Release -o /publish --no-restore`,
                "",
                `FROM mcr.microsoft.com/dotnet/aspnet:${runtimeVer} AS production`,
                labelBlock,
                useNonRoot ? `RUN useradd -r -u 1001 -g root ${appuser}` : "",
                `WORKDIR ${workdir}`,
                `ENV ASPNETCORE_URLS=http://+:${port}`,
                `ENV ASPNETCORE_ENVIRONMENT=Production`,
                envBlock,
                `COPY --from=builder /publish .`,
                useNonRoot ? `USER ${appuser}` : "",
                healthCheck.replace("wget","curl -f"),
                `EXPOSE ${port}`,
                `ENTRYPOINT ["dotnet", "app.dll"]`
            ].filter(l=>l).join("\n");

        } else if (lang === "ruby") {
            dockerfile = [
                c("# Ruby on Rails Production Dockerfile"),
                `FROM ruby:${version} AS builder`,
                argBlock,
                `WORKDIR ${workdir}`,
                `RUN apk add --no-cache build-base postgresql-dev nodejs yarn`,
                `COPY Gemfile Gemfile.lock ./`,
                `RUN bundle config set --local without 'development test'`,
                `RUN bundle install --jobs 4 --retry 3`,
                `COPY . .`,
                framework === "rails" ? `RUN bundle exec rails assets:precompile` : "",
                "",
                `FROM ruby:${version} AS production`,
                labelBlock,
                `RUN apk add --no-cache postgresql-libs nodejs`,
                useNonRoot ? `RUN addgroup -S ${appuser} && adduser -S ${appuser} -G ${appuser}` : "",
                `WORKDIR ${workdir}`,
                `ENV RAILS_ENV=production`,
                `ENV PORT=${port}`,
                envBlock,
                `COPY --from=builder ${workdir} .`,
                useNonRoot ? `USER ${appuser}` : "",
                healthCheck,
                `EXPOSE ${port}`,
                framework === "rails" ? `CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]`
                    : `CMD ["bundle", "exec", "ruby", "app.rb"]`
            ].filter(l=>l).join("\n");
        }

        return dockerfile.replace(/\n{3,}/g, "\n\n").trim();
    }

    // .dockerignore generator
    function generateDockerignoreContent() {
        const lang = document.getElementById("df-lang")?.value || "node";
        const ignores = {
            node: `# Node.js .dockerignore
node_modules/
npm-debug.log*
yarn-error.log
.pnp
.pnp.js
.yarn/cache
.yarn/unplugged

# Build artifacts
dist/
build/
.next/
.nuxt/
out/

# Tests
coverage/
__tests__/
*.test.js
*.spec.js
*.test.ts
*.spec.ts

# Development & editor files
.git/
.gitignore
.gitattributes
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
*.log
.eslintrc*
.prettierrc*
.babelrc
jest.config.*
tsconfig.spec.json
.vscode/
.idea/
README.md
CHANGELOG.md
Dockerfile.dev
docker-compose.dev.yml
docs/`,

            python: `# Python .dockerignore
__pycache__/
*.py[cod]
*$py.class
*.pyc
*.pyo
.Python
env/
venv/
.venv/
.ENV/
pip-log.txt
pip-delete-this-directory.txt

# Tests
.pytest_cache/
.coverage
htmlcov/
*.cover
.hypothesis/

# Distribution / packaging
dist/
build/
*.egg-info/
.eggs/

# Editor & system files
.git/
.gitignore
.env
.env.*
!.env.example
.DS_Store
.idea/
.vscode/
*.log
celerybeat-schedule
README.md
docs/
tests/
Dockerfile.dev`,

            go: `# Go .dockerignore
.git/
.gitignore
.gitattributes
*.md
docs/
tests/
*_test.go
testdata/
.env
.env.*
!.env.example
.DS_Store
.idea/
.vscode/
Makefile
docker-compose*.yml
Dockerfile.dev
*.log
bin/
tmp/`,

            java: `# Java .dockerignore
.git/
.gitignore
target/
*.class
*.jar
!app.jar
.mvn/
*.iml
.idea/
.vscode/
.DS_Store
*.md
docs/
src/test/
.env
*.log`,

            nginx: `# Nginx / Frontend .dockerignore
node_modules/
.git/
.gitignore
src/
public/
index.html
*.ts
*.tsx
*.jsx
*.vue
*.scss
*.sass
*.less
vite.config.*
webpack.config.*
jest.config.*
.eslintrc*
.prettierrc*
.env
.env.*
!.env.example
coverage/
.DS_Store
.idea/
.vscode/
README.md
docs/`,

            default: `# .dockerignore
.git/
.gitignore
.gitattributes
.env
.env.*
!.env.example
.DS_Store
.idea/
.vscode/
*.log
README.md
docs/
tests/
Dockerfile.dev
docker-compose.dev.yml`
        };
        return ignores[lang] || ignores.default;
    }

    if (btnGenDockerfile && dockerfileOutput) {
        btnGenDockerfile.addEventListener("click", () => {
            const df = generateDockerfileContent();
            if (dockerfileOutput) dockerfileOutput.value = df;
            if (dockerignoreOutput) dockerignoreOutput.value = generateDockerignoreContent();
            showToast("✅ Production Dockerfile + .dockerignore generated!");
        });
    }
    if (copyDockerfileBtn) {
        copyDockerfileBtn.addEventListener("click", () => {
            if (dockerfileOutput?.value) { navigator.clipboard.writeText(dockerfileOutput.value); showToast("Dockerfile copied!"); }
        });
    }
    if (copyDockerignoreBtn) {
        copyDockerignoreBtn.addEventListener("click", () => {
            if (dockerignoreOutput?.value) { navigator.clipboard.writeText(dockerignoreOutput.value); showToast(".dockerignore copied!"); }
        });
    }

    // ============================================================
    //  DOCKER COMPOSE BUILDER — Production Level
    // ============================================================
    const btnGenCompose  = document.getElementById("btn-gen-compose");
    const composeOutput  = document.getElementById("compose-output");
    const copyComposeBtn = document.getElementById("copy-compose-btn");

    function generateComposeYaml() {
        const services = [];
        const sel = id => document.getElementById(id);
        if (sel("dc-node")?.checked)     services.push("node");
        if (sel("dc-python")?.checked)   services.push("python");
        if (sel("dc-postgres")?.checked) services.push("postgres");
        if (sel("dc-mysql")?.checked)    services.push("mysql");
        if (sel("dc-redis")?.checked)    services.push("redis");
        if (sel("dc-mongo")?.checked)    services.push("mongo");
        if (sel("dc-nginx")?.checked)    services.push("nginx");
        if (sel("dc-rabbitmq")?.checked) services.push("rabbitmq");
        if (sel("dc-elasticsearch")?.checked) services.push("elasticsearch");
        if (sel("dc-grafana")?.checked)  services.push("grafana");
        if (sel("dc-mailhog")?.checked)  services.push("mailhog");
        if (sel("dc-minio")?.checked)    services.push("minio");

        if (!services.length) { showToast("Select at least one service"); return null; }

        const withHealth  = sel("dc-healthchecks")?.checked !== false;
        const withLimits  = sel("dc-limits")?.checked;
        const withNetworks = sel("dc-networks")?.checked !== false;
        const withSecrets = sel("dc-secrets")?.checked;
        const restartPol  = sel("dc-restart")?.value || "unless-stopped";
        const appPort     = sel("dc-appport")?.value || "3000";
        const pgDb        = sel("dc-pgdb")?.value || "mydb";
        const pgUser      = sel("dc-pguser")?.value || "appuser";
        const appName     = sel("dc-appname")?.value || "app";
        const envFile     = sel("dc-envfile")?.value || ".env";

        const hasFrontend = services.includes("nginx");
        const hasApp      = services.includes("node") || services.includes("python");
        const hasDb       = services.includes("postgres") || services.includes("mysql") || services.includes("mongo");
        const hasCache    = services.includes("redis");

        let out = `# ════════════════════════════════════════════════════════════════
# docker-compose.yml — Generated by Utilify Tool
# Generated: ${new Date().toISOString().split("T")[0]}
# ════════════════════════════════════════════════════════════════
\n`;

        // Secrets
        if (withSecrets) {
            out += `secrets:\n`;
            if (hasDb) out += `  db_password:\n    file: ./secrets/db_password.txt\n`;
            out += `  jwt_secret:\n    file: ./secrets/jwt_secret.txt\n`;
            out += `\n`;
        }

        // Networks
        if (withNetworks && hasApp) {
            out += `networks:\n`;
            if (hasFrontend || hasApp) out += `  frontend:\n    driver: bridge\n`;
            if (hasDb || hasCache)     out += `  backend:\n    driver: bridge\n    internal: true\n`;
            out += `\n`;
        }

        // Volumes
        const volumes = [];
        if (services.includes("postgres"))     volumes.push("pgdata");
        if (services.includes("mysql"))        volumes.push("mysqldata");
        if (services.includes("redis"))        volumes.push("redisdata");
        if (services.includes("mongo"))        volumes.push("mongodata");
        if (services.includes("rabbitmq"))     volumes.push("rabbitmqdata");
        if (services.includes("elasticsearch")) volumes.push("esdata");
        if (services.includes("grafana"))      volumes.push("grafanadata");
        if (services.includes("minio"))        volumes.push("miniodata");

        if (volumes.length) {
            out += `volumes:\n${volumes.map(v => `  ${v}:\n`).join("")}\n`;
        }

        // ── Services ─────────────────────────────────────────────
        out += `services:\n`;

        // NGINX
        if (services.includes("nginx")) {
            const depCond = hasApp ? `    depends_on:\n      ${appName}:\n        condition: ${withHealth ? "service_healthy" : "service_started"}\n` : "";
            out += `
  # ── Nginx Reverse Proxy ─────────────────────────────────────
  nginx:
    image: nginx:1.25-alpine
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-nginx
    ports:
      - "\${NGINX_HTTP_PORT:-80}:80"
      - "\${NGINX_HTTPS_PORT:-443}:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
${depCond}    networks: ${withNetworks && hasApp ? "[frontend]" : "[\"default\"]"}
    restart: ${restartPol}
${withHealth ? `    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
` : ""}`;
        }

        // NODE.JS APP
        if (services.includes("node")) {
            const depends = [];
            if (services.includes("postgres")) depends.push(`      postgres:\n        condition: ${withHealth ? "service_healthy" : "service_started"}`);
            if (services.includes("mysql"))    depends.push(`      mysql:\n        condition: ${withHealth ? "service_healthy" : "service_started"}`);
            if (services.includes("redis"))    depends.push(`      redis:\n        condition: ${withHealth ? "service_healthy" : "service_started"}`);
            if (services.includes("mongo"))    depends.push(`      mongo:\n        condition: ${withHealth ? "service_healthy" : "service_started"}`);
            const depBlock = depends.length ? `    depends_on:\n${depends.join("\n")}\n` : "";
            const netBlock = withNetworks ? `    networks: [frontend, backend]\n` : "";
            out += `
  # ── Node.js Application ─────────────────────────────────────
  ${appName}:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-${appName}
    ports:
      - "\${APP_PORT:-${appPort}}:${appPort}"
    environment:
      - NODE_ENV=\${NODE_ENV:-production}
      - PORT=${appPort}
      - DATABASE_URL=\${DATABASE_URL:-postgres://${pgUser}:\${DB_PASSWORD}@postgres:5432/${pgDb}}
      - REDIS_URL=\${REDIS_URL:-redis://redis:6379}
      - JWT_SECRET=\${JWT_SECRET:-change-me-in-production}
    env_file:
      - ${envFile}
${withSecrets ? `    secrets:\n      - db_password\n      - jwt_secret\n` : ""}${depBlock}${withHealth ? `    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:${appPort}/health"]
      interval: 30s
      timeout: 10s
      start_period: 20s
      retries: 3
` : ""}    volumes:
      - ./logs:/app/logs
${netBlock}    restart: ${restartPol}
${withLimits ? `    deploy:
      resources:
        limits:
          cpus: '\${APP_CPU_LIMIT:-1.0}'
          memory: \${APP_MEM_LIMIT:-512M}
        reservations:
          cpus: '0.25'
          memory: 128M
` : ""}`;
        }

        // PYTHON APP
        if (services.includes("python")) {
            const depends = [];
            if (services.includes("postgres")) depends.push(`      postgres:\n        condition: ${withHealth ? "service_healthy" : "service_started"}`);
            if (services.includes("redis"))    depends.push(`      redis:\n        condition: ${withHealth ? "service_healthy" : "service_started"}`);
            const depBlock = depends.length ? `    depends_on:\n${depends.join("\n")}\n` : "";
            out += `
  # ── Python Application ───────────────────────────────────────
  ${appName}:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-${appName}
    ports:
      - "\${APP_PORT:-${appPort}}:${appPort}"
    environment:
      - ENV=production
      - PORT=${appPort}
      - DATABASE_URL=\${DATABASE_URL:-postgresql://${pgUser}:\${DB_PASSWORD}@postgres:5432/${pgDb}}
      - REDIS_URL=\${REDIS_URL:-redis://redis:6379}
    env_file:
      - ${envFile}
${withSecrets ? `    secrets:\n      - db_password\n` : ""}${depBlock}${withHealth ? `    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:${appPort}/health"]
      interval: 30s
      timeout: 10s
      start_period: 30s
      retries: 3
` : ""}    volumes:
      - ./logs:/app/logs
${withNetworks ? `    networks: [frontend, backend]\n` : ""}    restart: ${restartPol}
${withLimits ? `    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
` : ""}`;
        }

        // POSTGRESQL
        if (services.includes("postgres")) {
            out += `
  # ── PostgreSQL Database ──────────────────────────────────────
  postgres:
    image: postgres:16-alpine
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-postgres
    environment:
      POSTGRES_DB: \${POSTGRES_DB:-${pgDb}}
      POSTGRES_USER: \${POSTGRES_USER:-${pgUser}}
${withSecrets ? `      POSTGRES_PASSWORD_FILE: /run/secrets/db_password\n` : `      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-changeme}\n`}    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d:ro
    ports:
      - "\${POSTGRES_PORT:-5432}:5432"
${withSecrets ? `    secrets:\n      - db_password\n` : ""}${withHealth ? `    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-${pgUser}} -d \${POSTGRES_DB:-${pgDb}}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
${withLimits ? `    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
` : ""}`;
        }

        // MYSQL
        if (services.includes("mysql")) {
            out += `
  # ── MySQL Database ───────────────────────────────────────────
  mysql:
    image: mysql:8.0
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-mysql
    environment:
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD:-rootpass}
      MYSQL_DATABASE: \${MYSQL_DATABASE:-${pgDb}}
      MYSQL_USER: \${MYSQL_USER:-${pgUser}}
      MYSQL_PASSWORD: \${MYSQL_PASSWORD:-changeme}
    volumes:
      - mysqldata:/var/lib/mysql
      - ./db/mysql-init:/docker-entrypoint-initdb.d:ro
    ports:
      - "\${MYSQL_PORT:-3306}:3306"
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
${withHealth ? `    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p\${MYSQL_ROOT_PASSWORD:-rootpass}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
`;
        }

        // REDIS
        if (services.includes("redis")) {
            out += `
  # ── Redis Cache ──────────────────────────────────────────────
  redis:
    image: redis:7-alpine
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-redis
    command: redis-server --appendonly yes --maxmemory \${REDIS_MAX_MEM:-256mb} --maxmemory-policy allkeys-lru --requirepass \${REDIS_PASSWORD:-}
    volumes:
      - redisdata:/data
    ports:
      - "\${REDIS_PORT:-6379}:6379"
${withHealth ? `    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
${withLimits ? `    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 256M
` : ""}`;
        }

        // MONGODB
        if (services.includes("mongo")) {
            out += `
  # ── MongoDB ──────────────────────────────────────────────────
  mongo:
    image: mongo:7.0
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: \${MONGO_ROOT_USER:-root}
      MONGO_INITDB_ROOT_PASSWORD: \${MONGO_ROOT_PASSWORD:-changeme}
      MONGO_INITDB_DATABASE: \${MONGO_DB:-${pgDb}}
    volumes:
      - mongodata:/data/db
      - ./db/mongo-init.js:/docker-entrypoint-initdb.d/init.js:ro
    ports:
      - "\${MONGO_PORT:-27017}:27017"
${withHealth ? `    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 15s
      timeout: 10s
      retries: 5
      start_period: 30s
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
`;
        }

        // RABBITMQ
        if (services.includes("rabbitmq")) {
            out += `
  # ── RabbitMQ Message Broker ──────────────────────────────────
  rabbitmq:
    image: rabbitmq:3.13-management-alpine
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-rabbitmq
    environment:
      RABBITMQ_DEFAULT_USER: \${RABBITMQ_USER:-admin}
      RABBITMQ_DEFAULT_PASS: \${RABBITMQ_PASS:-changeme}
      RABBITMQ_DEFAULT_VHOST: /
    ports:
      - "\${RABBITMQ_PORT:-5672}:5672"
      - "\${RABBITMQ_MGMT_PORT:-15672}:15672"
    volumes:
      - rabbitmqdata:/var/lib/rabbitmq
${withHealth ? `    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 40s
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
`;
        }

        // ELASTICSEARCH
        if (services.includes("elasticsearch")) {
            out += `
  # ── Elasticsearch ────────────────────────────────────────────
  elasticsearch:
    image: elasticsearch:8.12.0
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-es
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
      - ELASTIC_PASSWORD=\${ELASTIC_PASSWORD:-changeme}
      - xpack.security.enabled=true
    volumes:
      - esdata:/usr/share/elasticsearch/data
    ports:
      - "\${ES_PORT:-9200}:9200"
${withHealth ? `    healthcheck:
      test: ["CMD-SHELL", "curl -s -u elastic:\${ELASTIC_PASSWORD:-changeme} http://localhost:9200/_cluster/health | grep -v red"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
${withLimits ? `    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
` : ""}`;
        }

        // GRAFANA
        if (services.includes("grafana")) {
            out += `
  # ── Grafana Monitoring ───────────────────────────────────────
  grafana:
    image: grafana/grafana:latest
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-grafana
    environment:
      - GF_SECURITY_ADMIN_USER=\${GF_ADMIN_USER:-admin}
      - GF_SECURITY_ADMIN_PASSWORD=\${GF_ADMIN_PASS:-changeme}
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafanadata:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning:ro
    ports:
      - "\${GRAFANA_PORT:-3001}:3000"
${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
`;
        }

        // MAILHOG
        if (services.includes("mailhog")) {
            out += `
  # ── MailHog (Dev Email Testing) ──────────────────────────────
  mailhog:
    image: mailhog/mailhog:latest
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-mailhog
    ports:
      - "\${SMTP_PORT:-1025}:1025"
      - "\${MAILHOG_UI_PORT:-8025}:8025"
${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
`;
        }

        // MINIO
        if (services.includes("minio")) {
            out += `
  # ── MinIO Object Storage (S3-compatible) ─────────────────────
  minio:
    image: minio/minio:latest
    container_name: \${COMPOSE_PROJECT_NAME:-myapp}-minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: \${MINIO_USER:-minioadmin}
      MINIO_ROOT_PASSWORD: \${MINIO_PASS:-changeme}
    volumes:
      - miniodata:/data
    ports:
      - "\${MINIO_PORT:-9000}:9000"
      - "\${MINIO_CONSOLE_PORT:-9001}:9001"
${withHealth ? `    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 10s
      retries: 3
` : ""}${withNetworks ? `    networks: [backend]\n` : ""}    restart: ${restartPol}
`;
        }

        return out.trim();
    }

    if (btnGenCompose && composeOutput) {
        btnGenCompose.addEventListener("click", () => {
            const yml = generateComposeYaml();
            if (yml) { composeOutput.value = yml; showToast("✅ Production docker-compose.yml generated!"); }
        });
    }
    if (copyComposeBtn) {
        copyComposeBtn.addEventListener("click", () => {
            if (composeOutput?.value) { navigator.clipboard.writeText(composeOutput.value); showToast("Compose YAML copied!"); }
        });
    }


    // ================= GITHUB ACTIONS GENERATOR =================
    const btnGenGhactions = document.getElementById("btn-gen-ghactions");
    const ghactionsOutput = document.getElementById("ghactions-output");
    const copyGhactionsBtn = document.getElementById("copy-ghactions-btn");

    if (btnGenGhactions && ghactionsOutput) {
        btnGenGhactions.addEventListener("click", () => {
            const lang = document.getElementById("gha-lang").value;
            const trigger = document.getElementById("gha-trigger").value;
            const version = document.getElementById("gha-node-version").value || "20";
            const includeTests = document.getElementById("gha-tests")?.checked;

            let on = "";
            if (trigger === "push") on = `on:\n  push:\n    branches: [main]`;
            else if (trigger === "pr") on = `on:\n  pull_request:\n    branches: [main]`;
            else if (trigger === "both") on = `on:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]`;
            else on = `on:\n  schedule:\n    - cron: '0 0 * * *'\n  workflow_dispatch:`;

            let setupStep = "";
            let buildSteps = "";
            if (lang === "node") {
                setupStep = `      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: '${version}'\n          cache: 'npm'\n\n      - name: Install dependencies\n        run: npm ci\n`;
                buildSteps = `\n      - name: Build\n        run: npm run build --if-present\n`;
                if (includeTests) buildSteps += `\n      - name: Run tests\n        run: npm test\n`;
            } else if (lang === "python") {
                setupStep = `      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: '${version}'\n\n      - name: Install dependencies\n        run: |\n          python -m pip install --upgrade pip\n          pip install -r requirements.txt\n`;
                if (includeTests) buildSteps += `\n      - name: Run tests\n        run: pytest\n`;
            } else if (lang === "go") {
                setupStep = `      - name: Setup Go\n        uses: actions/setup-go@v5\n        with:\n          go-version: '${version}'\n\n      - name: Download dependencies\n        run: go mod download\n`;
                buildSteps = `\n      - name: Build\n        run: go build ./...\n`;
                if (includeTests) buildSteps += `\n      - name: Run tests\n        run: go test ./...\n`;
            } else if (lang === "java") {
                setupStep = `      - name: Setup JDK\n        uses: actions/setup-java@v4\n        with:\n          java-version: '${version}'\n          distribution: 'temurin'\n\n      - name: Cache Maven packages\n        uses: actions/cache@v4\n        with:\n          path: ~/.m2\n          key: \${{ runner.os }}-m2-\${{ hashFiles('**/pom.xml') }}\n`;
                buildSteps = `\n      - name: Build with Maven\n        run: mvn -B package${includeTests ? "" : " -DskipTests"}\n`;
            } else if (lang === "docker") {
                setupStep = `      - name: Login to Docker Hub\n        uses: docker/login-action@v3\n        with:\n          username: \${{ secrets.DOCKER_USERNAME }}\n          password: \${{ secrets.DOCKER_PASSWORD }}\n\n      - name: Build and push Docker image\n        uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: \${{ secrets.DOCKER_USERNAME }}/my-app:latest\n`;
            }

            const workflow = `name: CI/CD Pipeline\n\n${on}\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n\n${setupStep}${buildSteps}`;

            ghactionsOutput.value = workflow;
            showToast("GitHub Actions workflow generated! ✅");
        });
    }
    if (copyGhactionsBtn) {
        copyGhactionsBtn.addEventListener("click", () => {
            if (ghactionsOutput.value) { navigator.clipboard.writeText(ghactionsOutput.value); showToast("Workflow YAML copied!"); }
        });
    }

    // ================= CRON EXPRESSION GENERATOR =================
    const cronMin = document.getElementById("cron-min");
    const cronHour = document.getElementById("cron-hour");
    const cronDom = document.getElementById("cron-dom");
    const cronMonth = document.getElementById("cron-month");
    const cronDow = document.getElementById("cron-dow");
    const cronOutput = document.getElementById("cron-output");
    const cronDescription = document.getElementById("cron-description");
    const copyCronBtn = document.getElementById("copy-cron-btn");

    const updateCronExpression = () => {
        if (!cronOutput) return;
        const expr = `${cronMin?.value||"*"} ${cronHour?.value||"*"} ${cronDom?.value||"*"} ${cronMonth?.value||"*"} ${cronDow?.value||"*"}`;
        cronOutput.textContent = expr;
        let desc = "Custom schedule";
        if (expr === "* * * * *") desc = "Runs every minute";
        else if (expr === "*/5 * * * *") desc = "Runs every 5 minutes";
        else if (cronMin?.value === "0" && cronHour?.value !== "*") desc = `Runs at minute 0 of hour ${cronHour.value}`;
        else if (cronMin?.value === "0" && cronHour?.value === "0" && cronDom?.value === "*") desc = "Runs at midnight every day";
        if (cronDescription) cronDescription.textContent = desc;
    };

    [cronMin, cronHour, cronDom, cronMonth, cronDow].forEach(el => {
        if (el) el.addEventListener("input", updateCronExpression);
    });

    document.querySelectorAll(".cron-preset").forEach(btn => {
        btn.addEventListener("click", () => {
            const parts = btn.getAttribute("data-cron").split(" ");
            if (cronMin) cronMin.value = parts[0];
            if (cronHour) cronHour.value = parts[1];
            if (cronDom) cronDom.value = parts[2];
            if (cronMonth) cronMonth.value = parts[3];
            if (cronDow) cronDow.value = parts[4];
            updateCronExpression();
        });
    });

    if (copyCronBtn) {
        copyCronBtn.addEventListener("click", () => {
            if (cronOutput) { navigator.clipboard.writeText(cronOutput.textContent); showToast("Cron expression copied!"); }
        });
    }

    // ================= YAML <-> JSON CONVERTER =================
    const yamljsonInput = document.getElementById("yamljson-input");
    const yamljsonOutput = document.getElementById("yamljson-output");
    const btnYamlToJson = document.getElementById("btn-yaml-to-json");
    const btnJsonToYaml = document.getElementById("btn-json-to-yaml");
    const clearYamljson = document.getElementById("clear-yamljson");
    const copyYamljsonBtn = document.getElementById("copy-yamljson-btn");

    // Simple YAML parser/serializer (handles common cases)
    const jsonToYaml = (obj, indent = 0) => {
        const pad = " ".repeat(indent);
        let result = "";
        if (Array.isArray(obj)) {
            obj.forEach(item => {
                if (typeof item === "object" && item !== null) {
                    const lines = jsonToYaml(item, indent + 2).trim().split("\n");
                    result += `${pad}- ${lines[0].trim()}\n`;
                    lines.slice(1).forEach(l => result += `${pad}  ${l.trim()}\n`);
                } else { result += `${pad}- ${item}\n`; }
            });
        } else if (typeof obj === "object" && obj !== null) {
            Object.entries(obj).forEach(([key, val]) => {
                if (typeof val === "object" && val !== null) {
                    result += `${pad}${key}:\n${jsonToYaml(val, indent + 2)}`;
                } else { result += `${pad}${key}: ${val}\n`; }
            });
        }
        return result;
    };

    const parseSimpleYaml = (text) => {
        try { return JSON.parse(text); } catch (e) { /* not JSON */ }
        const lines = text.split("\n");
        const root = {};
        const stack = [{ obj: root, indent: -1 }];
        lines.forEach(line => {
            if (!line.trim() || line.trim().startsWith("#")) return;
            const indent = line.search(/\S/);
            const trimmed = line.trim();
            const colonIdx = trimmed.indexOf(":");
            if (colonIdx === -1) return;
            const key = trimmed.slice(0, colonIdx).trim();
            const val = trimmed.slice(colonIdx + 1).trim();
            while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
            const parent = stack[stack.length - 1].obj;
            if (!val) { parent[key] = {}; stack.push({ obj: parent[key], indent }); }
            else if (val === "true") parent[key] = true;
            else if (val === "false") parent[key] = false;
            else if (!isNaN(val) && val !== "") parent[key] = Number(val);
            else parent[key] = val.replace(/^['"]|['"]$/g, "");
        });
        return root;
    };

    // File import and export triggers for YAML/JSON
    const fileInputYamlJson = document.getElementById("yamljson-file-input");
    const btnImportYamlJson = document.getElementById("btn-yamljson-import");
    const btnDownloadYamlJson = document.getElementById("btn-yamljson-download");

    if (btnImportYamlJson && fileInputYamlJson) {
        btnImportYamlJson.addEventListener("click", () => fileInputYamlJson.click());
        fileInputYamlJson.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (yamljsonInput) {
                    yamljsonInput.value = evt.target.result;
                    showToast(`Loaded ${file.name}!`);
                }
            };
            reader.readAsText(file);
        });
    }

    if (btnDownloadYamlJson) {
        btnDownloadYamlJson.addEventListener("click", () => {
            const outText = yamljsonOutput?.value || "";
            if (!outText || outText.startsWith("Error:")) {
                showToast("No valid output to download!", false);
                return;
            }
            const isJson = outText.trim().startsWith("{") || outText.trim().startsWith("[");
            const filename = isJson ? "converted.json" : "converted.yaml";
            const mime = isJson ? "application/json" : "text/yaml";
            const blob = new Blob([outText], { type: mime });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast(`Downloaded ${filename}!`);
        });
    }

    if (btnYamlToJson) {
        btnYamlToJson.addEventListener("click", () => {
            try {
                const obj = parseSimpleYaml(yamljsonInput.value.trim());
                yamljsonOutput.value = JSON.stringify(obj, null, 2);
                showToast("YAML → JSON converted! ✅");
            } catch (e) { yamljsonOutput.value = `Error: ${e.message}`; }
        });
    }
    if (btnJsonToYaml) {
        btnJsonToYaml.addEventListener("click", () => {
            try {
                const obj = JSON.parse(yamljsonInput.value.trim());
                yamljsonOutput.value = jsonToYaml(obj).trim();
                showToast("JSON → YAML converted! ✅");
            } catch (e) { yamljsonOutput.value = `Error: ${e.message}`; }
        });
    }
    if (clearYamljson) clearYamljson.addEventListener("click", () => { yamljsonInput.value = ""; yamljsonOutput.value = ""; });
    if (copyYamljsonBtn) copyYamljsonBtn.addEventListener("click", () => { if (yamljsonOutput.value) { navigator.clipboard.writeText(yamljsonOutput.value); showToast("Output copied!"); } });

    // ================= JWT DECODER =================
    const jwtInput = document.getElementById("jwt-input");
    const jwtStatus = document.getElementById("jwt-status");
    const jwtHeaderOut = document.getElementById("jwt-header-out");
    const jwtPayloadOut = document.getElementById("jwt-payload-out");
    const jwtInfoOut = document.getElementById("jwt-info-out");
    const clearJwt = document.getElementById("clear-jwt");
    const copyJwtHeader = document.getElementById("copy-jwt-header");
    const copyJwtPayload = document.getElementById("copy-jwt-payload");

    const decodeJWT = () => {
        if (!jwtInput) return;
        const token = jwtInput.value.trim();
        if (!token) { if (jwtStatus) jwtStatus.textContent = "Enter a JWT to decode"; return; }
        const parts = token.split(".");
        if (parts.length !== 3) { if (jwtStatus) { jwtStatus.textContent = "❌ Invalid JWT format"; jwtStatus.style.color = "var(--rose)"; } return; }
        try {
            const decode = (b64) => JSON.parse(decodeURIComponent(atob(b64.replace(/-/g, "+").replace(/_/g, "/")).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")));
            const header = decode(parts[0]);
            const payload = decode(parts[1]);
            if (jwtHeaderOut) jwtHeaderOut.textContent = JSON.stringify(header, null, 2);
            if (jwtPayloadOut) jwtPayloadOut.textContent = JSON.stringify(payload, null, 2);
            const now = Math.floor(Date.now() / 1000);
            let info = `Algorithm: ${header.alg || "—"}\nType: ${header.typ || "—"}\n`;
            if (payload.iat) info += `Issued At: ${new Date(payload.iat * 1000).toLocaleString()}\n`;
            if (payload.exp) {
                const expired = payload.exp < now;
                info += `Expires: ${new Date(payload.exp * 1000).toLocaleString()}\nStatus: ${expired ? "⛔ EXPIRED" : "✅ VALID"}`;
            }
            if (jwtInfoOut) jwtInfoOut.innerHTML = info.replace(/\n/g, "<br>");
            if (jwtStatus) { jwtStatus.textContent = "✅ Valid JWT structure"; jwtStatus.style.color = "var(--teal)"; }
        } catch (e) {
            if (jwtStatus) { jwtStatus.textContent = `❌ Decode error: ${e.message}`; jwtStatus.style.color = "var(--rose)"; }
        }
    };

    if (jwtInput) jwtInput.addEventListener("input", decodeJWT);
    if (clearJwt) clearJwt.addEventListener("click", () => { jwtInput.value = ""; if (jwtHeaderOut) jwtHeaderOut.textContent = "{}"; if (jwtPayloadOut) jwtPayloadOut.textContent = "{}"; if (jwtInfoOut) jwtInfoOut.innerHTML = "—"; if (jwtStatus) { jwtStatus.textContent = "Enter a JWT to decode"; jwtStatus.style.color = "var(--teal)"; } });
    if (copyJwtHeader) copyJwtHeader.addEventListener("click", () => { if (jwtHeaderOut) { navigator.clipboard.writeText(jwtHeaderOut.textContent); showToast("Header copied!"); } });
    if (copyJwtPayload) copyJwtPayload.addEventListener("click", () => { if (jwtPayloadOut) { navigator.clipboard.writeText(jwtPayloadOut.textContent); showToast("Payload copied!"); } });

    // ================= CSS BOX SHADOW GENERATOR =================
    const bsControls = ["bs-h", "bs-v", "bs-blur", "bs-spread", "bs-opacity", "bs-color", "bs-inset", "bs-shape", "bs-box-color", "bs-bg-color", "bs-layered-soft"];
    const bsPreview = document.getElementById("bs-preview-box");
    const bsPreviewContainer = document.getElementById("bs-preview-container");
    const bsOutput = document.getElementById("bs-output");
    const copyBoxshadowBtn = document.getElementById("copy-boxshadow-btn");
    const bsShapeSelect = document.getElementById("bs-shape");

    const updateBoxShadow = () => {
        if (!bsPreview) return;
        const h = parseInt(document.getElementById("bs-h")?.value) || 5;
        const v = parseInt(document.getElementById("bs-v")?.value) || 5;
        const blur = parseInt(document.getElementById("bs-blur")?.value) || 15;
        const spread = parseInt(document.getElementById("bs-spread")?.value) || 0;
        const opacity = (parseInt(document.getElementById("bs-opacity")?.value) || 30) / 100;
        const colorHex = document.getElementById("bs-color")?.value || "#6366f1";
        const boxColor = document.getElementById("bs-box-color")?.value || "#2a303c";
        const bgColor = document.getElementById("bs-bg-color")?.value || "#0f172a";
        const inset = document.getElementById("bs-inset")?.checked;
        const layered = document.getElementById("bs-layered-soft")?.checked;

        // Text value displays
        if (document.getElementById("bs-h-val")) document.getElementById("bs-h-val").textContent = h + "px";
        if (document.getElementById("bs-v-val")) document.getElementById("bs-v-val").textContent = v + "px";
        if (document.getElementById("bs-blur-val")) document.getElementById("bs-blur-val").textContent = blur + "px";
        if (document.getElementById("bs-spread-val")) document.getElementById("bs-spread-val").textContent = spread + "px";
        if (document.getElementById("bs-opacity-val")) document.getElementById("bs-opacity-val").textContent = opacity.toFixed(2);

        // Apply Colors to preview container
        if (bsPreviewContainer) {
            bsPreviewContainer.style.backgroundColor = bgColor;
        }
        bsPreview.style.backgroundColor = boxColor;

        // Apply Shapes to preview block
        const shape = bsShapeSelect?.value || "rounded-rect";
        bsPreview.style.clipPath = "";
        bsPreview.style.transform = "";
        
        if (shape === "rounded-rect") {
            bsPreview.style.borderRadius = "12px";
        } else if (shape === "square") {
            bsPreview.style.borderRadius = "0";
        } else if (shape === "circle") {
            bsPreview.style.borderRadius = "50%";
        } else if (shape === "diamond") {
            bsPreview.style.borderRadius = "4px";
            bsPreview.style.transform = "rotate(45deg) scale(0.8)";
        }

        // Generate Shadow string
        const rgb = hexToRgb(colorHex);
        const insetStr = inset ? "inset " : "";
        let shadow = "";

        if (layered && !inset) {
            // Layered shadow formula (3 layers for smooth look)
            const l1 = `0px ${Math.round(v * 0.2)}px ${Math.round(blur * 0.2)}px ${spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            const l2 = `${Math.round(h * 0.5)}px ${Math.round(v * 0.5)}px ${Math.round(blur * 0.5)}px ${Math.round(spread * 0.5)}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.5})`;
            const l3 = `${h}px ${v}px ${blur}px ${spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.15})`;
            shadow = `${l1}, ${l2}, ${l3}`;
        } else {
            shadow = `${insetStr}${h}px ${v}px ${blur}px ${spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        }

        bsPreview.style.boxShadow = shadow;
        if (bsOutput) bsOutput.textContent = `box-shadow: ${shadow};`;
    };

    bsControls.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", updateBoxShadow);
            el.addEventListener("change", updateBoxShadow);
        }
    });

    // Handle presets click
    document.querySelectorAll(".bs-preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const h = btn.getAttribute("data-h");
            const v = btn.getAttribute("data-v");
            const blur = btn.getAttribute("data-blur");
            const spread = btn.getAttribute("data-spread");
            const opacity = btn.getAttribute("data-opacity");
            const inset = btn.getAttribute("data-inset") === "true";
            const layered = btn.getAttribute("data-layered") === "true";

            const elH = document.getElementById("bs-h");
            const elV = document.getElementById("bs-v");
            const elBlur = document.getElementById("bs-blur");
            const elSpread = document.getElementById("bs-spread");
            const elOpacity = document.getElementById("bs-opacity");
            const elInset = document.getElementById("bs-inset");
            const elLayered = document.getElementById("bs-layered-soft");

            if (elH) elH.value = h;
            if (elV) elV.value = v;
            if (elBlur) elBlur.value = blur;
            if (elSpread) elSpread.value = spread;
            if (elOpacity) elOpacity.value = opacity;
            if (elInset) elInset.checked = inset;
            if (elLayered) elLayered.checked = layered;

            updateBoxShadow();
            showToast("Preset shadow applied!");
        });
    });

    if (copyBoxshadowBtn) copyBoxshadowBtn.addEventListener("click", () => { if (bsOutput) { navigator.clipboard.writeText(bsOutput.textContent); showToast("Box shadow CSS copied!"); } });

    // ================= CSS GRADIENT GENERATOR =================
    const gradPreview = document.getElementById("grad-preview-box");
    const gradOutput = document.getElementById("gradient-output");
    const copyGradientBtn = document.getElementById("copy-gradient-btn");
    const gradEnableC3 = document.getElementById("grad-enable-color3");
    const gradC3Wrapper = document.getElementById("grad-color3-wrapper");

    const updateGradient = () => {
        if (!gradPreview) return;
        const type = document.getElementById("grad-type")?.value || "linear";
        const angle = document.getElementById("grad-angle")?.value || 135;
        const c1 = document.getElementById("grad-color1")?.value || "#6366f1";
        const c2 = document.getElementById("grad-color2")?.value || "#a855f7";
        const c3 = document.getElementById("grad-color3")?.value || "#ec4899";
        const useC3 = gradEnableC3?.checked || false;

        if (gradC3Wrapper) {
            gradC3Wrapper.style.display = useC3 ? "block" : "none";
        }
        if (document.getElementById("grad-angle-val")) {
            document.getElementById("grad-angle-val").textContent = angle + "°";
        }

        let css = "";
        if (type === "linear") {
            css = useC3 
                ? `linear-gradient(${angle}deg, ${c1}, ${c2}, ${c3})` 
                : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
        } else {
            css = useC3 
                ? `radial-gradient(circle, ${c1}, ${c2}, ${c3})` 
                : `radial-gradient(circle, ${c1}, ${c2})`;
        }

        gradPreview.style.background = css;
        if (gradOutput) gradOutput.textContent = `background: ${css};`;
    };

    ["grad-type", "grad-angle", "grad-color1", "grad-color2", "grad-color3", "grad-enable-color3"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", updateGradient);
        if (el) el.addEventListener("change", updateGradient);
    });

    // Handle preset clicks
    document.querySelectorAll(".grad-preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const c1 = btn.getAttribute("data-c1");
            const c2 = btn.getAttribute("data-c2");
            const c3 = btn.getAttribute("data-c3");
            const hasC3 = btn.getAttribute("data-c3-enable") === "true";

            const elC1 = document.getElementById("grad-color1");
            const elC2 = document.getElementById("grad-color2");
            const elC3 = document.getElementById("grad-color3");

            if (elC1) elC1.value = c1;
            if (elC2) elC2.value = c2;
            if (elC3 && c3) elC3.value = c3;

            if (gradEnableC3) {
                gradEnableC3.checked = hasC3;
            }

            updateGradient();
            showToast("Preset loaded!");
        });
    });

    if (copyGradientBtn) copyGradientBtn.addEventListener("click", () => { if (gradOutput) { navigator.clipboard.writeText(gradOutput.textContent); showToast("Gradient CSS copied!"); } });

    // ================= HEX/RGB/HSL COLOR CONVERTER / COLOR HUB =================
    const colorPickerMain = document.getElementById("color-picker-main");
    const colorHexInput = document.getElementById("color-hex");
    const colorRgbOutput = document.getElementById("color-rgb");
    const colorHslOutput = document.getElementById("color-hsl");
    const colorNameOutput = document.getElementById("color-name");

    const slideHue = document.getElementById("slide-hue");
    const slideSat = document.getElementById("slide-sat");
    const slideLight = document.getElementById("slide-light");

    const slideHueVal = document.getElementById("slide-hue-val");
    const slideSatVal = document.getElementById("slide-sat-val");
    const slideLightVal = document.getElementById("slide-light-val");

    const contrastText = document.getElementById("contrast-text-color");
    const contrastBg = document.getElementById("contrast-bg-color");
    const contrastRatioVal = document.getElementById("contrast-ratio-val");
    const contrastPreview = document.getElementById("contrast-preview-banner");
    const contrastAa = document.getElementById("contrast-aa-badge");
    const contrastAaa = document.getElementById("contrast-aaa-badge");

    const hexToRgb = (hex) => {
        if (hex.length === 4) {
            hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const r = parseInt(hex.slice(1, 3), 16) || 0;
        const g = parseInt(hex.slice(3, 5), 16) || 0;
        const b = parseInt(hex.slice(5, 7), 16) || 0;
        return { r, g, b };
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const hslToHex = (h, s, l) => {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    // Luminance and Contrast
    const getLuminance = (r, g, b) => {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const updateContrastCheck = () => {
        if (!contrastText || !contrastBg) return;
        const txtHex = contrastText.value;
        const bgHex = contrastBg.value;

        if (contrastPreview) {
            contrastPreview.style.color = txtHex;
            contrastPreview.style.background = bgHex;
        }

        const rgbTxt = hexToRgb(txtHex);
        const rgbBg = hexToRgb(bgHex);

        const l1 = getLuminance(rgbTxt.r, rgbTxt.g, rgbTxt.b);
        const l2 = getLuminance(rgbBg.r, rgbBg.g, rgbBg.b);

        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (contrastRatioVal) contrastRatioVal.textContent = ratio.toFixed(2) + ":1";

        if (contrastAa) {
            const pass = ratio >= 4.5;
            contrastAa.textContent = pass ? "AA PASS" : "AA FAIL";
            contrastAa.className = "json-status-badge" + (pass ? "" : " error");
        }
        if (contrastAaa) {
            const pass = ratio >= 7;
            contrastAaa.textContent = pass ? "AAA PASS" : "AAA FAIL";
            contrastAaa.className = "json-status-badge" + (pass ? "" : " error");
        }
    };

    const buildPaletteSwatches = (containerId, colors) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";
        colors.forEach(hex => {
            const block = document.createElement("div");
            block.style.flex = "1";
            block.style.height = "36px";
            block.style.background = hex;
            block.style.cursor = "pointer";
            block.style.position = "relative";
            block.title = `Click to copy: ${hex}`;
            block.addEventListener("click", () => {
                navigator.clipboard.writeText(hex);
                showToast(`Copied ${hex}!`);
            });
            container.appendChild(block);
        });
    };

    const generateTailwindShades = (hex) => {
        const container = document.getElementById("tailwind-shades-container");
        if (!container) return;
        container.innerHTML = "";
        
        const { h, s, l } = rgbToHsl(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b);
        
        // Approximate scale ranges for Tailwind colors
        const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
        const lightnessValues = [97, 91, 82, 70, 58, 46, 38, 30, 22, 12];

        weights.forEach((w, idx) => {
            const shadeL = lightnessValues[idx];
            const shadeHex = hslToHex(h, s, shadeL);
            const block = document.createElement("div");
            block.style.display = "flex";
            block.style.justify = "space-between";
            block.style.alignItems = "center";
            block.style.background = shadeHex;
            block.style.padding = "0.4rem 0.85rem";
            block.style.cursor = "pointer";
            block.style.fontSize = "0.78rem";
            block.style.fontWeight = "600";
            
            // Text color for readability based on luminance
            const isDark = shadeL < 50;
            block.style.color = isDark ? "#ffffff" : "#0f172a";
            
            block.innerHTML = `<span>Shade ${w}</span><span>${shadeHex}</span>`;
            block.addEventListener("click", () => {
                navigator.clipboard.writeText(shadeHex);
                showToast(`Copied shade ${w} (${shadeHex})`);
            });
            container.appendChild(block);
        });
    };

    const updateColorConv = (hex) => {
        if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
        const { r, g, b } = hexToRgb(hex);
        const { h, s, l } = rgbToHsl(r, g, b);
        
        if (colorRgbOutput) colorRgbOutput.value = `rgb(${r}, ${g}, ${b})`;
        if (colorHslOutput) colorHslOutput.value = `hsl(${h}, ${s}%, ${l}%)`;
        if (colorPickerMain) colorPickerMain.value = hex;

        // Update name badge (mockup CSS matching or simply the HEX value)
        if (colorNameOutput) colorNameOutput.value = hex.toUpperCase();

        // Update Sliders
        if (slideHue) { slideHue.value = h; if (slideHueVal) slideHueVal.textContent = h + "°"; }
        if (slideSat) { slideSat.value = s; if (slideSatVal) slideSatVal.textContent = s + "%"; }
        if (slideLight) { slideLight.value = l; if (slideLightVal) slideLightVal.textContent = l + "%"; }

        // Harmonies
        const complementary = hslToHex((h + 180) % 360, s, l);
        buildPaletteSwatches("harmony-complementary", [hex, complementary]);

        const analogous = [
            hslToHex((h + 330) % 360, s, l),
            hex,
            hslToHex((h + 30) % 360, s, l)
        ];
        buildPaletteSwatches("harmony-analogous", analogous);

        const triadic = [
            hex,
            hslToHex((h + 120) % 360, s, l),
            hslToHex((h + 240) % 360, s, l)
        ];
        buildPaletteSwatches("harmony-triadic", triadic);

        const monochromatic = [
            hslToHex(h, s, Math.max(10, l - 30)),
            hslToHex(h, s, Math.max(10, l - 15)),
            hex,
            hslToHex(h, s, Math.min(95, l + 15)),
            hslToHex(h, s, Math.min(95, l + 30))
        ];
        buildPaletteSwatches("harmony-monochromatic", monochromatic);

        // Tailwind shades
        generateTailwindShades(hex);
    };

    if (colorPickerMain) {
        colorPickerMain.addEventListener("input", (e) => {
            if (colorHexInput) colorHexInput.value = e.target.value;
            updateColorConv(e.target.value);
        });
    }

    if (colorHexInput) {
        colorHexInput.addEventListener("input", (e) => {
            updateColorConv(e.target.value);
        });
    }

    // Sliders Listener
    const handleSliderInput = () => {
        const h = parseInt(slideHue?.value) || 0;
        const s = parseInt(slideSat?.value) || 0;
        const l = parseInt(slideLight?.value) || 0;
        
        if (slideHueVal) slideHueVal.textContent = h + "°";
        if (slideSatVal) slideSatVal.textContent = s + "%";
        if (slideLightVal) slideLightVal.textContent = l + "%";

        const newHex = hslToHex(h, s, l);
        if (colorHexInput) colorHexInput.value = newHex;
        updateColorConv(newHex);
    };

    [slideHue, slideSat, slideLight].forEach(slider => {
        if (slider) {
            slider.addEventListener("input", handleSliderInput);
        }
    });

    // Accessibility check triggers
    [contrastText, contrastBg].forEach(input => {
        if (input) {
            input.addEventListener("input", updateContrastCheck);
        }
    });

    // Copy actions
    document.getElementById("copy-hex-btn")?.addEventListener("click", () => { navigator.clipboard.writeText(colorHexInput?.value || ""); showToast("HEX copied!"); });
    document.getElementById("copy-rgb-btn")?.addEventListener("click", () => { navigator.clipboard.writeText(colorRgbOutput?.value || ""); showToast("RGB copied!"); });
    document.getElementById("copy-hsl-btn")?.addEventListener("click", () => { navigator.clipboard.writeText(colorHslOutput?.value || ""); showToast("HSL copied!"); });

    updateColorConv("#6366f1");
    updateContrastCheck();

    // ================= UUID GENERATOR =================
    // ================= UUID GENERATOR =================
    const btnGenUuid = document.getElementById("btn-gen-uuid");
    const uuidOutput = document.getElementById("uuid-output");
    const copyUuidBtn = document.getElementById("copy-uuid-btn");

    const generateV1UUID = () => {
        let d = new Date().getTime();
        // Uses high-resolution timer if available
        if (typeof performance !== "undefined" && typeof performance.now === "function"){
            d += performance.now(); 
        }
        return "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };

    if (btnGenUuid) {
        btnGenUuid.addEventListener("click", () => {
            const count = Math.min(parseInt(document.getElementById("uuid-count")?.value) || 5, 100);
            const uppercase = document.getElementById("uuid-uppercase")?.checked;
            const noHyphens = document.getElementById("uuid-no-hyphens")?.checked;
            const version = document.getElementById("uuid-version")?.value || "v4";

            const ids = Array.from({ length: count }, () => {
                let id = version === "v1" ? generateV1UUID() : crypto.randomUUID();
                if (noHyphens) {
                    id = id.replace(/-/g, "");
                }
                return uppercase ? id.toUpperCase() : id;
            });
            if (uuidOutput) uuidOutput.value = ids.join("\n");
            showToast(`${count} UUID${count > 1 ? "s" : ""} generated! ✅`);
        });
    }
    if (copyUuidBtn) copyUuidBtn.addEventListener("click", () => { if (uuidOutput?.value) { navigator.clipboard.writeText(uuidOutput.value); showToast("UUIDs copied!"); } });

    // ================= PASSWORD GENERATOR =================
    const btnGenPassword = document.getElementById("btn-gen-password");
    const passwordOutput = document.getElementById("password-output");
    const passwordStrength = document.getElementById("password-strength");
    const copyPasswordBtn = document.getElementById("copy-password-btn");

    const pwdLengthSlider = document.getElementById("pwd-length");
    const pwdLengthVal = document.getElementById("pwd-length-val");
    const pwdWordsSlider = document.getElementById("pwd-words");
    const pwdWordsVal = document.getElementById("pwd-words-val");

    const pwdMode = document.getElementById("pwd-mode");
    const pwdLengthGroup = document.getElementById("pwd-length-group");
    const pwdWordsGroup = document.getElementById("pwd-words-group");
    const pwdCharGroups = document.getElementById("pwd-char-groups");

    if (pwdLengthSlider && pwdLengthVal) {
        pwdLengthSlider.addEventListener("input", () => { pwdLengthVal.textContent = pwdLengthSlider.value; });
    }
    if (pwdWordsSlider && pwdWordsVal) {
        pwdWordsSlider.addEventListener("input", () => { pwdWordsVal.textContent = pwdWordsSlider.value; });
    }

    if (pwdMode) {
        pwdMode.addEventListener("change", () => {
            const mode = pwdMode.value;
            if (mode === "passphrase") {
                if (pwdLengthGroup) pwdLengthGroup.style.display = "none";
                if (pwdWordsGroup) pwdWordsGroup.style.display = "block";
                if (pwdCharGroups) pwdCharGroups.style.display = "none";
            } else {
                if (pwdLengthGroup) pwdLengthGroup.style.display = "block";
                if (pwdWordsGroup) pwdWordsGroup.style.display = "none";
                if (pwdCharGroups) pwdCharGroups.style.display = "block";
            }
        });
    }

    const friendlyWords = [
        "input", "swift", "code", "blue", "sky", "neon", "soft", "star", "dark", "light", 
        "wave", "rock", "wind", "leaf", "fire", "glow", "cloud", "rain", "ocean", "forest", 
        "tech", "pixel", "data", "logic", "cyber", "secure", "phase", "shift", "space", "craft", 
        "micro", "macro", "alpha", "beta", "mega", "super", "hyper", "smart", "quick", "agile", 
        "clean", "neat", "crisp", "sleek", "prime", "peak", "flex", "link", "grid", "dock"
    ];

    if (btnGenPassword) {
        btnGenPassword.addEventListener("click", () => {
            const mode = pwdMode?.value || "random";
            if (mode === "passphrase") {
                const wordsCount = parseInt(pwdWordsSlider?.value) || 4;
                const selected = [];
                for (let i = 0; i < wordsCount; i++) {
                    selected.push(friendlyWords[Math.floor(Math.random() * friendlyWords.length)]);
                }
                const pwd = selected.join("-");
                if (passwordOutput) passwordOutput.textContent = pwd;
                if (passwordStrength) {
                    passwordStrength.textContent = `Strength: 🟡 Memorable | Words: ${wordsCount} | Entropy: ~${Math.floor(wordsCount * Math.log2(friendlyWords.length))} bits`;
                }
                showToast("Passphrase generated! ✅");
            } else {
                let chars = "";
                const ambiguous = "0O1lI";
                const excludeAmbiguous = document.getElementById("pwd-exclude-ambiguous")?.checked;
                if (document.getElementById("pwd-upper")?.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if (document.getElementById("pwd-lower")?.checked) chars += "abcdefghijklmnopqrstuvwxyz";
                if (document.getElementById("pwd-numbers")?.checked) chars += "0123456789";
                if (document.getElementById("pwd-symbols")?.checked) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
                if (excludeAmbiguous) chars = chars.split("").filter(c => !ambiguous.includes(c)).join("");
                if (!chars) { showToast("Select at least one character type!"); return; }
                const length = parseInt(pwdLengthSlider?.value) || 16;
                const array = new Uint32Array(length);
                crypto.getRandomValues(array);
                const password = Array.from(array, v => chars[v % chars.length]).join("");
                if (passwordOutput) passwordOutput.textContent = password;
                const strength = length >= 20 && chars.length > 60 ? "🟢 Very Strong" : length >= 16 ? "🟡 Strong" : length >= 12 ? "🟠 Medium" : "🔴 Weak";
                if (passwordStrength) passwordStrength.textContent = `Strength: ${strength} | Entropy: ~${Math.floor(length * Math.log2(chars.length))} bits`;
                showToast("Password generated! ✅");
            }
        });
    }
    if (copyPasswordBtn) copyPasswordBtn.addEventListener("click", () => { const t = passwordOutput?.textContent; if (t && t !== "Click Generate to create a password") { navigator.clipboard.writeText(t); showToast("Password copied!"); } });

    // ================= LOREM IPSUM GENERATOR =================
    const loremWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis".split(" ");

    const generateLoremWords = (n) => {
        const result = [];
        for (let i = 0; i < n; i++) result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        return result.join(" ");
    };
    const generateLoremSentence = () => {
        const words = generateLoremWords(Math.floor(Math.random() * 10) + 8);
        return words.charAt(0).toUpperCase() + words.slice(1) + ".";
    };
    const generateLoremParagraph = () => {
        const sentences = Math.floor(Math.random() * 3) + 4;
        return Array.from({ length: sentences }, generateLoremSentence).join(" ");
    };

    const btnGenLorem = document.getElementById("btn-gen-lorem");
    const loremOutput = document.getElementById("lorem-output");
    const loremWordCount = document.getElementById("lorem-word-count");
    const copyLoremBtn = document.getElementById("copy-lorem-btn");

    if (btnGenLorem) {
        btnGenLorem.addEventListener("click", () => {
            const type = document.getElementById("lorem-type")?.value || "paragraphs";
            const count = Math.min(parseInt(document.getElementById("lorem-count")?.value) || 3, 100);
            const startWithLorem = document.getElementById("lorem-start-with")?.checked;
            let text = "";
            if (type === "paragraphs") {
                const paras = Array.from({ length: count }, (_, i) => {
                    if (i === 0 && startWithLorem) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + generateLoremParagraph();
                    return generateLoremParagraph();
                });
                text = paras.join("\n\n");
            } else if (type === "words") {
                text = startWithLorem ? "Lorem ipsum " + generateLoremWords(count - 2) : generateLoremWords(count);
            } else {
                const sents = Array.from({ length: count }, (_, i) => {
                    if (i === 0 && startWithLorem) return "Lorem ipsum dolor sit amet.";
                    return generateLoremSentence();
                });
                text = sents.join(" ");
            }
            if (loremOutput) loremOutput.value = text;
            const wc = text.split(/\s+/).filter(Boolean).length;
            if (loremWordCount) loremWordCount.textContent = `${wc} words`;
            showToast("Lorem ipsum generated! ✅");
        });
    }
    if (copyLoremBtn) copyLoremBtn.addEventListener("click", () => { if (loremOutput?.value) { navigator.clipboard.writeText(loremOutput.value); showToast("Lorem ipsum copied!"); } });

    // ================= TEXT UTILITIES =================
    const textutilsInput = document.getElementById("textutils-input");
    const textutilsOutput = document.getElementById("textutils-output");
    const textutilsCount = document.getElementById("textutils-count");
    const clearTextutils = document.getElementById("clear-textutils");
    const copyTextutilsBtn = document.getElementById("copy-textutils-btn");

    const applyTextUtil = (action) => {
        if (!textutilsInput || !textutilsOutput) return;
        const input = textutilsInput.value;
        let lines = input.split("\n");
        let result = "";
        switch (action) {
            case "sort-asc": result = [...lines].sort((a, b) => a.localeCompare(b)).join("\n"); break;
            case "sort-desc": result = [...lines].sort((a, b) => b.localeCompare(a)).join("\n"); break;
            case "remove-dupes": result = [...new Set(lines)].join("\n"); break;
            case "remove-empty": result = lines.filter(l => l.trim() !== "").join("\n"); break;
            case "reverse-lines": result = [...lines].reverse().join("\n"); break;
            case "reverse-text": result = lines.map(l => l.split("").reverse().join("")).join("\n"); break;
            case "trim-spaces": result = lines.map(l => l.trim().replace(/\s+/g, " ")).join("\n"); break;
            case "to-list": result = lines.filter(l => l.trim()).join(","); break;
            default: result = input;
        }
        textutilsOutput.value = result;
        const lc = result.split("\n").length;
        if (textutilsCount) textutilsCount.textContent = `${lc} line${lc !== 1 ? "s" : ""}`;
        showToast("Applied! ✅");
    };

    document.querySelectorAll(".textutil-action").forEach(btn => {
        btn.addEventListener("click", () => applyTextUtil(btn.getAttribute("data-action")));
    });

    if (clearTextutils) clearTextutils.addEventListener("click", () => { if (textutilsInput) textutilsInput.value = ""; if (textutilsOutput) textutilsOutput.value = ""; if (textutilsCount) textutilsCount.textContent = "0 lines"; });
    if (copyTextutilsBtn) copyTextutilsBtn.addEventListener("click", () => { if (textutilsOutput?.value) { navigator.clipboard.writeText(textutilsOutput.value); showToast("Output copied!"); } });

    // ================= META TAG GENERATOR =================
    const mtTitle = document.getElementById("mt-title");
    const mtDesc = document.getElementById("mt-desc");
    const btnGenMetatag = document.getElementById("btn-gen-metatag");
    const metatagOutput = document.getElementById("metatag-output");
    const copyMetatagBtn = document.getElementById("copy-metatag-btn");

    const updateMetaCharCounts = () => {
        if (mtTitle && document.getElementById("mt-title-len")) {
            const l = mtTitle.value.length;
            const el = document.getElementById("mt-title-len");
            el.textContent = `${l} / 60 characters`;
            el.style.color = l > 60 ? "var(--rose)" : l > 50 ? "var(--amber)" : "var(--text-muted)";
        }
        if (mtDesc && document.getElementById("mt-desc-len")) {
            const l = mtDesc.value.length;
            const el = document.getElementById("mt-desc-len");
            el.textContent = `${l} / 160 characters`;
            el.style.color = l > 160 ? "var(--rose)" : l > 140 ? "var(--amber)" : "var(--text-muted)";
        }
    };

    if (mtTitle) mtTitle.addEventListener("input", updateMetaCharCounts);
    if (mtDesc) mtDesc.addEventListener("input", updateMetaCharCounts);

    if (btnGenMetatag && metatagOutput) {
        btnGenMetatag.addEventListener("click", () => {
            const title = document.getElementById("mt-title")?.value || "";
            const desc = document.getElementById("mt-desc")?.value || "";
            const url = document.getElementById("mt-url")?.value || "";
            const image = document.getElementById("mt-image")?.value || "";
            const author = document.getElementById("mt-author")?.value || "";
            let tags = `<!-- Primary Meta Tags -->\n<title>${title}</title>\n<meta name="title" content="${title}">\n<meta name="description" content="${desc}">\n`;
            if (author) tags += `<meta name="author" content="${author}">\n`;
            tags += `<meta name="robots" content="index, follow">\n`;
            if (url) tags += `<link rel="canonical" href="${url}">\n`;
            tags += `\n<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n`;
            if (url) tags += `<meta property="og:url" content="${url}">\n`;
            if (image) tags += `<meta property="og:image" content="${image}">\n`;
            tags += `\n<!-- Twitter Card -->\n<meta property="twitter:card" content="summary_large_image">\n<meta property="twitter:title" content="${title}">\n<meta property="twitter:description" content="${desc}">\n`;
            if (url) tags += `<meta property="twitter:url" content="${url}">\n`;
            if (image) tags += `<meta property="twitter:image" content="${image}">\n`;
            metatagOutput.value = tags;
            showToast("Meta tags generated! ✅");
        });
    }
    if (copyMetatagBtn) copyMetatagBtn.addEventListener("click", () => { if (metatagOutput?.value) { navigator.clipboard.writeText(metatagOutput.value); showToast("Meta tags copied!"); } });

    // ================= ROBOTS.TXT BUILDER =================
    const btnGenRobots = document.getElementById("btn-gen-robots");
    const robotsOutput = document.getElementById("robots-output");
    const copyRobotsBtn = document.getElementById("copy-robots-btn");

    if (btnGenRobots && robotsOutput) {
        btnGenRobots.addEventListener("click", () => {
            const sitemap = document.getElementById("robots-sitemap")?.value || "";
            const disallowText = document.getElementById("robots-disallow")?.value || "";
            const rule = document.querySelector("input[name='robots-rule']:checked")?.value || "allow-all";
            let content = "";
            if (rule === "allow-all") {
                content = `User-agent: *\nAllow: /\n`;
            } else if (rule === "block-all") {
                content = `User-agent: *\nDisallow: /\n`;
            } else {
                const disallowPaths = disallowText.split("\n").filter(p => p.trim());
                content = `User-agent: *\nAllow: /\n`;
                disallowPaths.forEach(p => { content += `Disallow: ${p.trim()}\n`; });
            }
            if (sitemap) content += `\nSitemap: ${sitemap}`;
            robotsOutput.value = content;
            showToast("robots.txt generated! ✅");
        });
    }
    if (copyRobotsBtn) copyRobotsBtn.addEventListener("click", () => { if (robotsOutput?.value) { navigator.clipboard.writeText(robotsOutput.value); showToast("robots.txt copied!"); } });

    // ================= LINUX COMMAND BUILDER =================
    const linuxCmdSelect = document.getElementById("linux-cmd");
    const linuxOutput = document.getElementById("linux-output");
    const linuxExplanation = document.getElementById("linux-explanation");
    const copyLinuxBtn = document.getElementById("copy-linux-btn");
    const btnGenLinux = document.getElementById("btn-gen-linux");

    const linuxOptions = {
        find: { fields: [{ id: "lx-path", label: "Search Path", default: "." }, { id: "lx-name", label: "File Pattern (e.g. *.log)", default: "*.log" }, { id: "lx-type", label: "Type (f=file, d=dir)", default: "f" }], build: (v) => `find ${v["lx-path"]} -type ${v["lx-type"]} -name "${v["lx-name"]}"`, explain: "Searches for files/directories matching the pattern." },
        grep: { fields: [{ id: "lx-pattern", label: "Search Pattern", default: "ERROR" }, { id: "lx-file", label: "File/Path", default: "*.log" }], build: (v) => `grep -rn "${v["lx-pattern"]}" ${v["lx-file"]}`, explain: "Recursively searches for the pattern in files." },
        tar: { fields: [{ id: "lx-archive", label: "Archive Name", default: "backup.tar.gz" }, { id: "lx-source", label: "Source Directory", default: "./myapp" }], build: (v) => `tar -czvf ${v["lx-archive"]} ${v["lx-source"]}`, explain: "Creates a compressed gzip archive of the source directory." },
        chmod: { fields: [{ id: "lx-perms", label: "Permissions (e.g. 755)", default: "755" }, { id: "lx-target", label: "File/Directory", default: "script.sh" }], build: (v) => `chmod ${v["lx-perms"]} ${v["lx-target"]}`, explain: "Changes file permissions. 755 = rwxr-xr-x." },
        curl: { fields: [{ id: "lx-url", label: "URL", default: "https://api.example.com/data" }, { id: "lx-method", label: "Method (GET/POST)", default: "GET" }], build: (v) => `curl -X ${v["lx-method"]} "${v["lx-url"]}" -H "Content-Type: application/json"`, explain: "Makes an HTTP request to the given URL." },
        rsync: { fields: [{ id: "lx-src", label: "Source", default: "./local/" }, { id: "lx-dest", label: "Destination", default: "user@host:/remote/path/" }], build: (v) => `rsync -avz --progress ${v["lx-src"]} ${v["lx-dest"]}`, explain: "Syncs files from source to destination with progress display." },
        ssh: { fields: [{ id: "lx-user", label: "Username", default: "ubuntu" }, { id: "lx-host", label: "Host/IP", default: "192.168.1.1" }, { id: "lx-key", label: "Key File (optional)", default: "~/.ssh/id_rsa" }], build: (v) => `ssh -i ${v["lx-key"]} ${v["lx-user"]}@${v["lx-host"]}`, explain: "Connects to a remote server via SSH." },
        scp: { fields: [{ id: "lx-local", label: "Local File", default: "./file.txt" }, { id: "lx-remote", label: "Remote Destination", default: "user@host:/home/user/" }], build: (v) => `scp ${v["lx-local"]} ${v["lx-remote"]}`, explain: "Securely copies a file to a remote server." },
        ps: { fields: [], build: () => `ps aux | grep -v grep | sort -k3 -rn | head -20`, explain: "Lists top 20 processes sorted by CPU usage." },
        df: { fields: [{ id: "lx-unit", label: "Unit (h=human, k=KB)", default: "h" }], build: (v) => `df -${v["lx-unit"]} --total`, explain: "Shows disk space usage in human-readable format." },
        du: { fields: [{ id: "lx-dupath", label: "Directory", default: "." }, { id: "lx-depth", label: "Depth Level", default: "1" }], build: (v) => `du -h --max-depth=${v["lx-depth"]} ${v["lx-dupath"]} | sort -hr`, explain: "Shows directory sizes sorted from largest to smallest." }
    };

    const renderLinuxOptions = (cmd) => {
        const area = document.getElementById("linux-options-area");
        if (!area) return;
        const opts = linuxOptions[cmd];
        if (!opts || !opts.fields.length) { area.innerHTML = ""; return; }
        area.innerHTML = opts.fields.map(f => `<div class="qr-field"><label>${f.label}</label><input type="text" id="${f.id}" class="qr-text-input" value="${f.default}" style="width:100%"></div>`).join("");
    };

    if (linuxCmdSelect) {
        linuxCmdSelect.addEventListener("change", () => renderLinuxOptions(linuxCmdSelect.value));
        renderLinuxOptions(linuxCmdSelect.value);
    }

    if (btnGenLinux) {
        btnGenLinux.addEventListener("click", () => {
            const cmd = linuxCmdSelect?.value || "find";
            const opts = linuxOptions[cmd];
            if (!opts) return;
            const vals = {};
            opts.fields.forEach(f => { vals[f.id] = document.getElementById(f.id)?.value || f.default; });
            const result = opts.build(vals);
            if (linuxOutput) linuxOutput.textContent = result;
            if (linuxExplanation) linuxExplanation.textContent = opts.explain;
            showToast("Command built! ✅");
        });
    }
    if (copyLinuxBtn) copyLinuxBtn.addEventListener("click", () => { if (linuxOutput?.textContent) { navigator.clipboard.writeText(linuxOutput.textContent); showToast("Command copied!"); } });

    // ================= NGINX CONFIG GENERATOR =================
    const btnGenNginx = document.getElementById("btn-gen-nginx");
    const nginxOutput = document.getElementById("nginx-output");
    const copyNginxBtn = document.getElementById("copy-nginx-btn");

    if (btnGenNginx && nginxOutput) {
        btnGenNginx.addEventListener("click", () => {
            const type = document.getElementById("nginx-type")?.value || "static";
            const domain = document.getElementById("nginx-domain")?.value || "example.com";
            const port = document.getElementById("nginx-port")?.value || "3000";
            const root = document.getElementById("nginx-root")?.value || "/var/www/html";

            let config = "";
            if (type === "static") config = `server {\n    listen 80;\n    server_name ${domain} www.${domain};\n\n    root ${root};\n    index index.html index.htm;\n\n    location / {\n        try_files $uri $uri/ =404;\n    }\n\n    gzip on;\n    gzip_types text/plain text/css application/json application/javascript;\n}`;
            else if (type === "proxy") config = `upstream app_server {\n    server 127.0.0.1:${port};\n    keepalive 64;\n}\n\nserver {\n    listen 80;\n    server_name ${domain} www.${domain};\n\n    location / {\n        proxy_pass http://app_server;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_cache_bypass $http_upgrade;\n    }\n}`;
            else if (type === "ssl") config = `server {\n    listen 80;\n    server_name ${domain} www.${domain};\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name ${domain} www.${domain};\n\n    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_prefer_server_ciphers off;\n\n    location / {\n        proxy_pass http://127.0.0.1:${port};\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}`;
            else if (type === "spa") config = `server {\n    listen 80;\n    server_name ${domain} www.${domain};\n\n    root ${root};\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n\n    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {\n        expires 1y;\n        add_header Cache-Control "public, immutable";\n    }\n}`;

            nginxOutput.value = config;
            showToast("Nginx config generated! ✅");
        });
    }
    if (copyNginxBtn) copyNginxBtn.addEventListener("click", () => { if (nginxOutput?.value) { navigator.clipboard.writeText(nginxOutput.value); showToast("Nginx config copied!"); } });

    // ================= AWS IAM POLICY GENERATOR =================
    const btnGenIam = document.getElementById("btn-gen-iam");
    const iamOutput = document.getElementById("iam-output");
    const copyIamBtn = document.getElementById("copy-iam-btn");

    const iamActions = {
        s3: { readonly: ["s3:GetObject","s3:ListBucket","s3:GetBucketLocation"], readwrite: ["s3:GetObject","s3:PutObject","s3:DeleteObject","s3:ListBucket"], full: ["s3:*"] },
        ec2: { readonly: ["ec2:DescribeInstances","ec2:DescribeImages","ec2:DescribeSecurityGroups","ec2:DescribeVpcs"], readwrite: ["ec2:DescribeInstances","ec2:StartInstances","ec2:StopInstances","ec2:RebootInstances"], full: ["ec2:*"] },
        lambda: { readonly: ["lambda:GetFunction","lambda:ListFunctions","lambda:GetFunctionConfiguration"], readwrite: ["lambda:GetFunction","lambda:UpdateFunctionCode","lambda:InvokeFunction","lambda:ListFunctions"], full: ["lambda:*"] },
        dynamodb: { readonly: ["dynamodb:GetItem","dynamodb:Scan","dynamodb:Query","dynamodb:DescribeTable"], readwrite: ["dynamodb:GetItem","dynamodb:PutItem","dynamodb:UpdateItem","dynamodb:DeleteItem","dynamodb:Scan","dynamodb:Query"], full: ["dynamodb:*"] },
        cloudwatch: { readonly: ["cloudwatch:GetMetricData","cloudwatch:ListMetrics","logs:GetLogEvents"], readwrite: ["cloudwatch:PutMetricData","logs:CreateLogGroup","logs:PutLogEvents"], full: ["cloudwatch:*","logs:*"] },
        sns: { readonly: ["sns:GetTopicAttributes","sns:ListTopics","sns:GetSubscriptionAttributes"], readwrite: ["sns:Publish","sns:Subscribe","sns:Unsubscribe","sns:ListTopics"], full: ["sns:*"] },
        sqs: { readonly: ["sqs:GetQueueAttributes","sqs:ListQueues","sqs:ReceiveMessage"], readwrite: ["sqs:SendMessage","sqs:ReceiveMessage","sqs:DeleteMessage","sqs:GetQueueAttributes"], full: ["sqs:*"] }
    };

    if (btnGenIam && iamOutput) {
        btnGenIam.addEventListener("click", () => {
            const service = document.getElementById("iam-service")?.value || "s3";
            const access = document.getElementById("iam-access")?.value || "readonly";
            const resource = document.getElementById("iam-resource")?.value || "*";
            const actions = iamActions[service]?.[access] || ["*"];
            const policy = { Version: "2012-10-17", Statement: [{ Effect: "Allow", Action: actions, Resource: resource || "*" }] };
            iamOutput.value = JSON.stringify(policy, null, 2);
            showToast("IAM policy generated! ✅");
        });
    }
    if (copyIamBtn) copyIamBtn.addEventListener("click", () => { if (iamOutput?.value) { navigator.clipboard.writeText(iamOutput.value); showToast("IAM policy copied!"); } });

    // ================= PDF MERGE =================
    const pdfMergeFile = document.getElementById("pdfmerge-file");
    const pdfMergeDropzone = document.getElementById("pdfmerge-dropzone");
    const pdfMergeList = document.getElementById("pdfmerge-list");
    const pdfMergeDownloadBtn = document.getElementById("pdfmerge-download-btn");
    
    let pdfMergeFiles = [];

    const renderPdfMergeList = () => {
        if (!pdfMergeList) return;
        pdfMergeList.innerHTML = "";
        pdfMergeFiles.forEach((file, index) => {
            const item = document.createElement("div");
            item.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:0.5rem; background:rgba(0,0,0,0.1); border-radius:6px; font-size:0.85rem;";
            item.innerHTML = `
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:80%;">${file.name}</span>
                <button class="clear-btn" data-index="${index}" style="color:var(--red); padding:0 0.25rem;">❌</button>
            `;
            pdfMergeList.appendChild(item);
        });
        if (pdfMergeFiles.length > 1 && pdfMergeDownloadBtn) {
            pdfMergeDownloadBtn.disabled = false;
        } else if (pdfMergeDownloadBtn) {
            pdfMergeDownloadBtn.disabled = true;
        }
    };

    if (pdfMergeDropzone && pdfMergeFile) {
        pdfMergeDropzone.addEventListener("click", () => pdfMergeFile.click());
        pdfMergeDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfMergeDropzone.style.borderColor = "var(--indigo)"; });
        pdfMergeDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); pdfMergeDropzone.style.borderColor = "var(--border-color)"; });
        pdfMergeDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfMergeDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files) {
                const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
                pdfMergeFiles = pdfMergeFiles.concat(newFiles);
                renderPdfMergeList();
            }
        });
        pdfMergeFile.addEventListener("change", (e) => {
            if (e.target.files) {
                const newFiles = Array.from(e.target.files).filter(f => f.type === "application/pdf");
                pdfMergeFiles = pdfMergeFiles.concat(newFiles);
                renderPdfMergeList();
            }
        });
    }

    if (pdfMergeList) {
        pdfMergeList.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const idx = parseInt(e.target.getAttribute("data-index"));
                pdfMergeFiles.splice(idx, 1);
                renderPdfMergeList();
            }
        });
    }

    if (pdfMergeDownloadBtn) {
        pdfMergeDownloadBtn.addEventListener("click", async () => {
            try {
                pdfMergeDownloadBtn.textContent = "⏳ Merging...";
                pdfMergeDownloadBtn.disabled = true;
                
                const { PDFDocument } = window.PDFLib;
                const mergedPdf = await PDFDocument.create();
                
                for (let file of pdfMergeFiles) {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await PDFDocument.load(arrayBuffer);
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach(page => mergedPdf.addPage(page));
                }
                
                const mergedPdfFile = await mergedPdf.save();
                const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Utilify_Merged.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("PDFs merged successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error merging PDFs!");
            } finally {
                pdfMergeDownloadBtn.textContent = "⚡ Merge & Download PDF";
                pdfMergeDownloadBtn.disabled = false;
            }
        });
    }

    // ================= PDF SPLIT =================
    const pdfSplitFile = document.getElementById("pdfsplit-file");
    const pdfSplitDropzone = document.getElementById("pdfsplit-dropzone");
    const pdfSplitMeta = document.getElementById("pdfsplit-meta");
    const pdfSplitFilename = document.getElementById("pdfsplit-filename");
    const pdfSplitPages = document.getElementById("pdfsplit-pages");
    const pdfSplitRange = document.getElementById("pdfsplit-range");
    const pdfSplitDownloadBtn = document.getElementById("pdfsplit-download-btn");
    
    let currentSplitPdfDoc = null;
    let currentSplitPdfBytes = null;

    if (pdfSplitDropzone && pdfSplitFile) {
        pdfSplitDropzone.addEventListener("click", () => pdfSplitFile.click());
        pdfSplitDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfSplitDropzone.style.borderColor = "var(--indigo)"; });
        pdfSplitDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); pdfSplitDropzone.style.borderColor = "var(--border-color)"; });
        
        const handleSplitLoad = async (file) => {
            if (file && file.type === "application/pdf") {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    currentSplitPdfBytes = arrayBuffer;
                    const { PDFDocument } = window.PDFLib;
                    currentSplitPdfDoc = await PDFDocument.load(arrayBuffer);
                    
                    pdfSplitFilename.textContent = file.name;
                    pdfSplitPages.textContent = currentSplitPdfDoc.getPageCount();
                    pdfSplitMeta.style.display = "block";
                    pdfSplitRange.disabled = false;
                    pdfSplitDownloadBtn.disabled = false;
                    showToast("PDF loaded. Enter page ranges to extract.");
                } catch (e) {
                    showToast("Error parsing PDF.");
                }
            }
        };

        pdfSplitDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfSplitDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) handleSplitLoad(e.dataTransfer.files[0]);
        });
        
        pdfSplitFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) handleSplitLoad(e.target.files[0]);
        });
    }

    if (pdfSplitDownloadBtn) {
        pdfSplitDownloadBtn.addEventListener("click", async () => {
            if (!currentSplitPdfDoc || !currentSplitPdfBytes) return;
            
            const rangeStr = pdfSplitRange.value.trim();
            if (!rangeStr) {
                showToast("Please enter a page range (e.g. 1-3, 5)");
                return;
            }
            
            try {
                pdfSplitDownloadBtn.textContent = "⏳ Extracting...";
                pdfSplitDownloadBtn.disabled = true;
                
                const totalPages = currentSplitPdfDoc.getPageCount();
                const pagesToExtract = [];
                
                const parts = rangeStr.split(",");
                for (let part of parts) {
                    if (part.includes("-")) {
                        const [start, end] = part.split("-").map(n => parseInt(n.trim()));
                        if (!isNaN(start) && !isNaN(end) && start >= 1 && end <= totalPages && start <= end) {
                            for (let i = start; i <= end; i++) pagesToExtract.push(i - 1);
                        }
                    } else {
                        const num = parseInt(part.trim());
                        if (!isNaN(num) && num >= 1 && num <= totalPages) {
                            pagesToExtract.push(num - 1);
                        }
                    }
                }
                
                if (pagesToExtract.length === 0) {
                    showToast("Invalid page range specified.");
                    return;
                }
                
                // Remove duplicates and sort
                const uniquePages = [...new Set(pagesToExtract)].sort((a,b)=>a-b);
                
                const { PDFDocument } = window.PDFLib;
                const newPdf = await PDFDocument.create();
                
                const srcDoc = await PDFDocument.load(currentSplitPdfBytes);
                const copiedPages = await newPdf.copyPages(srcDoc, uniquePages);
                copiedPages.forEach(page => newPdf.addPage(page));
                
                const newPdfFile = await newPdf.save();
                const blob = new Blob([newPdfFile], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Utilify_Split.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("PDF pages extracted! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error splitting PDF.");
            } finally {
                pdfSplitDownloadBtn.textContent = "⚡ Extract Pages";
                pdfSplitDownloadBtn.disabled = false;
            }
        });
    }

    // ================= PDF ROTATE =================
    const pdfRotateFile = document.getElementById("pdfrotate-file");
    const pdfRotateDropzone = document.getElementById("pdfrotate-dropzone");
    const pdfRotateMeta = document.getElementById("pdfrotate-meta");
    const pdfRotateFilename = document.getElementById("pdfrotate-filename");
    const pdfRotateAngle = document.getElementById("pdfrotate-angle");
    const pdfRotateDownloadBtn = document.getElementById("pdfrotate-download-btn");
    
    let currentRotatePdfBytes = null;

    if (pdfRotateDropzone && pdfRotateFile) {
        pdfRotateDropzone.addEventListener("click", () => pdfRotateFile.click());
        pdfRotateDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfRotateDropzone.style.borderColor = "var(--indigo)"; });
        pdfRotateDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); pdfRotateDropzone.style.borderColor = "var(--border-color)"; });
        
        const handleRotateLoad = async (file) => {
            if (file && file.type === "application/pdf") {
                try {
                    currentRotatePdfBytes = await file.arrayBuffer();
                    pdfRotateFilename.textContent = file.name;
                    pdfRotateMeta.style.display = "block";
                    pdfRotateAngle.disabled = false;
                    pdfRotateDownloadBtn.disabled = false;
                    showToast("PDF loaded ready for rotation.");
                } catch (e) {
                    showToast("Error reading PDF.");
                }
            }
        };

        pdfRotateDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfRotateDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) handleRotateLoad(e.dataTransfer.files[0]);
        });
        
        pdfRotateFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) handleRotateLoad(e.target.files[0]);
        });
    }

    if (pdfRotateDownloadBtn) {
        pdfRotateDownloadBtn.addEventListener("click", async () => {
            if (!currentRotatePdfBytes) return;
            
            try {
                pdfRotateDownloadBtn.textContent = "⏳ Rotating...";
                pdfRotateDownloadBtn.disabled = true;
                
                const { PDFDocument, degrees } = window.PDFLib;
                const pdfDoc = await PDFDocument.load(currentRotatePdfBytes);
                const pages = pdfDoc.getPages();
                
                const angle = parseInt(pdfRotateAngle.value || "90");
                
                pages.forEach(page => {
                    const currentRotation = page.getRotation().angle;
                    page.setRotation(degrees(currentRotation + angle));
                });
                
                const newPdfFile = await pdfDoc.save();
                const blob = new Blob([newPdfFile], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Utilify_Rotated.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("PDF rotated successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error rotating PDF.");
            } finally {
                pdfRotateDownloadBtn.textContent = "⚡ Rotate & Download";
                pdfRotateDownloadBtn.disabled = false;
            }
        });
    }

    // ================= IMAGE RESIZER =================
    const imgResizeFile = document.getElementById("imgresize-file");
    const imgResizeDropzone = document.getElementById("imgresize-dropzone");
    const imgResizeWidth = document.getElementById("imgresize-width");
    const imgResizeHeight = document.getElementById("imgresize-height");
    const imgResizeAspect = document.getElementById("imgresize-aspect");
    const imgResizeFormat = document.getElementById("imgresize-format");
    const imgResizeDownloadBtn = document.getElementById("imgresize-download-btn");

    let currentResizeImg = null;
    let resizeOriginalRatio = 1;

    if (imgResizeDropzone && imgResizeFile) {
        imgResizeDropzone.addEventListener("click", () => imgResizeFile.click());
        imgResizeDropzone.addEventListener("dragover", (e) => { e.preventDefault(); imgResizeDropzone.style.borderColor = "var(--indigo)"; });
        imgResizeDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); imgResizeDropzone.style.borderColor = "var(--border-color)"; });
        
        const loadResizeImage = (file) => {
            if (!file.type.startsWith("image/")) return;
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                currentResizeImg = img;
                resizeOriginalRatio = img.width / img.height;
                imgResizeWidth.value = img.width;
                imgResizeHeight.value = img.height;
                
                imgResizeWidth.disabled = false;
                imgResizeHeight.disabled = false;
                imgResizeAspect.disabled = false;
                imgResizeFormat.disabled = false;
                imgResizeDownloadBtn.disabled = false;
                showToast("Image loaded! Ready to resize.");
            };
            img.src = url;
        };

        imgResizeDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            imgResizeDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadResizeImage(e.dataTransfer.files[0]);
        });
        
        imgResizeFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadResizeImage(e.target.files[0]);
        });

        imgResizeWidth.addEventListener("input", () => {
            if (imgResizeAspect.checked && currentResizeImg) {
                imgResizeHeight.value = Math.round(imgResizeWidth.value / resizeOriginalRatio);
            }
        });

        imgResizeHeight.addEventListener("input", () => {
            if (imgResizeAspect.checked && currentResizeImg) {
                imgResizeWidth.value = Math.round(imgResizeHeight.value * resizeOriginalRatio);
            }
        });
    }

    if (imgResizeDownloadBtn) {
        imgResizeDownloadBtn.addEventListener("click", () => {
            if (!currentResizeImg) return;
            
            const w = parseInt(imgResizeWidth.value);
            const h = parseInt(imgResizeHeight.value);
            
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(currentResizeImg, 0, 0, w, h);
            
            const format = imgResizeFormat.value;
            const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Utilify_Resized.${ext}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Resized image downloaded! ✅");
            }, format, 0.9);
        });
    }

    // ================= IMAGE CROPPER =================
    const imgCropFile = document.getElementById("imgcrop-file");
    const imgCropDropzone = document.getElementById("imgcrop-dropzone");
    const imgCropRatio = document.getElementById("imgcrop-ratio");
    const imgCropWorkspaceImg = document.getElementById("imgcrop-workspace-img");
    const imgCropWorkspacePlaceholder = document.getElementById("imgcrop-workspace-placeholder");
    const imgCropDownloadBtn = document.getElementById("imgcrop-download-btn");

    let cropperInstance = null;
    let currentCropFileType = "image/png";
    let currentCropFileExt = "png";

    if (imgCropDropzone && imgCropFile) {
        imgCropDropzone.addEventListener("click", () => imgCropFile.click());
        imgCropDropzone.addEventListener("dragover", (e) => { e.preventDefault(); imgCropDropzone.style.borderColor = "var(--indigo)"; });
        imgCropDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); imgCropDropzone.style.borderColor = "var(--border-color)"; });
        
        const loadCropImage = (file) => {
            if (!file.type.startsWith("image/")) return;
            currentCropFileType = file.type;
            currentCropFileExt = file.type === "image/jpeg" ? "jpg" : file.type === "image/webp" ? "webp" : "png";
            
            const url = URL.createObjectURL(file);
            imgCropWorkspaceImg.src = url;
            imgCropWorkspaceImg.style.display = "block";
            imgCropWorkspacePlaceholder.style.display = "none";
            
            const container = imgCropWorkspaceImg.parentElement;
            if (container) {
                container.classList.add("checkerboard-bg");
            }
            
            if (cropperInstance) cropperInstance.destroy();
            
            imgCropWorkspaceImg.onload = () => {
                cropperInstance = new Cropper(imgCropWorkspaceImg, {
                    aspectRatio: NaN,
                    viewMode: 1,
                    background: false,
                    responsive: true,
                });
                
                imgCropRatio.disabled = false;
                imgCropDownloadBtn.disabled = false;
                showToast("Image loaded for cropping.");
            };
        };

        imgCropDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            imgCropDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadCropImage(e.dataTransfer.files[0]);
        });
        
        imgCropFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadCropImage(e.target.files[0]);
        });

        imgCropRatio.addEventListener("change", () => {
            if (cropperInstance) {
                cropperInstance.setAspectRatio(parseFloat(imgCropRatio.value));
            }
        });
    }

    if (imgCropDownloadBtn) {
        imgCropDownloadBtn.addEventListener("click", () => {
            if (!cropperInstance) return;
            
            const canvas = cropperInstance.getCroppedCanvas();
            if (!canvas) {
                showToast("Error creating crop canvas.");
                return;
            }
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Utilify_Cropped.${currentCropFileExt}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Cropped image downloaded! ✅");
            }, currentCropFileType, 0.9);
        });
    }

    // ================= IMAGE CONVERTER =================
    const imgConvertFile = document.getElementById("imgconvert-file");
    const imgConvertDropzone = document.getElementById("imgconvert-dropzone");
    const imgConvertMeta = document.getElementById("imgconvert-meta");
    const imgConvertFilename = document.getElementById("imgconvert-filename");
    const imgConvertFormat = document.getElementById("imgconvert-format");
    const imgConvertDownloadBtn = document.getElementById("imgconvert-download-btn");

    let currentConvertImg = null;

    if (imgConvertDropzone && imgConvertFile) {
        imgConvertDropzone.addEventListener("click", () => imgConvertFile.click());
        imgConvertDropzone.addEventListener("dragover", (e) => { e.preventDefault(); imgConvertDropzone.style.borderColor = "var(--indigo)"; });
        imgConvertDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); imgConvertDropzone.style.borderColor = "var(--border-color)"; });
        
        const loadConvertImage = (file) => {
            if (!file.type.startsWith("image/")) return;
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                currentConvertImg = img;
                imgConvertFilename.textContent = file.name;
                imgConvertMeta.style.display = "block";
                
                imgConvertFormat.disabled = false;
                imgConvertDownloadBtn.disabled = false;
                showToast("Image ready for format conversion.");
            };
            img.src = url;
        };

        imgConvertDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            imgConvertDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadConvertImage(e.dataTransfer.files[0]);
        });
        
        imgConvertFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadConvertImage(e.target.files[0]);
        });
    }

    if (imgConvertDownloadBtn) {
        imgConvertDownloadBtn.addEventListener("click", () => {
            if (!currentConvertImg) return;
            
            const format = imgConvertFormat.value;
            const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
            
            const canvas = document.createElement("canvas");
            canvas.width = currentConvertImg.width;
            canvas.height = currentConvertImg.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(currentConvertImg, 0, 0);
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Utilify_Converted.${ext}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Image converted & downloaded! ✅");
            }, format, 0.9);
        });
    }

    // ================= SVG TO PNG =================
    const svgToPngFile = document.getElementById("svgtopng-file");
    const svgToPngDropzone = document.getElementById("svgtopng-dropzone");
    const svgToPngScale = document.getElementById("svgtopng-scale");
    const svgToPngDownloadBtn = document.getElementById("svgtopng-download-btn");

    let currentSvgText = null;

    if (svgToPngDropzone && svgToPngFile) {
        svgToPngDropzone.addEventListener("click", () => svgToPngFile.click());
        svgToPngDropzone.addEventListener("dragover", (e) => { e.preventDefault(); svgToPngDropzone.style.borderColor = "var(--indigo)"; });
        svgToPngDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); svgToPngDropzone.style.borderColor = "var(--border-color)"; });
        
        const loadSvgImage = (file) => {
            if (file.type !== "image/svg+xml" && !file.name.endsWith(".svg")) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                currentSvgText = e.target.result;
                svgToPngScale.disabled = false;
                svgToPngDownloadBtn.disabled = false;
                showToast("SVG loaded and ready to rasterize.");
            };
            reader.readAsText(file);
        };

        svgToPngDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            svgToPngDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadSvgImage(e.dataTransfer.files[0]);
        });
        
        svgToPngFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadSvgImage(e.target.files[0]);
        });
    }

    if (svgToPngDownloadBtn) {
        svgToPngDownloadBtn.addEventListener("click", () => {
            if (!currentSvgText) return;
            
            const scale = parseInt(svgToPngScale.value || "1");
            const blob = new Blob([currentSvgText], {type: 'image/svg+xml;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob((pngBlob) => {
                    const pngUrl = URL.createObjectURL(pngBlob);
                    const a = document.createElement("a");
                    a.href = pngUrl;
                    a.download = "Utilify_Rasterized.png";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(pngUrl);
                    URL.revokeObjectURL(url);
                    showToast(`SVG rasterized to PNG at ${scale}x scale! ✅`);
                }, "image/png");
            };
            img.src = url;
        });
    }

    // ================= PNG TO SVG =================
    const pngToSvgFile = document.getElementById("pngtosvg-file");
    const pngToSvgDropzone = document.getElementById("pngtosvg-dropzone");
    const pngToSvgMode = document.getElementById("pngtosvg-mode");
    const pngToSvgDownloadBtn = document.getElementById("pngtosvg-download-btn");

    let currentPngDataUrl = null;
    let currentPngWidth = 0;
    let currentPngHeight = 0;

    if (pngToSvgDropzone && pngToSvgFile) {
        pngToSvgDropzone.addEventListener("click", () => pngToSvgFile.click());
        pngToSvgDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pngToSvgDropzone.style.borderColor = "var(--indigo)"; });
        pngToSvgDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); pngToSvgDropzone.style.borderColor = "var(--border-color)"; });
        
        const loadPngForSvg = (file) => {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                currentPngDataUrl = e.target.result;
                const img = new Image();
                img.onload = () => {
                    currentPngWidth = img.width;
                    currentPngHeight = img.height;
                    pngToSvgMode.disabled = false;
                    pngToSvgDownloadBtn.disabled = false;
                    showToast("Raster image loaded for wrapping.");
                };
                img.src = currentPngDataUrl;
            };
            reader.readAsDataURL(file);
        };

        pngToSvgDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pngToSvgDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadPngForSvg(e.dataTransfer.files[0]);
        });
        
        pngToSvgFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadPngForSvg(e.target.files[0]);
        });
    }

    if (pngToSvgDownloadBtn) {
        pngToSvgDownloadBtn.addEventListener("click", () => {
            if (!currentPngDataUrl) return;
            
            // Generate Embedded Data URL SVG
            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${currentPngWidth} ${currentPngHeight}" width="${currentPngWidth}" height="${currentPngHeight}">
    <image href="${currentPngDataUrl}" width="${currentPngWidth}" height="${currentPngHeight}" />
</svg>`;
            
            const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Utilify_Wrapped.svg";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            showToast("SVG wrapper downloaded! ✅");
        });
    }

    // ================= IMAGE TO BASE64 =================
    const imgToBase64File = document.getElementById("imgtobase64-file");
    const imgToBase64Dropzone = document.getElementById("imgtobase64-dropzone");
    const imgToBase64Output = document.getElementById("imgtobase64-output");
    const imgToBase64CopyBtn = document.getElementById("imgtobase64-copy-btn");

    if (imgToBase64Dropzone && imgToBase64File) {
        imgToBase64Dropzone.addEventListener("click", () => imgToBase64File.click());
        imgToBase64Dropzone.addEventListener("dragover", (e) => { e.preventDefault(); imgToBase64Dropzone.style.borderColor = "var(--indigo)"; });
        imgToBase64Dropzone.addEventListener("dragleave", (e) => { e.preventDefault(); imgToBase64Dropzone.style.borderColor = "var(--border-color)"; });
        
        const loadImgBase64 = (file) => {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                imgToBase64Output.value = e.target.result;
                imgToBase64CopyBtn.disabled = false;
                showToast("Base64 string generated!");
            };
            reader.readAsDataURL(file);
        };

        imgToBase64Dropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            imgToBase64Dropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadImgBase64(e.dataTransfer.files[0]);
        });
        
        imgToBase64File.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadImgBase64(e.target.files[0]);
        });
    }
    
    if (imgToBase64CopyBtn) {
        imgToBase64CopyBtn.addEventListener("click", () => {
            if (imgToBase64Output?.value) {
                navigator.clipboard.writeText(imgToBase64Output.value);
                showToast("Base64 Code Copied! ✅");
            }
        });
    }

    // ================= EXIF VIEWER =================
    const exifFile = document.getElementById("exif-file");
    const exifDropzone = document.getElementById("exif-dropzone");
    const exifTableBody = document.getElementById("exif-table-body");

    if (exifDropzone && exifFile) {
        exifDropzone.addEventListener("click", () => exifFile.click());
        exifDropzone.addEventListener("dragover", (e) => { e.preventDefault(); exifDropzone.style.borderColor = "var(--indigo)"; });
        exifDropzone.addEventListener("dragleave", (e) => { e.preventDefault(); exifDropzone.style.borderColor = "var(--border-color)"; });
        
        const loadExif = (file) => {
            if (!file) return;
            exifTableBody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: var(--text-muted);">⏳ Reading image details...</td></tr>`;
            
            const name = file.name;
            const size = (file.size / 1024).toFixed(2) + " KB";
            const type = file.type || "unknown";
            const lastMod = new Date(file.lastModified).toLocaleString();

            const rows = [];
            rows.push({ category: "General Info", tag: "File Name", val: name });
            rows.push({ category: "General Info", tag: "File Size", val: size });
            rows.push({ category: "General Info", tag: "MIME Type", val: type });
            rows.push({ category: "General Info", tag: "Last Modified", val: lastMod });

            const renderTable = (allRows) => {
                exifTableBody.innerHTML = "";
                let currentCat = "";
                allRows.forEach(r => {
                    if (r.category !== currentCat) {
                        currentCat = r.category;
                        exifTableBody.innerHTML += `<tr style="background: rgba(99, 102, 241, 0.08);"><td colspan="2" style="font-weight:700; color:var(--indigo); padding: 0.5rem 0.75rem; font-size: 0.85rem;">📁 ${currentCat}</td></tr>`;
                    }
                    exifTableBody.innerHTML += `<tr><td style="font-weight:600; font-size:0.8rem; color:var(--text-color); padding-left: 1.5rem; width: 40%;">${r.tag}</td><td style="font-size:0.8rem; word-break: break-all;">${r.val}</td></tr>`;
                });
            };

            if (file.type.startsWith("image/")) {
                const img = new Image();
                img.onload = function() {
                    rows.push({ category: "General Info", tag: "Dimensions", val: `${img.width} x ${img.height} px` });
                    URL.revokeObjectURL(img.src);
                    
                    if (window.EXIF) {
                        try {
                            window.EXIF.getData(file, function() {
                                const exifData = window.EXIF.getAllTags(this);
                                if (exifData && Object.keys(exifData).length > 0) {
                                    for (let tag in exifData) {
                                        if (tag === "thumbnail") continue;
                                        let val = exifData[tag];
                                        if (typeof val === 'object') {
                                            if (val.numerator !== undefined && val.denominator !== undefined) {
                                                val = val.numerator / val.denominator;
                                            } else {
                                                val = JSON.stringify(val);
                                            }
                                        }
                                        rows.push({ category: "EXIF Metadata", tag: tag, val: val });
                                    }
                                    showToast("EXIF metadata extracted! ✅");
                                } else {
                                    showToast("File info loaded. No EXIF metadata found.");
                                }
                                renderTable(rows);
                            });
                        } catch (e) {
                            console.error(e);
                            rows.push({ category: "EXIF Metadata", tag: "Parsing Error", val: e.message });
                            renderTable(rows);
                        }
                    } else {
                        rows.push({ category: "EXIF Metadata", tag: "Status", val: "EXIF library not loaded" });
                        renderTable(rows);
                    }
                };
                img.onerror = function() {
                    renderTable(rows);
                    showToast("Loaded file info, but could not load image preview.");
                };
                img.src = URL.createObjectURL(file);
            } else {
                renderTable(rows);
                showToast("File metadata loaded.");
            }
        };

        exifDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            exifDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) loadExif(e.dataTransfer.files[0]);
        });
        
        exifFile.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) loadExif(e.target.files[0]);
        });
    }

    // ================= SCIENTIFIC CALCULATOR =================
    const scicalcDisplay = document.getElementById("scicalc-display");
    const scicalcFormula = document.getElementById("scicalc-formula");
    const scicalcBtns = document.querySelectorAll("#scicalc-keyboard .calc-btn");
    
    if (scicalcDisplay && scicalcBtns.length > 0) {
        scicalcBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const action = btn.getAttribute("data-action");
                if (action === "clear") {
                    scicalcDisplay.value = "0";
                    if (scicalcFormula) scicalcFormula.textContent = "";
                } else if (action === "backspace") {
                    if (scicalcDisplay.value.length > 1) {
                        scicalcDisplay.value = scicalcDisplay.value.slice(0, -1);
                    } else {
                        scicalcDisplay.value = "0";
                    }
                } else if (action === "calc") {
                    try {
                        let exp = scicalcDisplay.value;
                        if (scicalcFormula) scicalcFormula.textContent = exp + " =";
                        
                        exp = exp.replace(/sin\(/g, "Math.sin(")
                                 .replace(/cos\(/g, "Math.cos(")
                                 .replace(/tan\(/g, "Math.tan(")
                                 .replace(/log\(/g, "Math.log10(")
                                 .replace(/ln\(/g, "Math.log(")
                                 .replace(/sqrt\(/g, "Math.sqrt(")
                                 .replace(/\^/g, "**")
                                 .replace(/pi/gi, "Math.PI")
                                 .replace(/e/gi, "Math.E");
                        // eslint-disable-next-line no-new-func
                        const result = new Function('return ' + exp)();
                        scicalcDisplay.value = Number.isFinite(result) ? parseFloat(result.toFixed(8)) : "Error";
                    } catch (e) {
                        scicalcDisplay.value = "Error";
                    }
                } else {
                    if (scicalcDisplay.value === "0" && !isNaN(action)) {
                        scicalcDisplay.value = action;
                    } else {
                        scicalcDisplay.value += action;
                    }
                }
            });
        });
    }

    // ================= CGPA CALCULATOR =================
    const cgpaAddBtn = document.getElementById("cgpacalc-add-btn");
    const cgpaTableBody = document.getElementById("cgpacalc-table-body");
    const cgpaResult = document.getElementById("cgpacalc-result");

    const calculateCGPA = () => {
        if (!cgpaTableBody || !cgpaResult) return;
        const rows = cgpaTableBody.querySelectorAll(".cgpa-row");
        let totalCredits = 0;
        let totalPoints = 0;

        rows.forEach(row => {
            const gradeSelect = row.querySelector(".cgpa-grade");
            const creditInput = row.querySelector(".cgpa-credits");
            if (gradeSelect && creditInput) {
                const grade = parseFloat(gradeSelect.value) || 0;
                const credits = parseFloat(creditInput.value) || 0;
                totalCredits += credits;
                totalPoints += (grade * credits);
            }
        });

        if (totalCredits > 0) {
            const cgpa = (totalPoints / totalCredits).toFixed(2);
            cgpaResult.textContent = cgpa;
        } else {
            cgpaResult.textContent = "0.00";
        }
    };

    if (cgpaAddBtn && cgpaTableBody) {
        cgpaAddBtn.addEventListener("click", () => {
            const newRow = document.createElement("tr");
            newRow.className = "cgpa-row";
            newRow.innerHTML = `
                <td>
                    <select class="qr-select cgpa-grade">
                        <option value="10">O / A+ (10)</option>
                        <option value="9">A (9)</option>
                        <option value="8" selected>B (8)</option>
                        <option value="7">C (7)</option>
                        <option value="6">D (6)</option>
                        <option value="5">E (5)</option>
                        <option value="0">F / Fail (0)</option>
                    </select>
                </td>
                <td><input type="number" class="qr-text-input cgpa-credits" value="3" min="1" max="10"></td>
                <td><button class="clear-btn delete-cgpa-row-btn">Delete</button></td>
            `;
            cgpaTableBody.appendChild(newRow);
            calculateCGPA();
        });

        cgpaTableBody.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-cgpa-row-btn")) {
                const row = e.target.closest(".cgpa-row");
                if (row) {
                    row.remove();
                    calculateCGPA();
                }
            }
        });

        cgpaTableBody.addEventListener("input", calculateCGPA);
        cgpaTableBody.addEventListener("change", calculateCGPA);
        calculateCGPA();
    }

    // CGPA <-> Percentage Quick Converter
    const cgpaConvMode = document.getElementById("cgpa-conv-mode");
    const cgpaConvValue = document.getElementById("cgpa-conv-value");
    const cgpaConvFactor = document.getElementById("cgpa-conv-factor");
    const cgpaConvResult = document.getElementById("cgpa-conv-result");
    const cgpaConvFormula = document.getElementById("cgpa-conv-formula");
    const cgpaConvValueLabel = document.getElementById("cgpa-conv-value-label");

    const runCGPAConversion = () => {
        if (!cgpaConvMode || !cgpaConvValue || !cgpaConvFactor || !cgpaConvResult || !cgpaConvFormula) return;

        const mode = cgpaConvMode.value;
        const value = parseFloat(cgpaConvValue.value) || 0;
        const factor = parseFloat(cgpaConvFactor.value) || 9.5;

        if (mode === "cgpa-to-percent") {
            const pct = value * factor;
            cgpaConvResult.textContent = `${pct.toFixed(2)}%`;
            cgpaConvFormula.textContent = `Formula: CGPA (${value}) × Factor (${factor})`;
        } else {
            const cgpa = value / factor;
            cgpaConvResult.textContent = `${cgpa.toFixed(2)}`;
            cgpaConvFormula.textContent = `Formula: Percentage (${value}%) ÷ Factor (${factor})`;
        }
    };

    if (cgpaConvMode && cgpaConvValue && cgpaConvFactor) {
        cgpaConvMode.addEventListener("change", () => {
            const mode = cgpaConvMode.value;
            if (mode === "cgpa-to-percent") {
                if (cgpaConvValueLabel) cgpaConvValueLabel.textContent = "Enter CGPA (Scale 1-10)";
                cgpaConvValue.placeholder = "e.g. 8.5";
                cgpaConvValue.max = "10";
                cgpaConvValue.min = "0";
                cgpaConvValue.value = "8.5";
            } else {
                if (cgpaConvValueLabel) cgpaConvValueLabel.textContent = "Enter Percentage (0-100)";
                cgpaConvValue.placeholder = "e.g. 85";
                cgpaConvValue.max = "100";
                cgpaConvValue.min = "0";
                cgpaConvValue.value = "80";
            }
            runCGPAConversion();
        });

        cgpaConvValue.addEventListener("input", runCGPAConversion);
        cgpaConvFactor.addEventListener("change", runCGPAConversion);
        
        runCGPAConversion();
    }

    // ================= PERCENTAGE CALCULATOR =================
    const pctP1 = document.getElementById("pct-p1");
    const pctP2 = document.getElementById("pct-p2");
    const pctBtn1 = document.getElementById("pct-btn-1");

    const pctR1 = document.getElementById("pct-r1");
    const pctR2 = document.getElementById("pct-r2");
    const pctBtn2 = document.getElementById("pct-btn-2");

    const pctI1 = document.getElementById("pct-i1");
    const pctI2 = document.getElementById("pct-i2");
    const pctBtn3 = document.getElementById("pct-btn-3");

    const pctResult = document.getElementById("percentcalc-result");

    if (pctResult) {
        if (pctBtn1 && pctP1 && pctP2) {
            pctBtn1.addEventListener("click", () => {
                const p1 = parseFloat(pctP1.value);
                const p2 = parseFloat(pctP2.value);
                if (!isNaN(p1) && !isNaN(p2)) {
                    const res = (p1 / 100) * p2;
                    pctResult.textContent = Number.isInteger(res) ? res : res.toFixed(2);
                } else {
                    pctResult.textContent = "Error";
                }
            });
        }

        if (pctBtn2 && pctR1 && pctR2) {
            pctBtn2.addEventListener("click", () => {
                const r1 = parseFloat(pctR1.value);
                const r2 = parseFloat(pctR2.value);
                if (!isNaN(r1) && !isNaN(r2) && r2 !== 0) {
                    const res = (r1 / r2) * 100;
                    pctResult.textContent = (Number.isInteger(res) ? res : res.toFixed(2)) + "%";
                } else {
                    pctResult.textContent = "Error";
                }
            });
        }

        if (pctBtn3 && pctI1 && pctI2) {
            pctBtn3.addEventListener("click", () => {
                const i1 = parseFloat(pctI1.value);
                const i2 = parseFloat(pctI2.value);
                if (!isNaN(i1) && !isNaN(i2) && i1 !== 0) {
                    const res = ((i2 - i1) / i1) * 100;
                    const sign = res >= 0 ? "+" : "";
                    pctResult.textContent = sign + (Number.isInteger(res) ? res : res.toFixed(2)) + "%";
                } else {
                    pctResult.textContent = "Error";
                }
            });
        }
    }

    // ================= ATTENDANCE CALCULATOR =================
    const attPresent = document.getElementById("attendcalc-present");
    const attTotal = document.getElementById("attendcalc-total");
    const attTarget = document.getElementById("attendcalc-target");
    const attStatus = document.getElementById("attendcalc-status");
    const attResult = document.getElementById("attendcalc-result");

    const calculateAttendance = () => {
        if (!attPresent || !attTotal || !attTarget || !attStatus || !attResult) return;
        const present = parseInt(attPresent.value);
        const total = parseInt(attTotal.value);
        const target = parseInt(attTarget.value);

        if (isNaN(present) || isNaN(total) || isNaN(target) || total === 0 || target > 100 || target < 0 || present > total) {
            attStatus.textContent = "Current Attendance: —";
            attStatus.style.color = "var(--text-color)";
            attResult.textContent = "Please enter valid attendance values (Present must be less than or equal to Total).";
            return;
        }

        const currentPct = (present / total) * 100;
        attStatus.textContent = `Current Attendance: ${currentPct.toFixed(2)}%`;
        
        if (currentPct >= target) {
            attStatus.style.color = "var(--green)";
            let canMiss = 0;
            let newPct = currentPct;
            let simTotal = total;
            while (newPct >= target) {
                simTotal++;
                newPct = (present / simTotal) * 100;
                if (newPct >= target) {
                    canMiss++;
                } else {
                    break;
                }
            }
            if (canMiss > 0) {
                attResult.innerHTML = `You are above your target of ${target}%. You can safely <strong>miss next ${canMiss} class(es)</strong> without falling below the threshold.`;
            } else {
                attResult.innerHTML = `You are exactly at your target of ${target}%. If you miss even 1 class, you will fall below the limit!`;
            }
        } else {
            attStatus.style.color = "var(--red)";
            let reqClasses = 0;
            let newPct = currentPct;
            let simPresent = present;
            let simTotal = total;
            while (newPct < target) {
                simPresent++;
                simTotal++;
                reqClasses++;
                newPct = (simPresent / simTotal) * 100;
            }
            attResult.innerHTML = `You are below your target of ${target}%. You must attend the <strong>next ${reqClasses} classes consecutively</strong> to reach your goal.`;
        }
    };

    if (attPresent && attTotal && attTarget) {
        [attPresent, attTotal, attTarget].forEach(input => {
            input.addEventListener("input", calculateAttendance);
        });
        calculateAttendance();
    }

    // ================= EMI CALCULATOR =================
    const emiPrincipal = document.getElementById("emicalc-principal");
    const emiRate = document.getElementById("emicalc-rate");
    const emiTenure = document.getElementById("emicalc-tenure");
    const emiMonthly = document.getElementById("emicalc-monthly");
    const emiInterest = document.getElementById("emicalc-interest");
    const emiTotal = document.getElementById("emicalc-total");

    const calculateEMI = () => {
        if (!emiPrincipal || !emiRate || !emiTenure || !emiMonthly || !emiInterest || !emiTotal) return;
        const p = parseFloat(emiPrincipal.value);
        const r = parseFloat(emiRate.value) / 12 / 100; // monthly rate
        const n = parseFloat(emiTenure.value); // months
        
        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalAmt = emi * n;
            const totalInt = totalAmt - p;
            
            emiMonthly.textContent = `$${emi.toFixed(2)}`;
            emiInterest.textContent = `$${totalInt.toFixed(2)}`;
            emiTotal.textContent = `$${totalAmt.toFixed(2)}`;
        } else {
            emiMonthly.textContent = "$0.00";
            emiInterest.textContent = "$0.00";
            emiTotal.textContent = "$0.00";
        }
    };

    if (emiPrincipal && emiRate && emiTenure) {
        [emiPrincipal, emiRate, emiTenure].forEach(input => {
            input.addEventListener("input", calculateEMI);
        });
        calculateEMI();
    }

    // ================= GST CALCULATOR =================
    const gstAmount = document.getElementById("gstcalc-amount");
    const gstRate = document.getElementById("gstcalc-rate");
    const gstMode = document.getElementById("gstcalc-mode");
    const gstCgst = document.getElementById("gstcalc-cgst");
    const gstSgst = document.getElementById("gstcalc-sgst");
    const gstTotal = document.getElementById("gstcalc-total");

    const calculateGST = () => {
        if (!gstAmount || !gstRate || !gstMode || !gstCgst || !gstSgst || !gstTotal) return;
        const amt = parseFloat(gstAmount.value) || 0;
        const rate = parseFloat(gstRate.value) || 0;
        
        let total = 0;
        let tax = 0;
        if (gstMode.value === "add") {
            tax = (amt * rate) / 100;
            total = amt + tax;
        } else {
            tax = amt - (amt * (100 / (100 + rate)));
            total = amt;
        }

        const halfTax = tax / 2;
        gstCgst.textContent = `$${halfTax.toFixed(2)}`;
        gstSgst.textContent = `$${halfTax.toFixed(2)}`;
        gstTotal.textContent = `$${total.toFixed(2)}`;
    };

    if (gstAmount && gstRate && gstMode) {
        [gstAmount, gstRate, gstMode].forEach(el => {
            el.addEventListener("input", calculateGST);
            el.addEventListener("change", calculateGST);
        });
        calculateGST();
    }

    // ================= LOAN CALCULATOR =================
    const loanPrincipal = document.getElementById("loancalc-principal");
    const loanRate = document.getElementById("loancalc-rate");
    const loanTenure = document.getElementById("loancalc-tenure");
    const loanMonthly = document.getElementById("loancalc-monthly");
    const loanInterest = document.getElementById("loancalc-interest");
    const loanTotal = document.getElementById("loancalc-total");

    const calculateLoan = () => {
        if (!loanPrincipal || !loanRate || !loanTenure || !loanMonthly || !loanInterest || !loanTotal) return;
        const p = parseFloat(loanPrincipal.value) || 0;
        const r = parseFloat(loanRate.value) / 12 / 100; // monthly rate
        const n = parseFloat(loanTenure.value) * 12; // months
        
        if (p > 0 && r > 0 && n > 0) {
            const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const outlay = monthly * n;
            const interest = outlay - p;
            
            loanMonthly.textContent = `$${monthly.toFixed(2)}`;
            loanInterest.textContent = `$${interest.toFixed(2)}`;
            loanTotal.textContent = `$${outlay.toFixed(2)}`;
        } else {
            loanMonthly.textContent = "$0.00";
            loanInterest.textContent = "$0.00";
            loanTotal.textContent = "$0.00";
        }
    };

    if (loanPrincipal && loanRate && loanTenure) {
        [loanPrincipal, loanRate, loanTenure].forEach(input => {
            input.addEventListener("input", calculateLoan);
        });
        calculateLoan();
    }

    // ================= AGE CALCULATOR =================
    const ageBirthdate = document.getElementById("agecalc-birthdate");
    const ageResult = document.getElementById("agecalc-result");

    const calculateAge = () => {
        if (!ageBirthdate || !ageResult || !ageBirthdate.value) return;
        const bdate = new Date(ageBirthdate.value);
        const today = new Date();
        if (bdate > today) {
            ageResult.textContent = "Birth date cannot be in the future!";
            return;
        }
        let years = today.getFullYear() - bdate.getFullYear();
        let months = today.getMonth() - bdate.getMonth();
        let days = today.getDate() - bdate.getDate();
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        ageResult.innerHTML = `You are <strong>${years} years, ${months} months, and ${days} days</strong> old.`;
    };

    if (ageBirthdate) {
        ageBirthdate.addEventListener("input", calculateAge);
    }

    // ================= DATE DIFFERENCE CALCULATOR =================
    const dateDiffStart = document.getElementById("datediff-start");
    const dateDiffEnd = document.getElementById("datediff-end");
    const dateDiffResult = document.getElementById("datediff-result");

    const calculateDateDiff = () => {
        if (!dateDiffStart || !dateDiffEnd || !dateDiffResult) return;
        if (!dateDiffStart.value || !dateDiffEnd.value) return;
        const d1 = new Date(dateDiffStart.value);
        const d2 = new Date(dateDiffEnd.value);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const weeks = (diffDays / 7).toFixed(1);
        const months = (diffDays / 30.437).toFixed(1);

        dateDiffResult.innerHTML = `Difference is <strong>${diffDays} days</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">(${weeks} weeks or ${months} months)</span>`;
    };

    if (dateDiffStart && dateDiffEnd) {
        [dateDiffStart, dateDiffEnd].forEach(input => {
            input.addEventListener("input", calculateDateDiff);
        });
    }

    // ================= UNIT CONVERTER =================
    const unitCategory = document.getElementById("unitconv-category");
    const unitInputVal = document.getElementById("unitconv-input-val");
    const unitInputUnit = document.getElementById("unitconv-input-unit");
    const unitOutputVal = document.getElementById("unitconv-output-val");
    const unitOutputUnit = document.getElementById("unitconv-output-unit");

    const unitRates = {
        length: {
            Meters: 1,
            Kilometers: 1000,
            Miles: 1609.34,
            Feet: 0.3048,
            Inches: 0.0254
        },
        weight: {
            Kilograms: 1,
            Grams: 0.001,
            Pounds: 0.453592,
            Ounces: 0.0283495
        }
    };

    const populateUnitSelects = () => {
        if (!unitCategory || !unitInputUnit || !unitOutputUnit) return;
        const cat = unitCategory.value;
        
        let options = [];
        if (cat === "length") options = ["Meters", "Kilometers", "Miles", "Feet", "Inches"];
        else if (cat === "weight") options = ["Kilograms", "Grams", "Pounds", "Ounces"];
        else if (cat === "temp") options = ["Celsius", "Fahrenheit", "Kelvin"];
        else if (cat === "data") options = ["Bytes", "Kilobytes (KB)", "Megabytes (MB)", "Gigabytes (GB)", "Terabytes (TB)"];

        unitInputUnit.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join("");
        unitOutputUnit.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join("");
        if (options.length > 1) unitOutputUnit.selectedIndex = 1;
        
        calculateUnitConversion();
    };

    const calculateUnitConversion = () => {
        if (!unitCategory || !unitInputVal || !unitInputUnit || !unitOutputVal || !unitOutputUnit) return;
        const cat = unitCategory.value;
        const val = parseFloat(unitInputVal.value);
        const from = unitInputUnit.value;
        const to = unitOutputUnit.value;

        if (isNaN(val)) {
            unitOutputVal.value = "";
            return;
        }

        let outVal = 0;

        if (cat === "temp") {
            if (from === to) outVal = val;
            else if (from === "Celsius" && to === "Fahrenheit") outVal = (val * 9/5) + 32;
            else if (from === "Celsius" && to === "Kelvin") outVal = val + 273.15;
            else if (from === "Fahrenheit" && to === "Celsius") outVal = (val - 32) * 5/9;
            else if (from === "Fahrenheit" && to === "Kelvin") outVal = (val - 32) * 5/9 + 273.15;
            else if (from === "Kelvin" && to === "Celsius") outVal = val - 273.15;
            else if (from === "Kelvin" && to === "Fahrenheit") outVal = (val - 273.15) * 9/5 + 32;
        } else if (cat === "data") {
            const sizes = {
                "Bytes": 1,
                "Kilobytes (KB)": 1024,
                "Megabytes (MB)": 1024 * 1024,
                "Gigabytes (GB)": 1024 * 1024 * 1024,
                "Terabytes (TB)": 1024 * 1024 * 1024 * 1024
            };
            const bytes = val * sizes[from];
            outVal = bytes / sizes[to];
        } else {
            const rates = unitRates[cat];
            if (rates) {
                const baseVal = val * rates[from];
                outVal = baseVal / rates[to];
            } else {
                outVal = val;
            }
        }

        unitOutputVal.value = Number.isInteger(outVal) ? outVal : parseFloat(outVal.toFixed(6));
    };

    if (unitCategory) {
        unitCategory.addEventListener("change", populateUnitSelects);
        [unitInputVal, unitInputUnit, unitOutputUnit].forEach(el => {
            el.addEventListener("input", calculateUnitConversion);
            el.addEventListener("change", calculateUnitConversion);
        });
        populateUnitSelects();
    }

    // ================= AES ENCRYPTER / DECRYPTER =================
    const cipherEncryptInput = document.getElementById("cipher-encrypt-input");
    const cipherEncryptKey = document.getElementById("cipher-encrypt-key");
    const cipherEncryptAlgo = document.getElementById("cipher-encrypt-algo");
    const cipherEncryptBtn = document.getElementById("cipher-encrypt-btn");

    const cipherDecryptInput = document.getElementById("cipher-decrypt-input");
    const cipherDecryptKey = document.getElementById("cipher-decrypt-key");
    const cipherDecryptAlgo = document.getElementById("cipher-decrypt-algo");
    const cipherDecryptBtn = document.getElementById("cipher-decrypt-btn");

    const cipherOutput = document.getElementById("cipher-output");
    const cipherCopyBtn = document.getElementById("cipher-copy-btn");

    async function deriveKey(passphrase, salt, iterations, keyLength, algo = "AES-GCM") {
        const encoder = new TextEncoder();
        const passphraseKey = await window.crypto.subtle.importKey(
            "raw",
            encoder.encode(passphrase),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: iterations,
                hash: "SHA-256"
            },
            passphraseKey,
            { name: algo, length: keyLength },
            false,
            ["encrypt", "decrypt"]
        );
    }

    async function encryptText(text, passphrase, mode = "AES-GCM") {
        const encoder = new TextEncoder();
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(mode === "AES-GCM" ? 12 : 16));
        const iterations = 100000;
        const key = await deriveKey(passphrase, salt, iterations, 256, mode);
        
        let encrypted;
        if (mode === "AES-GCM") {
            encrypted = await window.crypto.subtle.encrypt(
                { name: "AES-GCM", iv: iv },
                key,
                encoder.encode(text)
            );
        } else {
            encrypted = await window.crypto.subtle.encrypt(
                { name: "AES-CBC", iv: iv },
                key,
                encoder.encode(text)
            );
        }

        const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, "0")).join("");
        const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, "0")).join("");
        const encryptedHex = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, "0")).join("");

        return `${saltHex}:${ivHex}:${encryptedHex}`;
    }

    async function decryptText(cipherPackage, passphrase, mode = "AES-GCM") {
        const parts = cipherPackage.split(":");
        if (parts.length !== 3) throw new Error("Invalid encrypted format. Must be salt:iv:ciphertext");

        const salt = new Uint8Array(parts[0].match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const iv = new Uint8Array(parts[1].match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const encryptedBytes = new Uint8Array(parts[2].match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        const iterations = 100000;
        const key = await deriveKey(passphrase, salt, iterations, 256, mode);

        let decrypted;
        if (mode === "AES-GCM") {
            decrypted = await window.crypto.subtle.decrypt(
                { name: "AES-GCM", iv: iv },
                key,
                encryptedBytes
            );
        } else {
            decrypted = await window.crypto.subtle.decrypt(
                { name: "AES-CBC", iv: iv },
                key,
                encryptedBytes
            );
        }

        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    }

    if (cipherEncryptBtn) {
        cipherEncryptBtn.addEventListener("click", async () => {
            const text = cipherEncryptInput.value;
            const key = cipherEncryptKey.value;
            const mode = cipherEncryptAlgo.value;

            if (!text || !key) {
                showToast("Please enter both plain text and a secret passphrase.");
                return;
            }

            try {
                cipherEncryptBtn.textContent = "⏳ Encrypting...";
                cipherEncryptBtn.disabled = true;
                const result = await encryptText(text, key, mode);
                cipherOutput.value = result;
                showToast("Text Encrypted successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Encryption failed: " + err.message);
            } finally {
                cipherEncryptBtn.textContent = "⚡ Encrypt Message";
                cipherEncryptBtn.disabled = false;
            }
        });
    }

    if (cipherDecryptBtn) {
        cipherDecryptBtn.addEventListener("click", async () => {
            const text = cipherDecryptInput.value.trim();
            const key = cipherDecryptKey.value;
            const mode = cipherDecryptAlgo.value;

            if (!text || !key) {
                showToast("Please enter encrypted text and secret key.");
                return;
            }

            try {
                cipherDecryptBtn.textContent = "⏳ Decrypting...";
                cipherDecryptBtn.disabled = true;
                const result = await decryptText(text, key, mode);
                cipherOutput.value = result;
                showToast("Text Decrypted successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Decryption failed. Check key/format.");
            } finally {
                cipherDecryptBtn.textContent = "⚡ Decrypt Message";
                cipherDecryptBtn.disabled = false;
            }
        });
    }

    if (cipherCopyBtn) {
        cipherCopyBtn.addEventListener("click", () => {
            if (cipherOutput.value) {
                navigator.clipboard.writeText(cipherOutput.value);
                showToast("Output copied to clipboard! ✅");
            }
        });
    }

    // ================= PASSWORD STRENGTH & ENTROPY INSPECTOR =================
    const pwdInput = document.getElementById("pwdinspector-input");
    const pwdToggle = document.getElementById("pwdinspector-toggle");
    
    const checkLength = document.getElementById("pwd-check-length");
    const checkUpper = document.getElementById("pwd-check-upper");
    const checkLower = document.getElementById("pwd-check-lower");
    const checkNum = document.getElementById("pwd-check-num");
    const checkSpec = document.getElementById("pwd-check-spec");

    const pwdStrengthLbl = document.getElementById("pwd-strength-lbl");
    const pwdStrengthBar = document.getElementById("pwd-strength-bar");
    const pwdEntropyVal = document.getElementById("pwd-entropy-val");
    const pwdPoolVal = document.getElementById("pwd-pool-val");

    const crackPc = document.getElementById("crack-time-pc");
    const crackGpu = document.getElementById("crack-time-gpu");
    const crackCluster = document.getElementById("crack-time-cluster");

    const warningCard = document.getElementById("pwd-warning-card");
    const warningsList = document.getElementById("pwd-warnings-list");

    if (pwdToggle && pwdInput) {
        pwdToggle.addEventListener("click", () => {
            if (pwdInput.type === "password") {
                pwdInput.type = "text";
                pwdToggle.textContent = "🙈";
            } else {
                pwdInput.type = "password";
                pwdToggle.textContent = "👁️";
            }
        });
    }

    function formatTime(seconds) {
        if (seconds === 0) return "Instant";
        if (seconds < 1) return "Instant";
        const years = seconds / (365 * 24 * 3600);
        if (years > 1e9) return `${(years / 1e9).toFixed(1)} Billion Years`;
        if (years > 1e6) return `${(years / 1e6).toFixed(1)} Million Years`;
        if (years > 1) return `${Math.round(years)} Years`;
        const days = seconds / (24 * 3600);
        if (days > 1) return `${Math.round(days)} Days`;
        const hours = seconds / 3600;
        if (hours > 1) return `${Math.round(hours)} Hours`;
        const minutes = seconds / 60;
        if (minutes > 1) return `${Math.round(minutes)} Minutes`;
        return `${Math.round(seconds)} Seconds`;
    }

    if (pwdInput) {
        pwdInput.type = "password";
        pwdToggle.textContent = "👁️";

        pwdInput.addEventListener("input", () => {
            const pwd = pwdInput.value;
            const len = pwd.length;

            if (len === 0) {
                pwdStrengthLbl.textContent = "Very Weak";
                pwdStrengthLbl.style.color = "var(--red)";
                pwdStrengthBar.style.width = "5%";
                pwdStrengthBar.style.backgroundColor = "var(--red)";
                pwdEntropyVal.textContent = "0 bits";
                pwdPoolVal.textContent = "0 chars";
                crackPc.textContent = "Instant";
                crackGpu.textContent = "Instant";
                crackCluster.textContent = "Instant";
                warningCard.style.display = "none";
                
                [checkLength, checkUpper, checkLower, checkNum, checkSpec].forEach(el => {
                    if (el) el.querySelector(".check-icon").textContent = "❌";
                });
                return;
            }

            const hasLength = len >= 12;
            const hasUpper = /[A-Z]/.test(pwd);
            const hasLower = /[a-z]/.test(pwd);
            const hasNum = /[0-9]/.test(pwd);
            const hasSpec = /[^A-Za-z0-9]/.test(pwd);

            if (checkLength) checkLength.querySelector(".check-icon").textContent = hasLength ? "✅" : "❌";
            if (checkUpper) checkUpper.querySelector(".check-icon").textContent = hasUpper ? "✅" : "❌";
            if (checkLower) checkLower.querySelector(".check-icon").textContent = hasLower ? "✅" : "❌";
            if (checkNum) checkNum.querySelector(".check-icon").textContent = hasNum ? "✅" : "❌";
            if (checkSpec) checkSpec.querySelector(".check-icon").textContent = hasSpec ? "✅" : "❌";

            let pool = 0;
            if (hasLower) pool += 26;
            if (hasUpper) pool += 26;
            if (hasNum) pool += 10;
            if (hasSpec) pool += 33;

            pwdPoolVal.textContent = `${pool} chars`;

            const entropy = len * Math.log2(pool);
            pwdEntropyVal.textContent = `${Math.round(entropy)} bits`;

            let strength = "Very Weak";
            let color = "var(--red)";
            let barWidth = "10%";

            if (entropy > 80 && hasLength) {
                strength = "Excellent (CISO Grade)";
                color = "var(--green)";
                barWidth = "100%";
            } else if (entropy > 60) {
                strength = "Strong";
                color = "#10B981";
                barWidth = "75%";
            } else if (entropy > 40) {
                strength = "Moderate";
                color = "var(--yellow)";
                barWidth = "50%";
            } else if (entropy > 25) {
                strength = "Weak";
                color = "var(--orange)";
                barWidth = "25%";
            }

            pwdStrengthLbl.textContent = strength;
            pwdStrengthLbl.style.color = color;
            pwdStrengthBar.style.width = barWidth;
            pwdStrengthBar.style.backgroundColor = color;

            const totalCombinations = Math.pow(pool, len);
            
            const secondsPc = (totalCombinations / 2) / 100000000;
            crackPc.textContent = formatTime(secondsPc);

            const secondsGpu = (totalCombinations / 2) / 100000000000;
            crackGpu.textContent = formatTime(secondsGpu);

            const secondsCluster = (totalCombinations / 2) / 10000000000000;
            crackCluster.textContent = formatTime(secondsCluster);

            const warnings = [];
            const commonDict = ["123456", "password", "qwerty", "admin", "welcome", "letmein", "utilify"];
            
            if (commonDict.some(word => pwd.toLowerCase().includes(word))) {
                warnings.push("Contains common dictionary patterns or words.");
            }
            if (/(\w)\1\1/.test(pwd)) {
                warnings.push("Contains 3 or more repeating characters.");
            }
            if (len < 8) {
                warnings.push("Extremely short password length.");
            }

            if (warnings.length > 0 && warningsList) {
                warningCard.style.display = "block";
                warningsList.innerHTML = warnings.map(w => `<li>${w}</li>`).join("");
            } else if (warningCard) {
                warningCard.style.display = "none";
            }
        });
    }

    // ================= TWO IMAGE MERGER =================
    const imgMergeFile1 = document.getElementById("imgmerge-file1");
    const imgMergeDropzone1 = document.getElementById("imgmerge-dropzone1");
    const imgMergeFile2 = document.getElementById("imgmerge-file2");
    const imgMergeDropzone2 = document.getElementById("imgmerge-dropzone2");
    
    const imgMergeDirection = document.getElementById("imgmerge-direction");
    const imgMergeAlign = document.getElementById("imgmerge-align");
    const imgMergeBg = document.getElementById("imgmerge-bg");
    
    const imgMergeCanvas = document.getElementById("imgmerge-canvas");
    const imgMergePlaceholder = document.getElementById("imgmerge-placeholder");
    const imgMergeDownloadBtn = document.getElementById("imgmerge-download-btn");

    let imgMergeImage1 = null;
    let imgMergeImage2 = null;

    if (imgMergeDropzone1 && imgMergeFile1) {
        imgMergeDropzone1.addEventListener("click", () => imgMergeFile1.click());
        imgMergeDropzone1.addEventListener("dragover", (e) => { e.preventDefault(); imgMergeDropzone1.style.borderColor = "var(--indigo)"; });
        imgMergeDropzone1.addEventListener("dragleave", (e) => { e.preventDefault(); imgMergeDropzone1.style.borderColor = "var(--border-color)"; });
        
        const loadImg1 = (file) => {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    imgMergeImage1 = img;
                    const previewImg = document.getElementById("imgmerge-preview-img1");
                    const contentDiv = imgMergeDropzone1.querySelector(".dropzone-content");
                    if (previewImg && contentDiv) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = "block";
                        contentDiv.style.display = "none";
                    }
                    triggerImgMerge();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
        imgMergeDropzone1.addEventListener("drop", (e) => { e.preventDefault(); imgMergeDropzone1.style.borderColor = "var(--border-color)"; if (e.dataTransfer.files[0]) loadImg1(e.dataTransfer.files[0]); });
        imgMergeFile1.addEventListener("change", (e) => { if (e.target.files[0]) loadImg1(e.target.files[0]); });
    }

    if (imgMergeDropzone2 && imgMergeFile2) {
        imgMergeDropzone2.addEventListener("click", () => imgMergeFile2.click());
        imgMergeDropzone2.addEventListener("dragover", (e) => { e.preventDefault(); imgMergeDropzone2.style.borderColor = "var(--indigo)"; });
        imgMergeDropzone2.addEventListener("dragleave", (e) => { e.preventDefault(); imgMergeDropzone2.style.borderColor = "var(--border-color)"; });
        
        const loadImg2 = (file) => {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    imgMergeImage2 = img;
                    const previewImg = document.getElementById("imgmerge-preview-img2");
                    const contentDiv = imgMergeDropzone2.querySelector(".dropzone-content");
                    if (previewImg && contentDiv) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = "block";
                        contentDiv.style.display = "none";
                    }
                    triggerImgMerge();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
        imgMergeDropzone2.addEventListener("drop", (e) => { e.preventDefault(); imgMergeDropzone2.style.borderColor = "var(--border-color)"; if (e.dataTransfer.files[0]) loadImg2(e.dataTransfer.files[0]); });
        imgMergeFile2.addEventListener("change", (e) => { if (e.target.files[0]) loadImg2(e.target.files[0]); });
    }

    [imgMergeDirection, imgMergeAlign, imgMergeBg].forEach(ctrl => {
        if (ctrl) ctrl.addEventListener("change", triggerImgMerge);
    });

    function triggerImgMerge() {
        if (!imgMergeImage1 || !imgMergeImage2 || !imgMergeCanvas) return;

        const direction = imgMergeDirection.value;
        const scaleMode = imgMergeAlign.value;
        const bgType = imgMergeBg.value;

        const ctx = imgMergeCanvas.getContext("2d");
        let w1 = imgMergeImage1.width, h1 = imgMergeImage1.height;
        let w2 = imgMergeImage2.width, h2 = imgMergeImage2.height;

        let canvasWidth = 0;
        let canvasHeight = 0;

        let drawW1 = w1, drawH1 = h1;
        let drawW2 = w2, drawH2 = h2;
        let x1 = 0, y1 = 0;
        let x2 = 0, y2 = 0;

        if (direction === "horizontal") {
            if (scaleMode === "scale") {
                const scale = h1 / h2;
                drawW2 = w2 * scale;
                drawH2 = h1;
                canvasWidth = w1 + drawW2;
                canvasHeight = h1;
                x2 = w1;
            } else {
                canvasWidth = w1 + w2;
                canvasHeight = Math.max(h1, h2);
                x2 = w1;
                y1 = (canvasHeight - h1) / 2;
                y2 = (canvasHeight - h2) / 2;
            }
        } else {
            if (scaleMode === "scale") {
                const scale = w1 / w2;
                drawW2 = w1;
                drawH2 = h2 * scale;
                canvasWidth = w1;
                canvasHeight = h1 + drawH2;
                y2 = h1;
            } else {
                canvasWidth = Math.max(w1, w2);
                canvasHeight = h1 + h2;
                y2 = h1;
                x1 = (canvasWidth - w1) / 2;
                x2 = (canvasWidth - w2) / 2;
            }
        }

        imgMergeCanvas.width = canvasWidth;
        imgMergeCanvas.height = canvasHeight;

        if (bgType === "white") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        } else if (bgType === "black") {
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        } else {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }

        ctx.drawImage(imgMergeImage1, x1, y1, drawW1, drawH1);
        ctx.drawImage(imgMergeImage2, x2, y2, drawW2, drawH2);

        imgMergeCanvas.style.display = "block";
        imgMergePlaceholder.style.display = "none";
        imgMergeDownloadBtn.disabled = false;

        const container = imgMergeCanvas.parentElement;
        if (container) {
            container.classList.add("checkerboard-bg");
        }
    }

    if (imgMergeDownloadBtn) {
        imgMergeDownloadBtn.addEventListener("click", () => {
            if (!imgMergeImage1 || !imgMergeImage2) return;
            imgMergeCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Utilify_Merged_Images.png";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Merged image downloaded successfully! ✅");
            }, "image/png");
        });
    }

    // ================= IMAGE TO PDF =================
    const imgToPdfDropzone = document.getElementById("imagetopdf-dropzone");
    const imgToPdfFile = document.getElementById("imagetopdf-file");
    const imgToPdfList = document.getElementById("imagetopdf-list");
    const imgToPdfSize = document.getElementById("imagetopdf-size");
    const imgToPdfOrient = document.getElementById("imagetopdf-orient");
    const imgToPdfMargin = document.getElementById("imagetopdf-margin");
    const imgToPdfDownloadBtn = document.getElementById("imagetopdf-download-btn");

    let uploadedImagesForPdf = [];

    if (imgToPdfDropzone && imgToPdfFile) {
        imgToPdfDropzone.addEventListener("click", () => imgToPdfFile.click());
        imgToPdfDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            imgToPdfDropzone.style.borderColor = "var(--indigo)";
        });
        imgToPdfDropzone.addEventListener("dragleave", () => {
            imgToPdfDropzone.style.borderColor = "var(--border-color)";
        });
        imgToPdfDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            imgToPdfDropzone.style.borderColor = "var(--border-color)";
            handleImgToPdfFiles(e.dataTransfer.files);
        });
        imgToPdfFile.addEventListener("change", (e) => {
            handleImgToPdfFiles(e.target.files);
        });
    }

    function handleImgToPdfFiles(files) {
        for (let file of files) {
            if (!file.type.startsWith("image/")) continue;
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImagesForPdf.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: file.type,
                    dataUrl: e.target.result
                });
                renderImgToPdfList();
            };
            reader.readAsDataURL(file);
        }
    }

    function renderImgToPdfList() {
        if (!imgToPdfList) return;
        imgToPdfList.innerHTML = "";
        
        if (uploadedImagesForPdf.length === 0) {
            imgToPdfDownloadBtn.disabled = true;
            return;
        }
        imgToPdfDownloadBtn.disabled = false;

        uploadedImagesForPdf.forEach((img, index) => {
            const item = document.createElement("div");
            item.className = "card";
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.justifyContent = "space-between";
            item.style.padding = "0.75rem 1rem";
            item.style.background = "rgba(255,255,255,0.02)";
            item.style.borderRadius = "8px";

            item.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <img src="${img.dataUrl}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid var(--border-color);">
                    <span style="font-size:0.85rem; font-weight:600; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${img.name}</span>
                </div>
                <button class="clear-btn remove-pdf-img-btn" data-id="${img.id}" style="color:var(--red); padding:4px 8px; font-size:0.8rem;">Remove</button>
            `;
            imgToPdfList.appendChild(item);
        });

        imgToPdfList.querySelectorAll(".remove-pdf-img-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseFloat(btn.getAttribute("data-id"));
                uploadedImagesForPdf = uploadedImagesForPdf.filter(img => img.id !== id);
                renderImgToPdfList();
            });
        });
    }

    if (imgToPdfDownloadBtn) {
        imgToPdfDownloadBtn.addEventListener("click", async () => {
            if (uploadedImagesForPdf.length === 0) return;
            imgToPdfDownloadBtn.disabled = true;
            imgToPdfDownloadBtn.textContent = "⌛ Processing PDF...";

            try {
                const pdfDoc = await PDFLib.PDFDocument.create();
                const pageSize = imgToPdfSize.value;
                const orientation = imgToPdfOrient.value;
                const margin = imgToPdfMargin.value === "none" ? 0 : (imgToPdfMargin.value === "small" ? 20 : 40);

                for (let img of uploadedImagesForPdf) {
                    let imageBytes;
                    const base64Data = img.dataUrl.split(",")[1];
                    const binaryString = atob(base64Data);
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    imageBytes = bytes.buffer;

                    let embeddedImage;
                    if (img.type === "image/jpeg" || img.type === "image/jpg") {
                        embeddedImage = await pdfDoc.embedJpg(imageBytes);
                    } else {
                        embeddedImage = await pdfDoc.embedPng(imageBytes);
                    }

                    let pageWidth = 595.27;
                    let pageHeight = 841.89;

                    if (pageSize === "letter") {
                        pageWidth = 612.0;
                        pageHeight = 792.0;
                    } else if (pageSize === "fit") {
                        pageWidth = embeddedImage.width + margin * 2;
                        pageHeight = embeddedImage.height + margin * 2;
                    }

                    if (orientation === "landscape" && pageSize !== "fit") {
                        const temp = pageWidth;
                        pageWidth = pageHeight;
                        pageHeight = temp;
                    }

                    const page = pdfDoc.addPage([pageWidth, pageHeight]);

                    const availWidth = pageWidth - margin * 2;
                    const availHeight = pageHeight - margin * 2;
                    
                    const imgRatio = embeddedImage.width / embeddedImage.height;
                    const availRatio = availWidth / availHeight;

                    let drawWidth = availWidth;
                    let drawHeight = availHeight;

                    if (imgRatio > availRatio) {
                        drawHeight = availWidth / imgRatio;
                    } else {
                        drawWidth = availHeight * imgRatio;
                    }

                    const x = margin + (availWidth - drawWidth) / 2;
                    const y = margin + (availHeight - drawHeight) / 2;

                    page.drawImage(embeddedImage, {
                        x: x,
                        y: y,
                        width: drawWidth,
                        height: drawHeight
                    });
                }

                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Utilify_Converted_Images.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("PDF document downloaded successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error compiling PDF document. ❌");
            } finally {
                imgToPdfDownloadBtn.disabled = false;
                imgToPdfDownloadBtn.textContent = "⚡ Generate & Download PDF";
            }
        });
    }

    // ================= PDF TO IMAGE =================
    const pdfToImgDropzone = document.getElementById("pdftoimage-dropzone");
    const pdfToImgFile = document.getElementById("pdftoimage-file");
    const pdfToImgPreview = document.getElementById("pdftoimage-preview-container");
    const pdfToImgFormat = document.getElementById("pdftoimage-format");
    const pdfToImgScale = document.getElementById("pdftoimage-scale");
    const pdfToImgDownloadAll = document.getElementById("pdftoimage-download-all");

    let activePdfDoc = null;
    let pdfToImgPages = [];

    if (window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
    }

    if (pdfToImgDropzone && pdfToImgFile) {
        pdfToImgDropzone.addEventListener("click", () => pdfToImgFile.click());
        pdfToImgDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            pdfToImgDropzone.style.borderColor = "var(--indigo)";
        });
        pdfToImgDropzone.addEventListener("dragleave", () => {
            pdfToImgDropzone.style.borderColor = "var(--border-color)";
        });
        pdfToImgDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfToImgDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadPdfToImageFile(e.dataTransfer.files[0]);
            }
        });
        pdfToImgFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadPdfToImageFile(e.target.files[0]);
            }
        });
    }

    async function loadPdfToImageFile(file) {
        if (file.type !== "application/pdf") {
            showToast("Invalid file format. Upload PDF only! ❌");
            return;
        }
        
        pdfToImgPreview.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>Loading and parsing PDF pages...</p>";
        pdfToImgDownloadAll.disabled = true;
        pdfToImgPages = [];

        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            activePdfDoc = await loadingTask.promise;
            
            pdfToImgPreview.innerHTML = "";
            pdfToImgDownloadAll.disabled = false;

            const scaleVal = parseFloat(pdfToImgScale.value) || 2;
            const outputMime = pdfToImgFormat.value;

            for (let i = 1; i <= activePdfDoc.numPages; i++) {
                const page = await activePdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: scaleVal });
                
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: ctx, viewport: viewport }).promise;
                
                const imgDataUrl = canvas.toDataURL(outputMime);
                pdfToImgPages.push({ pageNum: i, dataUrl: imgDataUrl });

                const card = document.createElement("div");
                card.className = "card";
                card.style.padding = "0.75rem";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.gap = "0.5rem";
                card.style.textAlign = "center";

                card.innerHTML = `
                    <div style="background:rgba(0,0,0,0.1); border-radius:6px; overflow:hidden; border:1px solid var(--border-color); display:flex; justify-content:center;">
                        <img src="${imgDataUrl}" style="max-width:100%; max-height:160px; object-fit:contain;">
                    </div>
                    <span style="font-size:0.8rem; font-weight:700; color:var(--text-color);">Page ${i}</span>
                    <button class="case-copy-btn download-page-btn" data-index="${i - 1}" style="width:100%; justify-content:center; padding:6px; font-size:0.75rem;">Download</button>
                `;
                pdfToImgPreview.appendChild(card);
            }

            pdfToImgPreview.querySelectorAll(".download-page-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const idx = parseInt(btn.getAttribute("data-index"));
                    const page = pdfToImgPages[idx];
                    const ext = outputMime === "image/png" ? "png" : "jpg";
                    const a = document.createElement("a");
                    a.href = page.dataUrl;
                    a.download = `Utilify_Page_${page.pageNum}.${ext}`;
                    a.click();
                });
            });

        } catch (err) {
            console.error(err);
            pdfToImgPreview.innerHTML = "<p style='grid-column:1/-1; text-align:center; color:var(--red);'>Failed to process PDF file.</p>";
        }
    }

    if (pdfToImgDownloadAll) {
        pdfToImgDownloadAll.addEventListener("click", () => {
            if (pdfToImgPages.length === 0) return;
            const outputMime = pdfToImgFormat.value;
            const ext = outputMime === "image/png" ? "png" : "jpg";
            
            pdfToImgPages.forEach((page, index) => {
                setTimeout(() => {
                    const a = document.createElement("a");
                    a.href = page.dataUrl;
                    a.download = `Utilify_Page_${page.pageNum}.${ext}`;
                    a.click();
                }, index * 250);
            });
            showToast("Downloading all pages sequentially... 🚀");
        });
    }

    // ================= COMPRESS PDF =================
    const pdfCompDropzone = document.getElementById("pdfcompress-dropzone");
    const pdfCompFile = document.getElementById("pdfcompress-file");
    const pdfCompInfo = document.getElementById("pdfcompress-info");
    const pdfCompOrigSize = document.getElementById("pdfcompress-orig-size");
    const pdfCompNewSize = document.getElementById("pdfcompress-new-size");
    const pdfCompRatio = document.getElementById("pdfcompress-ratio");
    const pdfCompLevel = document.getElementById("pdfcompress-level");
    const pdfCompDownloadBtn = document.getElementById("pdfcompress-download-btn");

    let rawPdfBuffer = null;
    let rawPdfName = "";

    if (pdfCompDropzone && pdfCompFile) {
        pdfCompDropzone.addEventListener("click", () => pdfCompFile.click());
        pdfCompDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            pdfCompDropzone.style.borderColor = "var(--indigo)";
        });
        pdfCompDropzone.addEventListener("dragleave", () => {
            pdfCompDropzone.style.borderColor = "var(--border-color)";
        });
        pdfCompDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfCompDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadPdfCompFile(e.dataTransfer.files[0]);
            }
        });
        pdfCompFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadPdfCompFile(e.target.files[0]);
            }
        });
    }

    async function loadPdfCompFile(file) {
        if (file.type !== "application/pdf") {
            showToast("Invalid file format. Upload PDF only! ❌");
            return;
        }
        rawPdfBuffer = await file.arrayBuffer();
        rawPdfName = file.name;

        pdfCompOrigSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        
        const preset = pdfCompLevel.value;
        let scaleRatio = 0.92;
        if (preset === "medium") scaleRatio = 0.70;
        if (preset === "high") scaleRatio = 0.50;

        const estBytes = file.size * scaleRatio;
        pdfCompNewSize.textContent = `${(estBytes / 1024).toFixed(1)} KB`;
        pdfCompRatio.textContent = `${((1 - scaleRatio) * 100).toFixed(0)}%`;

        pdfCompInfo.style.display = "flex";
        pdfCompDownloadBtn.disabled = false;
    }

    if (pdfCompLevel) {
        pdfCompLevel.addEventListener("change", () => {
            if (!rawPdfBuffer) return;
            const preset = pdfCompLevel.value;
            let scaleRatio = 0.92;
            if (preset === "medium") scaleRatio = 0.70;
            if (preset === "high") scaleRatio = 0.50;

            const origBytes = rawPdfBuffer.byteLength;
            const estBytes = origBytes * scaleRatio;
            pdfCompNewSize.textContent = `${(estBytes / 1024).toFixed(1)} KB`;
            pdfCompRatio.textContent = `${((1 - scaleRatio) * 100).toFixed(0)}%`;
        });
    }

    if (pdfCompDownloadBtn) {
        pdfCompDownloadBtn.addEventListener("click", async () => {
            if (!rawPdfBuffer) return;
            pdfCompDownloadBtn.disabled = true;
            pdfCompDownloadBtn.textContent = "⌛ Compressing PDF...";

            try {
                const pdfDoc = await PDFLib.PDFDocument.load(rawPdfBuffer);
                const compressedBytes = await pdfDoc.save({
                    useObjectStreams: true,
                    addCompatibleWith: 'pdf1.4'
                });

                const blob = new Blob([compressedBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Compressed_${rawPdfName}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("PDF compressed & downloaded successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error compressing PDF file. ❌");
            } finally {
                pdfCompDownloadBtn.disabled = false;
                pdfCompDownloadBtn.textContent = "⚡ Compress & Download";
            }
        });
    }

    // ================= PROTECT PDF =================
    const pdfProtDropzone = document.getElementById("pdfprotect-dropzone");
    const pdfProtFile = document.getElementById("pdfprotect-file");
    const pdfProtInfo = document.getElementById("pdfprotect-info");
    const pdfProtPass = document.getElementById("pdfprotect-pass");
    const pdfProtConfirm = document.getElementById("pdfprotect-confirm");
    const pdfProtDownloadBtn = document.getElementById("pdfprotect-download-btn");

    let rawProtPdfBuffer = null;
    let rawProtPdfName = "";

    if (pdfProtDropzone && pdfProtFile) {
        pdfProtDropzone.addEventListener("click", () => pdfProtFile.click());
        pdfProtDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            pdfProtDropzone.style.borderColor = "var(--indigo)";
        });
        pdfProtDropzone.addEventListener("dragleave", () => {
            pdfProtDropzone.style.borderColor = "var(--border-color)";
        });
        pdfProtDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfProtDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadPdfProtFile(e.dataTransfer.files[0]);
            }
        });
        pdfProtFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadPdfProtFile(e.target.files[0]);
            }
        });
    }

    async function loadPdfProtFile(file) {
        if (file.type !== "application/pdf") {
            showToast("Invalid file format. Upload PDF only! ❌");
            return;
        }
        rawProtPdfBuffer = await file.arrayBuffer();
        rawProtPdfName = file.name;
        pdfProtInfo.style.display = "block";
        pdfProtDownloadBtn.disabled = false;
    }

    if (pdfProtDownloadBtn) {
        pdfProtDownloadBtn.addEventListener("click", async () => {
            if (!rawProtPdfBuffer) return;
            const passVal = pdfProtPass.value;
            const confirmVal = pdfProtConfirm.value;

            if (!passVal) {
                showToast("Please enter security password! ❌");
                return;
            }
            if (passVal !== confirmVal) {
                showToast("Passwords do not match! ❌");
                return;
            }

            pdfProtDownloadBtn.disabled = true;
            pdfProtDownloadBtn.textContent = "⌛ Securing Document...";

            try {
                // Dynamically import client-side PDF encryption module
                const { encryptPDF } = await import('https://cdn.jsdelivr.net/npm/@pdfsmaller/pdf-encrypt-lite/+esm');
                
                // Encrypt PDF bytes locally
                const securedBytes = await encryptPDF(new Uint8Array(rawProtPdfBuffer), passVal, passVal);
                
                const blob = new Blob([securedBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Protected_${rawProtPdfName}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Password protected PDF generated successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error securing PDF document. ❌");
            } finally {
                pdfProtDownloadBtn.disabled = false;
                pdfProtDownloadBtn.textContent = "⚡ Encrypt & Download";
            }
        });
    }

    // ================= DIGITAL SIGNATURE =================
    const digiDocDropzone = document.getElementById("digisign-doc-dropzone");
    const digiDocFile = document.getElementById("digisign-doc-file");
    const digiWorkspace = document.getElementById("digisign-workspace");
    const digiPreviewCanvas = document.getElementById("digisign-preview-canvas");
    const digiPlaceholder = document.getElementById("digisign-placeholder");
    const digiOverlay = document.getElementById("digisign-signature-overlay");
    const digiOverlayImg = document.getElementById("digisign-overlay-img");
    const digiSigPad = document.getElementById("digisign-signature-pad");
    const digiClearPad = document.getElementById("digisign-clear-pad");
    const digiSigFile = document.getElementById("digisign-sig-file");
    const digiApplySigBtn = document.getElementById("digisign-apply-sig");
    const digiDownloadBtn = document.getElementById("digisign-download-btn");

    let loadedDocFile = null;
    let signatureImgDataUrl = null;
    let isDrawingSignature = false;
    let workspaceCanvasCtx = digiPreviewCanvas ? digiPreviewCanvas.getContext("2d") : null;
    let signaturePadCtx = digiSigPad ? digiSigPad.getContext("2d") : null;
    let currentPdfPage = null;
    let currentPdfViewport = null;
    const digiDownloadSigBtn = document.getElementById("digisign-download-sig");

    if (digiSigPad) {
        digiSigPad.width = digiSigPad.offsetWidth || 300;
        digiSigPad.height = digiSigPad.offsetHeight || 150;
        signaturePadCtx.strokeStyle = "#000000";
        signaturePadCtx.lineWidth = 3;
        signaturePadCtx.lineCap = "round";
        signaturePadCtx.lineJoin = "round";

        const getPos = (e) => {
            const rect = digiSigPad.getBoundingClientRect();
            if (e.touches && e.touches.length) {
                return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
            }
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const drawStart = (e) => {
            e.preventDefault();
            if (digiSigPad.width === 0 || digiSigPad.height === 0 || digiSigPad.width === 300) {
                const currentWidth = digiSigPad.offsetWidth || 300;
                const currentHeight = digiSigPad.offsetHeight || 150;
                if (digiSigPad.width !== currentWidth || digiSigPad.height !== currentHeight) {
                    digiSigPad.width = currentWidth;
                    digiSigPad.height = currentHeight;
                    signaturePadCtx.strokeStyle = "#000000";
                    signaturePadCtx.lineWidth = 3;
                    signaturePadCtx.lineCap = "round";
                    signaturePadCtx.lineJoin = "round";
                }
            }
            isDrawingSignature = true;
            const pos = getPos(e);
            signaturePadCtx.beginPath();
            signaturePadCtx.moveTo(pos.x, pos.y);
            digiApplySigBtn.disabled = false;
            if (digiDownloadSigBtn) digiDownloadSigBtn.disabled = false;
        };

        const drawMove = (e) => {
            if (!isDrawingSignature) return;
            e.preventDefault();
            const pos = getPos(e);
            signaturePadCtx.lineTo(pos.x, pos.y);
            signaturePadCtx.stroke();
        };

        const drawEnd = () => {
            isDrawingSignature = false;
        };

        digiSigPad.addEventListener("mousedown", drawStart);
        digiSigPad.addEventListener("mousemove", drawMove);
        window.addEventListener("mouseup", drawEnd);

        digiSigPad.addEventListener("touchstart", drawStart, { passive: false });
        digiSigPad.addEventListener("touchmove", drawMove, { passive: false });
        window.addEventListener("touchend", drawEnd);
    }

    if (digiDownloadSigBtn) {
        digiDownloadSigBtn.addEventListener("click", () => {
            let dataUrl = signatureImgDataUrl;
            if (!dataUrl && digiSigPad) {
                dataUrl = digiSigPad.toDataURL("image/png");
            }
            if (!dataUrl) return;
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = `Signature_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            showToast("Raw signature image downloaded! 📁");
        });
    }

    if (digiClearPad) {
        digiClearPad.addEventListener("click", () => {
            signaturePadCtx.clearRect(0, 0, digiSigPad.width, digiSigPad.height);
            digiApplySigBtn.disabled = true;
            if (digiDownloadSigBtn) digiDownloadSigBtn.disabled = true;
            signatureImgDataUrl = null;
        });
    }

    if (digiSigFile) {
        digiSigFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    signatureImgDataUrl = ev.target.result;
                    digiApplySigBtn.disabled = false;
                    if (digiDownloadSigBtn) digiDownloadSigBtn.disabled = false;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    if (digiDocDropzone && digiDocFile) {
        digiDocDropzone.addEventListener("click", () => digiDocFile.click());
        digiDocDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            digiDocDropzone.style.borderColor = "var(--indigo)";
        });
        digiDocDropzone.addEventListener("dragleave", () => {
            digiDocDropzone.style.borderColor = "var(--border-color)";
        });
        digiDocDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            digiDocDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadSignatureDoc(e.dataTransfer.files[0]);
            }
        });
        digiDocFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadSignatureDoc(e.target.files[0]);
            }
        });
    }

    let loadedDocImg = null;
    let isPdfDoc = false;

    async function loadSignatureDoc(file) {
        loadedDocFile = file;
        digiPlaceholder.style.display = "none";
        digiWorkspace.style.display = "block";
        digiDownloadBtn.disabled = false;
        isPdfDoc = file.type === "application/pdf";

        if (isPdfDoc) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const page = await doc.getPage(1);
                const viewport = page.getViewport({ scale: 1.5 });
                currentPdfPage = page;
                currentPdfViewport = viewport;
                digiPreviewCanvas.width = viewport.width;
                digiPreviewCanvas.height = viewport.height;
                await page.render({ canvasContext: workspaceCanvasCtx, viewport: viewport }).promise;
            } catch (err) {
                console.error(err);
                showToast("Error loading PDF document. ❌");
            }
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                loadedDocImg = new Image();
                loadedDocImg.onload = () => {
                    digiPreviewCanvas.width = loadedDocImg.naturalWidth;
                    digiPreviewCanvas.height = loadedDocImg.naturalHeight;
                    workspaceCanvasCtx.drawImage(loadedDocImg, 0, 0);
                };
                loadedDocImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    if (digiApplySigBtn) {
        digiApplySigBtn.addEventListener("click", () => {
            if (!signatureImgDataUrl) {
                signatureImgDataUrl = digiSigPad.toDataURL("image/png");
            }
            digiOverlayImg.src = signatureImgDataUrl;
            digiOverlay.style.display = "block";
            digiOverlay.style.top = "50px";
            digiOverlay.style.left = "50px";
            digiOverlay.style.width = "150px";
            digiOverlay.style.height = "75px";
        });
    }

    let isDraggingOverlay = false;
    let isResizingOverlay = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;
    let startLeft = 0, startTop = 0;

    if (digiOverlay) {
        digiOverlay.addEventListener("mousedown", (e) => {
            const rect = digiOverlay.getBoundingClientRect();
            const resizeHandleSize = 16;
            const isNearBottomRight = (e.clientX - rect.left > rect.width - resizeHandleSize) &&
                                      (e.clientY - rect.top > rect.height - resizeHandleSize);
            
            if (isNearBottomRight) {
                isResizingOverlay = true;
                startWidth = parseFloat(digiOverlay.style.width);
                startHeight = parseFloat(digiOverlay.style.height);
                startX = e.clientX;
                startY = e.clientY;
            } else {
                isDraggingOverlay = true;
                startLeft = parseFloat(digiOverlay.style.left) || 0;
                startTop = parseFloat(digiOverlay.style.top) || 0;
                startX = e.clientX;
                startY = e.clientY;
            }
        });

        digiOverlay.addEventListener("touchstart", (e) => {
            const rect = digiOverlay.getBoundingClientRect();
            const touch = e.touches[0];
            const resizeHandleSize = 24;
            const isNearBottomRight = (touch.clientX - rect.left > rect.width - resizeHandleSize) &&
                                      (touch.clientY - rect.top > rect.height - resizeHandleSize);
            
            if (isNearBottomRight) {
                isResizingOverlay = true;
                startWidth = parseFloat(digiOverlay.style.width);
                startHeight = parseFloat(digiOverlay.style.height);
                startX = touch.clientX;
                startY = touch.clientY;
            } else {
                isDraggingOverlay = true;
                startLeft = parseFloat(digiOverlay.style.left) || 0;
                startTop = parseFloat(digiOverlay.style.top) || 0;
                startX = touch.clientX;
                startY = touch.clientY;
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (isDraggingOverlay) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                digiOverlay.style.left = `${startLeft + dx}px`;
                digiOverlay.style.top = `${startTop + dy}px`;
            } else if (isResizingOverlay) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                digiOverlay.style.width = `${Math.max(50, startWidth + dx)}px`;
                digiOverlay.style.height = `${Math.max(25, startHeight + dy)}px`;
            }
        });

        window.addEventListener("touchmove", (e) => {
            if (isDraggingOverlay) {
                const touch = e.touches[0];
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;
                digiOverlay.style.left = `${startLeft + dx}px`;
                digiOverlay.style.top = `${startTop + dy}px`;
            } else if (isResizingOverlay) {
                const touch = e.touches[0];
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;
                digiOverlay.style.width = `${Math.max(50, startWidth + dx)}px`;
                digiOverlay.style.height = `${Math.max(25, startHeight + dy)}px`;
            }
        });

        const stopInteraction = () => {
            isDraggingOverlay = false;
            isResizingOverlay = false;
        };

        window.addEventListener("mouseup", stopInteraction);
        window.addEventListener("touchend", stopInteraction);
    }

    if (digiDownloadBtn) {
        digiDownloadBtn.addEventListener("click", () => {
            if (!loadedDocFile) return;

            const img = new Image();
            img.onload = async () => {
                const left = parseFloat(digiOverlay.style.left) || 0;
                const top = parseFloat(digiOverlay.style.top) || 0;
                const width = parseFloat(digiOverlay.style.width) || 150;
                const height = parseFloat(digiOverlay.style.height) || 75;

                // Clear and redraw background cleanly first
                if (isPdfDoc && currentPdfPage && currentPdfViewport) {
                    workspaceCanvasCtx.clearRect(0, 0, digiPreviewCanvas.width, digiPreviewCanvas.height);
                    await currentPdfPage.render({ canvasContext: workspaceCanvasCtx, viewport: currentPdfViewport }).promise;
                } else if (loadedDocImg) {
                    workspaceCanvasCtx.clearRect(0, 0, digiPreviewCanvas.width, digiPreviewCanvas.height);
                    workspaceCanvasCtx.drawImage(loadedDocImg, 0, 0);
                }
                
                // Scale overlay coordinates correctly based on canvas display vs natural size
                const rect = digiPreviewCanvas.getBoundingClientRect();
                const scaleX = digiPreviewCanvas.width / rect.width;
                const scaleY = digiPreviewCanvas.height / rect.height;

                const drawX = left * scaleX;
                const drawY = top * scaleY;
                const drawW = width * scaleX;
                const drawH = height * scaleY;

                workspaceCanvasCtx.drawImage(img, drawX, drawY, drawW, drawH);

                digiPreviewCanvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `Signed_${loadedDocFile.name.split('.')[0]}.png`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast("Signed document saved & downloaded successfully! ✅");
                }, "image/png");
            };
            img.src = signatureImgDataUrl;
        });
    }

    // ================= WATERMARK IMAGE =================
    const wmDropzone = document.getElementById("imgwatermark-dropzone");
    const wmFile = document.getElementById("imgwatermark-file");
    const wmCanvas = document.getElementById("imgwatermark-canvas");
    const wmPlaceholder = document.getElementById("imgwatermark-placeholder");
    const wmType = document.getElementById("imgwatermark-type");
    const wmTextSettings = document.getElementById("imgwatermark-text-settings");
    const wmTxt = document.getElementById("imgwatermark-txt");
    const wmSize = document.getElementById("imgwatermark-size");
    const wmColor = document.getElementById("imgwatermark-color");
    const wmImgSettings = document.getElementById("imgwatermark-img-settings");
    const wmLogoFile = document.getElementById("imgwatermark-logo-file");
    const wmPosition = document.getElementById("imgwatermark-position");
    const wmOpacity = document.getElementById("imgwatermark-opacity");
    const wmRotation = document.getElementById("imgwatermark-rotation");
    const wmDownloadBtn = document.getElementById("imgwatermark-download-btn");

    let wmBaseImg = null;
    let wmLogoImg = null;
    let wmCtx = wmCanvas ? wmCanvas.getContext("2d") : null;

    if (wmDropzone && wmFile) {
        wmDropzone.addEventListener("click", () => wmFile.click());
        wmDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            wmDropzone.style.borderColor = "var(--indigo)";
        });
        wmDropzone.addEventListener("dragleave", () => {
            wmDropzone.style.borderColor = "var(--border-color)";
        });
        wmDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            wmDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadWatermarkBaseImg(e.dataTransfer.files[0]);
            }
        });
        wmFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadWatermarkBaseImg(e.target.files[0]);
            }
        });
    }

    function loadWatermarkBaseImg(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            wmBaseImg = new Image();
            wmBaseImg.onload = () => {
                wmCanvas.style.display = "block";
                wmPlaceholder.style.display = "none";
                wmDownloadBtn.disabled = false;
                applyWatermark();
            };
            wmBaseImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    if (wmType) {
        wmType.addEventListener("change", () => {
            if (wmType.value === "text") {
                wmTextSettings.style.display = "flex";
                wmImgSettings.style.display = "none";
            } else {
                wmTextSettings.style.display = "none";
                wmImgSettings.style.display = "flex";
            }
            applyWatermark();
        });
    }

    if (wmLogoFile) {
        wmLogoFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    wmLogoImg = new Image();
                    wmLogoImg.onload = () => {
                        applyWatermark();
                    };
                    wmLogoImg.src = ev.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    [wmTxt, wmSize, wmColor, wmPosition, wmOpacity, wmRotation].forEach(elem => {
        if (elem) elem.addEventListener("input", applyWatermark);
        if (elem) elem.addEventListener("change", applyWatermark);
    });

    function applyWatermark() {
        if (!wmBaseImg) return;

        wmCanvas.width = wmBaseImg.naturalWidth;
        wmCanvas.height = wmBaseImg.naturalHeight;
        
        wmCtx.clearRect(0, 0, wmCanvas.width, wmCanvas.height);
        wmCtx.drawImage(wmBaseImg, 0, 0);

        const type = wmType.value;
        const pos = wmPosition.value;
        const opacity = parseFloat(wmOpacity.value) || 0.3;
        const rotation = (parseFloat(wmRotation.value) || 0) * Math.PI / 180;

        wmCtx.save();
        wmCtx.globalAlpha = opacity;

        let x = wmCanvas.width / 2;
        let y = wmCanvas.height / 2;

        if (pos === "top-left") {
            x = wmCanvas.width * 0.15;
            y = wmCanvas.height * 0.15;
        } else if (pos === "top-right") {
            x = wmCanvas.width * 0.85;
            y = wmCanvas.height * 0.15;
        } else if (pos === "bottom-left") {
            x = wmCanvas.width * 0.15;
            y = wmCanvas.height * 0.85;
        } else if (pos === "bottom-right") {
            x = wmCanvas.width * 0.85;
            y = wmCanvas.height * 0.85;
        }

        if (type === "text") {
            const text = wmTxt.value || "WATERMARK";
            const fontSize = parseInt(wmSize.value) || 48;
            const color = wmColor.value || "#ffffff";

            wmCtx.translate(x, y);
            wmCtx.rotate(rotation);
            wmCtx.font = `bold ${fontSize}px var(--font-body)`;
            wmCtx.fillStyle = color;
            wmCtx.textAlign = "center";
            wmCtx.textBaseline = "middle";

            if (pos === "tile") {
                wmCtx.restore();
                wmCtx.save();
                wmCtx.globalAlpha = opacity;
                wmCtx.fillStyle = color;
                wmCtx.font = `bold ${fontSize}px var(--font-body)`;
                wmCtx.textAlign = "center";
                wmCtx.textBaseline = "middle";

                const stepX = wmCanvas.width / 3;
                const stepY = wmCanvas.height / 3;
                for (let px = stepX / 2; px < wmCanvas.width; px += stepX) {
                    for (let py = stepY / 2; py < wmCanvas.height; py += stepY) {
                        wmCtx.save();
                        wmCtx.translate(px, py);
                        wmCtx.rotate(rotation);
                        wmCtx.fillText(text, 0, 0);
                        wmCtx.restore();
                    }
                }
            } else {
                wmCtx.fillText(text, 0, 0);
            }
        } else if (type === "image" && wmLogoImg) {
            const logoW = wmCanvas.width * 0.2;
            const logoH = logoW * (wmLogoImg.naturalHeight / wmLogoImg.naturalWidth);

            wmCtx.translate(x, y);
            wmCtx.rotate(rotation);

            if (pos === "tile") {
                wmCtx.restore();
                wmCtx.save();
                wmCtx.globalAlpha = opacity;
                const stepX = wmCanvas.width / 3;
                const stepY = wmCanvas.height / 3;
                for (let px = stepX / 2; px < wmCanvas.width; px += stepX) {
                    for (let py = stepY / 2; py < wmCanvas.height; py += stepY) {
                        wmCtx.save();
                        wmCtx.translate(px, py);
                        wmCtx.rotate(rotation);
                        wmCtx.drawImage(wmLogoImg, -logoW / 2, -logoH / 2, logoW, logoH);
                        wmCtx.restore();
                    }
                }
            } else {
                wmCtx.drawImage(wmLogoImg, -logoW / 2, -logoH / 2, logoW, logoH);
            }
        }

        wmCtx.restore();
    }

    if (wmDownloadBtn) {
        wmDownloadBtn.addEventListener("click", () => {
            wmCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Utilify_Watermarked_Image.png";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Watermarked image downloaded successfully! ✅");
            }, "image/png");
        });
    }

    // ================= HTML TO PDF =================
    const htmlToPdfCode = document.getElementById("htmltopdf-code");
    const htmlToPdfSize = document.getElementById("htmltopdf-size");
    const htmlToPdfMargin = document.getElementById("htmltopdf-margin");
    const htmlToPdfDownloadBtn = document.getElementById("htmltopdf-download-btn");

    if (htmlToPdfDownloadBtn) {
        htmlToPdfDownloadBtn.addEventListener("click", async () => {
            const htmlContent = htmlToPdfCode.value || "";
            if (!htmlContent.trim()) {
                showToast("Please enter HTML code! ❌");
                return;
            }

            htmlToPdfDownloadBtn.disabled = true;
            htmlToPdfDownloadBtn.textContent = "⌛ Compiling PDF...";

            try {
                const sandbox = document.createElement("div");
                sandbox.style.position = "absolute";
                sandbox.style.left = "-9999px";
                sandbox.style.top = "0";
                sandbox.style.width = "794px";
                sandbox.style.background = "#ffffff";
                sandbox.style.color = "#000000";
                sandbox.innerHTML = htmlContent;
                document.body.appendChild(sandbox);

                await new Promise(resolve => setTimeout(resolve, 500));

                const canvas = await html2canvas(sandbox, {
                    scale: 2,
                    useCORS: true
                });
                document.body.removeChild(sandbox);

                const { jsPDF } = window.jspdf;
                const pdfSize = htmlToPdfSize.value;
                const marginVal = parseInt(htmlToPdfMargin.value) || 10;
                
                const doc = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: pdfSize === "letter" ? "letter" : "a4"
                });

                const pageWidth = doc.internal.pageSize.getWidth();
                const contentW = pageWidth - marginVal * 2;
                const contentH = (canvas.height * contentW) / canvas.width;

                const imgData = canvas.toDataURL("image/png");
                doc.addImage(imgData, "PNG", marginVal, marginVal, contentW, contentH);
                
                doc.save("Utilify_Rendered_Document.pdf");
                showToast("HTML converted to PDF successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error compiling HTML to PDF. ❌");
            } finally {
                htmlToPdfDownloadBtn.disabled = false;
                htmlToPdfDownloadBtn.textContent = "⚡ Convert & Download PDF";
            }
        });
    }

    // ================= HTML TO IMAGE =================
    const htmlToImgCode = document.getElementById("htmltoimage-code");
    const htmlToImgFormat = document.getElementById("htmltoimage-format");
    const htmlToImgDownloadBtn = document.getElementById("htmltoimage-download-btn");

    if (htmlToImgDownloadBtn) {
        htmlToImgDownloadBtn.addEventListener("click", async () => {
            const htmlContent = htmlToImgCode.value || "";
            if (!htmlContent.trim()) {
                showToast("Please enter HTML code! ❌");
                return;
            }

            htmlToImgDownloadBtn.disabled = true;
            htmlToImgDownloadBtn.textContent = "⌛ Compiling Image...";

            try {
                const sandbox = document.createElement("div");
                sandbox.style.position = "absolute";
                sandbox.style.left = "-9999px";
                sandbox.style.top = "0";
                sandbox.style.background = "transparent";
                sandbox.innerHTML = htmlContent;
                document.body.appendChild(sandbox);

                await new Promise(resolve => setTimeout(resolve, 500));

                const canvas = await html2canvas(sandbox, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: null
                });
                document.body.removeChild(sandbox);

                const format = htmlToImgFormat.value;
                const ext = format === "image/png" ? "png" : "jpg";

                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `Utilify_Rendered_Layout.${ext}`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    showToast("HTML converted to Image successfully! ✅");
                }, format);

            } catch (err) {
                console.error(err);
                showToast("Error rendering HTML to Image. ❌");
            } finally {
                htmlToImgDownloadBtn.disabled = false;
                htmlToImgDownloadBtn.textContent = "⚡ Convert & Download Image";
            }
        });
    }

    // ================= UNLOCK PDF =================
    const pdfUnlDropzone = document.getElementById("pdfunlock-dropzone");
    const pdfUnlFile = document.getElementById("pdfunlock-file");
    const pdfUnlInfo = document.getElementById("pdfunlock-info");
    const pdfUnlPass = document.getElementById("pdfunlock-pass");
    const pdfUnlDownloadBtn = document.getElementById("pdfunlock-download-btn");

    let rawUnlPdfBuffer = null;
    let rawUnlPdfName = "";

    if (pdfUnlDropzone && pdfUnlFile) {
        pdfUnlDropzone.addEventListener("click", () => pdfUnlFile.click());
        pdfUnlDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            pdfUnlDropzone.style.borderColor = "var(--indigo)";
        });
        pdfUnlDropzone.addEventListener("dragleave", () => {
            pdfUnlDropzone.style.borderColor = "var(--border-color)";
        });
        pdfUnlDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfUnlDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadPdfUnlFile(e.dataTransfer.files[0]);
            }
        });
        pdfUnlFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadPdfUnlFile(e.target.files[0]);
            }
        });
    }

    async function loadPdfUnlFile(file) {
        if (file.type !== "application/pdf") {
            showToast("Invalid file format. Upload PDF only! ❌");
            return;
        }
        rawUnlPdfBuffer = await file.arrayBuffer();
        rawUnlPdfName = file.name;
        pdfUnlInfo.style.display = "block";
        pdfUnlDownloadBtn.disabled = false;
    }

    if (pdfUnlDownloadBtn) {
        pdfUnlDownloadBtn.addEventListener("click", async () => {
            if (!rawUnlPdfBuffer) return;
            const passVal = pdfUnlPass.value;

            pdfUnlDownloadBtn.disabled = true;
            pdfUnlDownloadBtn.textContent = "⌛ Decrypting PDF...";

            try {
                const pdfDoc = await PDFLib.PDFDocument.load(rawUnlPdfBuffer, {
                    password: passVal
                });

                const unlockedBytes = await pdfDoc.save();

                const blob = new Blob([unlockedBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Unlocked_${rawUnlPdfName}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("PDF unlocked & decrypted successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Incorrect password or decryption error. ❌");
            } finally {
                pdfUnlDownloadBtn.disabled = false;
                pdfUnlDownloadBtn.textContent = "⚡ Remove Password & Download";
            }
        });
    }

    // ================= REMOVE PDF PAGES =================
    const pdfRemDropzone = document.getElementById("pdfremove-dropzone");
    const pdfRemFile = document.getElementById("pdfremove-file");
    const pdfRemInfo = document.getElementById("pdfremove-info");
    const pdfRemName = document.getElementById("pdfremove-name");
    const pdfRemTotal = document.getElementById("pdfremove-pages-total");
    const pdfRemRange = document.getElementById("pdfremove-range");
    const pdfRemDownloadBtn = document.getElementById("pdfremove-download-btn");

    let rawRemPdfBuffer = null;
    let rawRemPdfName = "";
    let remPdfPageCount = 0;

    if (pdfRemDropzone && pdfRemFile) {
        pdfRemDropzone.addEventListener("click", () => pdfRemFile.click());
        pdfRemDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            pdfRemDropzone.style.borderColor = "var(--indigo)";
        });
        pdfRemDropzone.addEventListener("dragleave", () => {
            pdfRemDropzone.style.borderColor = "var(--border-color)";
        });
        pdfRemDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            pdfRemDropzone.style.borderColor = "var(--border-color)";
            if (e.dataTransfer.files.length) {
                loadPdfRemFile(e.dataTransfer.files[0]);
            }
        });
        pdfRemFile.addEventListener("change", (e) => {
            if (e.target.files.length) {
                loadPdfRemFile(e.target.files[0]);
            }
        });
    }

    async function loadPdfRemFile(file) {
        if (file.type !== "application/pdf") {
            showToast("Invalid file format. Upload PDF only! ❌");
            return;
        }
        try {
            rawRemPdfBuffer = await file.arrayBuffer();
            rawRemPdfName = file.name;

            const pdfDoc = await PDFLib.PDFDocument.load(rawRemPdfBuffer);
            remPdfPageCount = pdfDoc.getPageCount();

            pdfRemName.textContent = rawRemPdfName;
            pdfRemTotal.textContent = `${remPdfPageCount} pages`;

            pdfRemInfo.style.display = "flex";
            pdfRemDownloadBtn.disabled = false;
        } catch (err) {
            console.error(err);
            showToast("Error parsing PDF metadata. ❌");
        }
    }

    if (pdfRemDownloadBtn) {
        pdfRemDownloadBtn.addEventListener("click", async () => {
            if (!rawRemPdfBuffer) return;
            const rangeStr = pdfRemRange.value || "";

            if (!rangeStr.trim()) {
                showToast("Please enter page numbers to remove! ❌");
                return;
            }

            const pagesToRemove = new Set();
            const parts = rangeStr.split(",");
            for (let part of parts) {
                part = part.trim();
                if (part.includes("-")) {
                    const rangeParts = part.split("-");
                    const start = parseInt(rangeParts[0].trim());
                    const end = parseInt(rangeParts[1].trim());
                    if (!isNaN(start) && !isNaN(end)) {
                        const min = Math.min(start, end);
                        const max = Math.max(start, end);
                        for (let p = min; p <= max; p++) {
                            pagesToRemove.add(p);
                        }
                    }
                } else {
                    const p = parseInt(part);
                    if (!isNaN(p)) {
                        pagesToRemove.add(p);
                    }
                }
            }

            if (pagesToRemove.size === 0) {
                showToast("No valid page numbers found in range input. ❌");
                return;
            }

            pdfRemDownloadBtn.disabled = true;
            pdfRemDownloadBtn.textContent = "⌛ Removing Pages...";

            try {
                const pdfDoc = await PDFLib.PDFDocument.load(rawRemPdfBuffer);
                const totalPages = pdfDoc.getPageCount();

                const indicesToRemove = Array.from(pagesToRemove)
                    .map(p => p - 1)
                    .filter(idx => idx >= 0 && idx < totalPages)
                    .sort((a, b) => b - a);

                if (indicesToRemove.length === 0) {
                    showToast("No matching page indices found. ❌");
                    return;
                }

                if (indicesToRemove.length === totalPages) {
                    showToast("Cannot remove all pages from PDF! ❌");
                    return;
                }

                indicesToRemove.forEach(idx => {
                    pdfDoc.removePage(idx);
                });

                const modifiedBytes = await pdfDoc.save();
                const blob = new Blob([modifiedBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Removed_Pages_${rawRemPdfName}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                showToast("Selected pages removed successfully! ✅");
            } catch (err) {
                console.error(err);
                showToast("Error processing page removal. ❌");
            } finally {
                pdfRemDownloadBtn.disabled = false;
                pdfRemDownloadBtn.textContent = "⚡ Remove Pages & Download";
            }
        });
    }

    // ================= INITIALIZE ON LOAD =================
    updateSocialPreviews();
    updateCounters();
    handleRouting();
});
