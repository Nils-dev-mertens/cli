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
            get();
        }
        close();
    });
}
function config_function()
{
    const cpu = false;
    const gpu = false;
    const memory = false;
    const storage = false;
    const network = false;
    rl = createReadlineInterface();
    rl.question('cpu? (y/n) ', (cpuAnswer) => {
        if (cpuAnswer === 'y') {
            console.log('You chose CPU');
        }
    
        rl.question('gpu? (y/n) ', (gpuAnswer) => {
            if (gpuAnswer === 'y') {
                console.log('You chose GPU');
            }
    
            rl.question('memory? (y/n) ', (memoryAnswer) => {
                if (memoryAnswer === 'y') {
                    console.log('You chose Memory');
                }
    
                rl.question('storage? (y/n) ', (storageAnswer) => {
                    if (storageAnswer === 'y') {
                        console.log('You chose Storage');
                    }
    
                    rl.question('network? (y/n) ', (networkAnswer) => {
                        if (networkAnswer === 'y') {
                            console.log('You chose Network');
                        }
                        rl.question('name y/n', (networkAnswer) => {
                            if (networkAnswer === 'y') {
                                console.log('You chose Network');
                            }
                            rl.question('network? (y/n) ', (networkAnswer) => {
                                if (networkAnswer === 'y') {
                                    console.log('You chose Network');
                                }
                                rl.close();
                            });
                        });
                    });
                });
            });
        });
    });
    const locarr = {
        "config" : {
            "cpu": cpu,
            "gpu": gpu,
            "memory": memory, 
            "storage": storage,
            "network": network
        }
    };
    fs.writeFile("all.json", JSON.stringify(locarr, null, 2));
}
//function get is used to active the imported js file, if i just used it in the newuser fucntion it always activates
function get() {
    pcdata("y");
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