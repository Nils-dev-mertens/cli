import sharp from 'sharp';
const path = './foto.jpg';

sharp(path)
  .raw() // Get raw pixel data in RGBA format
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;

    // Convert data to a 2D array (optional)
    const pixels = [];
    for (let i = 0; i < data.length; i += channels) {
      const pixel = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: channels === 4 ? data[i + 3] : 255 // Default alpha to 255 if no alpha channel
      };
      pixels.push(pixel);
    }

    console.log("Image Width:", width);
    console.log("Image Height:", height);
    console.log("Pixels:", pixels); // Logs an array of pixel data
  })
  .catch(err => {
    console.error("Error reading image data:", err);
  });
