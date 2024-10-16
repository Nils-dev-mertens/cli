import si from "systeminformation";
import fs from "fs/promises"
let cpu = await si.cpu()
  .then(data => {return data.brand})
  .catch(error => console.error(error));
let gpu = await si.graphics()
  .then(data => {return data.controllers[0].model})
  .catch(error => console.error(error));
let os = await si.osInfo()
  .then(data => {return data})
  .catch(error => console.error(error));
let battery = await si.battery()
  .then(data => {return data})
  .catch(error => console.error(error));
const arr = [cpu, gpu, os, battery];
arr.forEach(element => {
  console.log(element);
});