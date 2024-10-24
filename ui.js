import pcdata from "./getdata.js";
import readline from 'node:readline';
import fs from "fs/promises";
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
            default:
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
            console.log("true")
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
function show(params) {
    console.log(params);
}
function close() {
    rl.close();
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