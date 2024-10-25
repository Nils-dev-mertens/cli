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
  const boolcpu = config_data.config.cpu;
  const boolgpu = config_data.config.cpu;
  const boolmemory = config_data.config.cpu;
  const boolstorage = config_data.config.cpu;
  const boolnetwork = config_data.config.cpu;
  const arr = [];
  if(boolcpu === true){
    const local_data_cpu = await si.cpu()
      .then(data => {return data});
    arr.push({"cpu":local_data_cpu});
  }
  if(boolgpu === true){
    const local_data_gpu = await si.graphics()
      .then(data => {return data});
    arr.push({"gpu":local_data_gpu});
  }
  if(boolmemory === true){
    const local_data_memory = await si.mem()
      .then(data => {return data});
    arr.push({"memory":local_data_memory});
  }
  if(boolstorage === true){
    const local_data_storage = await si.diskLayout()
      .then(data => {return data});
    arr.push({"storage":local_data_storage});
  }
  if(boolnetwork === true){
    const local_data_network = await si.networkGatewayDefault()
      .then(data => {return data});
    arr.push({"network":local_data_network});
  }
  fs.writeFile("data.json", JSON.stringify(arr, null, 2));
}
}