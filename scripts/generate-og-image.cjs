const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function generateOGImage() {
    const width = 1200;
    const height = 630;
    const rowSize = 1 + width * 4;
    const pixelData = Buffer.alloc(height * rowSize);

    // Color definitions
    // Background: dark gradient from #0b0f19 to #1e1b4b
    const cBgTop = [11, 15, 25];
    const cBgBottom = [30, 27, 75];
    
    // Indigo accent: #6366f1
    // Cyan accent: #38bdf8
    // Purple accent: #a855f7
    // White: #ffffff
    // Slate: #94a3b8

    for (let y = 0; y < height; y++) {
        const rowStart = y * rowSize;
        pixelData[rowStart] = 0; // Filter 0

        const tY = y / height;

        for (let x = 0; x < width; x++) {
            const pixelStart = rowStart + 1 + x * 4;
            const tX = x / width;

            // Base gradient
            let r = Math.round(cBgTop[0] + (cBgBottom[0] - cBgTop[0]) * (tY * 0.7 + tX * 0.3));
            let g = Math.round(cBgTop[1] + (cBgBottom[1] - cBgTop[1]) * (tY * 0.7 + tX * 0.3));
            let b = Math.round(cBgTop[2] + (cBgBottom[2] - cBgTop[2]) * (tY * 0.7 + tX * 0.3));

            // Subtle glowing orb in top-left and bottom-right
            const d1 = Math.hypot(x - 250, y - 180);
            if (d1 < 380) {
                const glow = (1 - d1 / 380) * 0.35;
                r = Math.min(255, Math.round(r + 99 * glow));
                g = Math.min(255, Math.round(g + 102 * glow));
                b = Math.min(255, Math.round(b + 241 * glow));
            }

            const d2 = Math.hypot(x - 950, y - 450);
            if (d2 < 350) {
                const glow = (1 - d2 / 350) * 0.25;
                r = Math.min(255, Math.round(r + 168 * glow));
                g = Math.min(255, Math.round(g + 85 * glow));
                b = Math.min(255, Math.round(b + 247 * glow));
            }

            // Outer decorative border
            if (x < 16 || x >= width - 16 || y < 16 || y >= height - 16) {
                r = 15; g = 23; b = 42;
            } else if (x === 16 || x === width - 17 || y === 16 || y === height - 17) {
                r = 99; g = 102; b = 241; // border accent
            }

            // Draw a central stylish icon badge (rounded box around x=140..260, y=240..360)
            const bX = 160;
            const bY = 250;
            const bSize = 120;
            if (x >= bX && x <= bX + bSize && y >= bY && y <= bY + bSize) {
                const cornerDist = Math.min(
                    Math.hypot(x - (bX + 24), y - (bY + 24)),
                    Math.hypot(x - (bX + bSize - 24), y - (bY + 24)),
                    Math.hypot(x - (bX + 24), y - (bY + bSize - 24)),
                    Math.hypot(x - (bX + bSize - 24), y - (bY + bSize - 24))
                );
                const isInside = (x >= bX + 24 && x <= bX + bSize - 24) || (y >= bY + 24 && y <= bY + bSize - 24) || cornerDist <= 24;
                if (isInside) {
                    // Badge gradient
                    r = 99; g = 102; b = 241;
                    
                    // White letter 'U' inside badge
                    const uLeft = bX + 38;
                    const uRight = bX + bSize - 38;
                    const uTop = bY + 32;
                    const uBottom = bY + bSize - 40;
                    const uStemW = 12;
                    const uCenter = (uLeft + uRight) / 2;
                    const uRadius = (uRight - uLeft) / 2;

                    const inLeftStem = (x >= uLeft && x <= uLeft + uStemW && y >= uTop && y <= uBottom);
                    const inRightStem = (x >= uRight - uStemW && x <= uRight && y >= uTop && y <= uBottom);
                    const dU = Math.hypot(x - uCenter, y - uBottom);
                    const inCurve = (y >= uBottom && dU >= (uRadius - uStemW) && dU <= uRadius);

                    if (inLeftStem || inRightStem || inCurve) {
                        r = 255; g = 255; b = 255;
                    }
                }
            }

            // Top decorative badge pill line (y: 130..160, x: 160..420)
            if (y >= 130 && y <= 162 && x >= 160 && x <= 460) {
                if (y === 130 || y === 162 || x === 160 || x === 460) {
                    r = 99; g = 102; b = 241;
                } else {
                    r = 30; g = 41; b = 59;
                }
            }

            pixelData[pixelStart] = r;
            pixelData[pixelStart + 1] = g;
            pixelData[pixelStart + 2] = b;
            pixelData[pixelStart + 3] = 255;
        }
    }

    // Build PNG format
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    const ihdr = Buffer.alloc(13);
    ihdr.writeInt32BE(width, 0);
    ihdr.writeInt32BE(height, 4);
    ihdr[8] = 8;  // bit depth
    ihdr[9] = 6;  // RGBA
    ihdr[10] = 0; // compression
    ihdr[11] = 0; // filter
    ihdr[12] = 0; // interlace
    const ihdrChunk = createChunk('IHDR', ihdr);

    const idatData = zlib.deflateSync(pixelData, { level: 6 });
    const idatChunk = createChunk('IDAT', idatData);

    const iendChunk = createChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crcVal = crc32(chunk.subarray(4, 8 + len));
    chunk.writeUInt32BE(crcVal, 8 + len);
    return chunk;
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
}

function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
        crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}

const publicPath = path.join(__dirname, '../public/og-image.png');
const rootPath = path.join(__dirname, '../og-image.png');

console.log('Generating 1200x630 OpenGraph social preview image...');
const png = generateOGImage();
fs.writeFileSync(publicPath, png);
fs.writeFileSync(rootPath, png);
console.log(`Saved og-image.png successfully (${(png.length / 1024).toFixed(1)} KB) to public/ and root!`);
