import si from "systeminformation";
import fs from "fs/promises";
export default async function createdata() {
const cpu = await si.cpu()
  .then(data => {return data})
  .catch(error => console.error(error));
const gpu = await si.graphics()
  .then(data => {return data.controllers[0]})
  .catch(error => console.error(error));
const os = await si.osInfo()
  .then(data => {return data})
  .catch(error => console.error(error));
const battery = await si.battery()
  .then(data => {return data})
  .catch(error => console.error(error));
const network = await si.networkInterfaces()
  .then(data => {return data})
  .catch(error => console.error(error));
const all = await si.getAllData()
  .then(data => {return data})
  .catch(error => console.error(error));
const arr = [cpu, gpu, os, battery, network];
fs.writeFile("data.json", JSON.stringify(arr, null, 2));
fs.writeFile("all.json", JSON.stringify(all, null, 2));
}
createdata();