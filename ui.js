import pcdata from "./getdata.js";
import readline from 'node:readline';
import fs from "fs/promises";
import chalk from "chalk";
import data from "./data.json" assert {type : "json"};
import config_data from "./config.json" assert {type : "json"};
const col_function = [];
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}
let rl;
const args = process.argv.slice(2); // Slice to ignore the first two default args
if (args.length != 0) {
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        switch (element) {
            case "-f":
                col_function.push(newuser);
                break;
            case "-sd":
                col_function.push([show,data]);
                break;
            case "-sc":
                col_function.push([show,config_data]);
                break;
            case "-config":
                col_function.push(config_function);
                break;
            case "--help":
                col_function.push(options);
                break;
            default:
                console.log(`${element} is not a valid argument. use --help for help with arguments`)
                break;
        }
    }
}
function newuser() {
    rl = createReadlineInterface();
    rl.question(`new user?(y/n) `, answer => {
        if (answer == "y") {
            getall();
        }
        close();
    });
}
function config_function()
{

    let cpu = false;
    let gpu = false;
    let memory = false;
    let storage = false;
    let network = false;
    let name = "";
    rl = createReadlineInterface();
    rl.question('cpu? (y/n) ', (cpuAnswer) => {
        if (cpuAnswer === 'y') {
            cpu = true;
        }
    
        rl.question('gpu? (y/n) ', (gpuAnswer) => {
            if (gpuAnswer === 'y') {
                gpu = true;
            }
    
            rl.question('memory? (y/n) ', (memoryAnswer) => {
                if (memoryAnswer === 'y') {
                    memory = true;
                }
    
                rl.question('storage? (y/n) ', (storageAnswer) => {
                    if (storageAnswer === 'y') {
                        storage = true
                    }
    
                    rl.question('network? (y/n) ', (networkAnswer) => {
                        if (networkAnswer === 'y') {
                            network = true;
                        }
                        rl.question('name? ', (nameanswer) => {
                            if (nameanswer != "") {
                                console.log(nameanswer);
                                name = nameanswer;
                            }
                            const locarr = {
                                "config" : {
                                    "cpu": cpu,
                                    "gpu": gpu,
                                    "memory": memory, 
                                    "storage": storage,
                                    "network": network
                                },
                                "profile" : {
                                    "hostname" :  name,
                                }
                            };
                            fs.writeFile("config.json", JSON.stringify(locarr, null, 2));
                            get_info_data();
                            close();
                        });
                    });
                });
            });
        });
    });
}
//function get is used to active the imported js file, if i just used it in the newuser fucntion it always activates
function getall() {
    pcdata("standard");
}
function get_info_data() {
    pcdata("config");
}
function show(params) {
    if(params === config_data){
        data.forEach(element => 
            {
                if(element.hasOwnProperty("cpu") && config_data.config.cpu === true){
                    console.log(element.cpu.brand);
                }
                if(element.hasOwnProperty("gpu") && config_data.config.gpu === true){
                    console.log(element.gpu.controllers[0].model);
                }
                if(element.hasOwnProperty("memory") && config_data.config.memory === true){
                    console.log(element.memory.total);
                }
                if(element.hasOwnProperty("storage") && config_data.config.storage === true){
                    let totalmem = 0
                    element.storage.forEach(elementof => {
                        totalmem += elementof.size;
                    });
                    console.log(totalmem);
                }
                if(element.hasOwnProperty("network") && config_data.config.network === true){
                    console.log(element.network);
                }
            });
    }
    else if(params === data){
        console.log(data);
    }
}
function close() {
    rl.close();
}
function options() {
    console.log("-f gets all info of the pc");
    console.log("-sd shows all data based on the config");
    console.log("-sc shows all config based on the data");
    console.log("--help shows all options");
}
col_function.forEach(element => {
    if(Array.isArray(element)){
        element[0](element[1]);
    }
    else
    {
        element();
    }
});