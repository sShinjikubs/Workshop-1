const { removeBackground } = require('@imgly/background-removal-node');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const bDir = 'c:/Users/gusbo/OneDrive/Desktop/Workshop1/backend/public/images/audio';
const fDir = 'c:/Users/gusbo/OneDrive/Desktop/Workshop1/frontend/public/images/audio';

const dbData = JSON.parse(fs.readFileSync('c:/Users/gusbo/OneDrive/Desktop/Workshop1/backend/db.json', 'utf8'));

async function removeBackgrounds() {
  for (const prod of dbData.products) {
    const imgPath = path.join(bDir, path.basename(prod.image));
    
    if (!fs.existsSync(imgPath)) {
      console.log(`Skipping ${prod.name}: not found`);
      continue;
    }
    const size = fs.statSync(imgPath).size;
    if (size < 1000) {
      console.log(`Skipping ${prod.name}: too small (SVG)`);
      continue;
    }

    try {
      console.log(`Processing: ${prod.name}...`);
      
      // Convert to JPEG buffer using sharp first (ensure supported format)
      const jpegBuffer = await sharp(imgPath)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 92 })
        .toBuffer();
      
      const blob = new Blob([jpegBuffer], { type: 'image/jpeg' });
      
      const result = await removeBackground(blob, {
        output: { format: 'image/png', quality: 0.92 }
      });

      const arrayBuffer = await result.arrayBuffer();
      const outBuffer = Buffer.from(arrayBuffer);
      
      const baseName = path.basename(prod.image, path.extname(prod.image));
      const outName = baseName + '.png';
      const bOutPath = path.join(bDir, outName);
      const fOutPath = path.join(fDir, outName);
      
      fs.writeFileSync(bOutPath, outBuffer);
      fs.copyFileSync(bOutPath, fOutPath);
      console.log(`✓ Done: ${prod.name} → ${outName} (${Math.round(outBuffer.length/1024)}KB)`);
    } catch (err) {
      console.error(`✗ Error: ${prod.name}: ${err.message}`);
    }
  }
  console.log('\nAll done!');
}

removeBackgrounds().catch(console.error);
