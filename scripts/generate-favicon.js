/**
 * Script to generate favicon and icon files from SVG
 * Run: node scripts/generate-favicon.js
 * 
 * Requires: npm install sharp to-ico --save-dev
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp, toIco;
try {
  sharp = require('sharp');
  toIco = require('to-ico');
} catch (e) {
  console.error('Error: Required packages not installed. Please run: npm install sharp to-ico --save-dev');
  process.exit(1);
}

const svgPath = path.join(__dirname, '../app/icon.svg');
const appDir = path.join(__dirname, '../app');
const publicDir = path.join(__dirname, '../public');

// Read SVG
const svgBuffer = fs.readFileSync(svgPath);

async function generateIcons() {
  try {
    // Generate favicon.ico (16x16, 32x32, 48x48 sizes)
    const faviconSizes = [16, 32, 48];
    const faviconImages = await Promise.all(
      faviconSizes.map(size =>
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Create proper ICO file with multiple sizes
    const icoBuffer = await toIco(faviconImages);
    fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

    console.log('✓ Generated favicon.ico');

    // Generate icon-192.png
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));

    console.log('✓ Generated icon-192.png');

    // Generate icon-512.png
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));

    console.log('✓ Generated icon-512.png');

    console.log('\n✅ All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
