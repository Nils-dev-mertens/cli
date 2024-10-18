import si from "systeminformation";
import fs from "fs/promises";
export default async function createdata() {
  let cpu = await si.cpu()
  .then(data => {return data})
  .catch(error => console.error(error));
let gpu = await si.graphics()
  .then(data => {return data.controllers[0]})
  .catch(error => console.error(error));
let os = await si.osInfo()
  .then(data => {return data})
  .catch(error => console.error(error));
let battery = await si.battery()
  .then(data => {return data})
  .catch(error => console.error(error));
  // let network = await si.networkInterfaces()
  // .then(data => {return data})
  // .catch(error => console.error(error));
const arr = [cpu, gpu, os, battery];
arr.forEach(element => {
  console.log(element);
});
fs.writeFile("data.json", JSON.stringify(arr, null, 2));
}
createdata();