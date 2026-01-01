const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'dayroute-logo.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Create multiple sizes
const sizes = [
  { name: 'dayroute-logo.png', size: 512 },
  { name: 'dayroute-logo-1024.png', size: 1024 },
  { name: 'dayroute-logo-256.png', size: 256 },
  { name: 'dayroute-logo-128.png', size: 128 },
  { name: 'dayroute-logo-64.png', size: 64 },
];

async function convert() {
  for (const { name, size } of sizes) {
    const pngPath = path.join(__dirname, 'public', name);
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(pngPath);
    console.log(`Created: ${name} (${size}x${size})`);
  }
  
  // Also copy to assets folder
  const assetsPath = path.join(__dirname, '..', 'assets', 'dayroute-logo.png');
  await sharp(Buffer.from(svgContent))
    .resize(1024, 1024)
    .png()
    .toFile(assetsPath);
  console.log('Created: assets/dayroute-logo.png (1024x1024)');
}

convert();
