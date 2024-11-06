import sharp from 'sharp';
import fs from "fs/promises";
const path = './foto.jpg';
let locarr = [];
sharp(path)
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const dens = "  Ñ@#W$9876543210?!abc;:+=-,._   ";
    let string = "";
    for (let i = 0; i < data.length; i += channels) {
      const pixel = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: channels === 4 ? data[i + 3] : 255
      };
      string += returncharacter(pixel.r, pixel.g, pixel.b, dens);
      if (string.length >= width) {
        console.log(string);
        locarr.push(string);
        string = "";
      }
    }
    fs.writeFile("./ascii.json", JSON.stringify(locarr, null, 2));
  })
  .catch(err => {
    console.error("Error reading image data:", err);
  });
function returncharacter(r, g, b, dens) {
  const avg = (r + g + b) / 3;
  const index = Math.floor(avg / (255 / dens.length));
  return dens[index];
}