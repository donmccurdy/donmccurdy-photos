const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const fileMetadata = require('file-metadata');

glob('src/*.jpg', {}, async (_, photos) => {
  const media = [];

  for (const srcPath of photos) {
    const meta = await fileMetadata(srcPath);
    const input = fs.readFileSync(srcPath);
    const basename = path.basename(srcPath, path.extname(srcPath));

    // Generate JPG and WEBP images in various sizes.
    for (let res of [256, 640, 1280, 2880]) {
      const jpgOutputFilename = `dist/${basename}_${res}.jpg`;
      const webpOutputFilename = `dist/${basename}_${res}.webp`;

      if (fs.existsSync(jpgOutputFilename)) break;

      console.log(`writing... ${basename}@${res}px`);

      await sharp(input)
        .resize(res)
        .toFile(jpgOutputFilename);

      await sharp(input)
        .resize(res)
        .toFile(webpOutputFilename);
    }

    // Metadata.
    media.push({
      id: basename,
      title: meta.title,
      date: meta.contentCreationDate,
      copyright: meta.copyright,
      acquisitionMake: meta.acquisitionMake,
      acquisitionModel: meta.acquisitionModel,
      aperture: meta.aperture,
      exposureTimeSeconds: meta.exposureTimeSeconds,
    });
  }

  media.sort((a, b) => a.date > b.date ? 1 : -1);
  fs.writeFileSync('dist/media.json', JSON.stringify({photos: media}));

  console.info(' 🍺  Done.');
});
