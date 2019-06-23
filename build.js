const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');
const media = require('./media.json');

const photos = media.photos.filter((photo) => {
  const inputPath = `src/${photo.path}`;
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Source path not found: "${inputPath}".`);
  }
  return true;
});

(async () => {

  for (let photo of photos) {
    const inputPath = `src/${photo.path}`;
    const input = fs.readFileSync(inputPath);
    const year = photo.path.match(/^(\d\d\d\d)\//)[1];
    const basename = path.basename(inputPath, path.extname(inputPath));

    if (!fs.existsSync(`dist/${year}`)) {
      fs.mkdirSync(`dist/${year}`);
    }

    for (let res of [128, 640, 1280, 2880]) {
      const jpgOutputFilename = `dist/${year}/${basename}_${res}.jpg`;
      const webpOutputFilename = `dist/${year}/${basename}_${res}.webp`;

      if (fs.existsSync(jpgOutputFilename)) break;

      console.log(`writing... ${basename}`);

      await sharp(input)
        .resize(res)
        .toFile(jpgOutputFilename);

      await sharp(input)
        .resize(res)
        .toFile(webpOutputFilename);

    }

  }

  console.info(' 🍺  Done.');

})();

