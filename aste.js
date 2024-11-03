import sharp from 'sharp';
const path = './foto.jpg';
sharp(path)
  .raw() // Get raw pixel data in RGBA format
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const dens = "  Ñ@#W$9876543210?!abc;:+=-,._   ";
    const pixels = [];
    let string = "";
    
    for (let i = 0; i < data.length; i += channels) {
      const pixel = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: channels === 4 ? data[i + 3] : 255
      };

      // Add ASCII character to the row
      string += returncharacter(pixel.r, pixel.g, pixel.b, dens);

      // If string has reached the width of the image, print it and reset
      if (string.length >= width) {
        console.log(string);
        string = "";
      }

      pixels.push(pixel);
    }
    
    console.log("Image Width:", width);
    console.log("Image Height:", height);
    // console.log("Pixels:", pixels); // Logs an array of pixel data (optional)
  })
  .catch(err => {
    console.error("Error reading image data:", err);
  });

function returncharacter(r, g, b, dens) {
  const avg = (r + g + b) / 3;
  const index = Math.floor(avg / (255 / dens.length));
  return dens[index];
}
