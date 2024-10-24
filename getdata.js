import si from "systeminformation";
import fs from "fs/promises";
import config_data from "./config.json" assert {type : "json"};
export default async function createdata(param) {
if(param === "standard"){
const all = await si.getAllData()
  .then(data => {return data})
  .catch(error => console.error(error));
fs.writeFile("all.json", JSON.stringify(all, null, 2));
}
else if(param === "config"){
  let boolcpu = config_data.config.cpu;
  let boolgpu = config_data.config.cpu;
  let boolmemory = config_data.config.cpu;
  let boolstorage = config_data.config.cpu;
  let boolnetwork = config_data.config.cpu;
  const arr = [];
  const boolarr = [boolcpu, boolgpu, boolmemory, boolstorage, boolnetwork];
  boolarr.forEach(element => {
    
  });

  // fs.writeFile("data.json", JSON.stringify(arr, null, 2));
}
}