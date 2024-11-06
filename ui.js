import pcdata from "./getdata.js";
import readline from 'node:readline';
import fs from "fs/promises";
import chalk from "chalk";
import inquire from "inquirer";
import aste from "./aste.js";
import ascii from "./ascii.json" assert {type : "json"};
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
            case "-ascii":
                col_function.push(create_art);
            break;
            default:
                console.log(chalk.redBright(`${element} is not a valid argument. use --help for help with arguments`));
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
    const colorstype = [
        {
          type: 'list',
          name: 'color',
          message: 'What color for type:',
          choices: ['green', 'red', 'yellow']
        }
      ];
      const colorsvalue = [
        {
          type: 'list',
          name: 'color',
          message: 'What color for valiable:',
          choices: ['green', 'red', 'yellow']
        }
      ];
    let cpu = false;
    let gpu = false;
    let memory = false;
    let storage = false;
    let network = false;
    let asciianswer = false;
    let name = "";
    let colortype = "";
    let colorvalue = "";
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
                        rl.question('ascii? (y/n) ', (networkAscii) => {
                            if (networkAscii === 'y') {
                                asciianswer = true;
                            }
                            rl.question('name? ', (nameanswer) => {
                            if (nameanswer != "") {
                                console.log(nameanswer);
                                name = nameanswer;
                            }
                            inquire.prompt(colorstype).then((answertype) => { 
                                colortype = answertype.color;
                                inquire.prompt(colorsvalue).then((answervalue) => { 
                                    colorvalue = answervalue.color;
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
                                        "colortype" : colortype,
                                        "colorvalue" : colorvalue,
                                        "ascii" : asciianswer
                                    }
                                };
                                fs.writeFile("config.json", JSON.stringify(locarr, null, 2));
                                get_info_data();
                                });
                            });
                            close();
                        });
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
        if(config_data.profile.ascii != true){
        data.forEach(element => 
            {
                if(element.hasOwnProperty("cpu") && config_data.config.cpu === true){
                    console.log(showcolorconsole("CPU => ", config_data.profile.colortype) + showcolorconsole(element.cpu.brand, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("gpu") && config_data.config.gpu === true){
                    console.log(showcolorconsole("GPU => ", config_data.profile.colortype) + showcolorconsole(element.gpu.controllers[0].model, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("memory") && config_data.config.memory === true){
                    console.log(showcolorconsole("Memory => ", config_data.profile.colortype) + showcolorconsole(element.memory.total, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("storage") && config_data.config.storage === true){
                    let totalmem = 0
                    element.storage.forEach(elementof => {
                        totalmem += elementof.size;
                    });
                    console.log(showcolorconsole("Storage => ", config_data.profile.colortype) + showcolorconsole(totalmem, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("network") && config_data.config.network === true){
                    console.log(showcolorconsole("Network => ", config_data.profile.colortype) + showcolorconsole(element.network, config_data.profile.colorvalue));
                }
            });
            if(config_data.profile.hostname != ""){
            console.log(showcolorconsole("Hostname => ", config_data.profile.colortype) + showcolorconsole(config_data.profile.hostname, config_data.profile.colorvalue));
        }
    }
    else{
        for (let i = 0; i < ascii.length; i++) {
            let element = "";
            if(i < data.length)
                {
                    element = data[i];
                }
                if(element.hasOwnProperty("cpu") && config_data.config.cpu === true){
                    console.log(showcolorconsole(ascii[i]+"     "+"CPU => ", config_data.profile.colortype) + showcolorconsole(element.cpu.brand, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("gpu") && config_data.config.gpu === true){
                    console.log(showcolorconsole(ascii[i]+"     "+"GPU => ", config_data.profile.colortype) + showcolorconsole(element.gpu.controllers[0].model, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("memory") && config_data.config.memory === true){
                    console.log(showcolorconsole(ascii[i]+"     "+"Memory => ", config_data.profile.colortype) + showcolorconsole(element.memory.total, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("storage") && config_data.config.storage === true){
                    let totalmem = 0
                    element.storage.forEach(elementof => {
                        totalmem += elementof.size;
                    });
                    console.log(showcolorconsole(ascii[i]+"     "+"Storage => ", config_data.profile.colortype) + showcolorconsole(totalmem, config_data.profile.colorvalue));
                }
                if(element.hasOwnProperty("network") && config_data.config.network === true){
                    console.log(showcolorconsole(ascii[i]+"     "+"Network => ", config_data.profile.colortype) + showcolorconsole(element.network, config_data.profile.colorvalue));
                }
                if(element === ""){
                    console.log(showcolorconsole(ascii[i], config_data.profile.colortype));
                }
            }
            if(config_data.profile.hostname != ""){
            console.log(showcolorconsole("Hostname => ", config_data.profile.colortype) + showcolorconsole(config_data.profile.hostname, config_data.profile.colorvalue));
            }       
        }
    }
    else if(params === data){
        console.log(data);
    }
}
function showcolorconsole(string , color){
    switch (color) {
        case "green": 
            return chalk.green(`${string}`); 
        break; 
        case "red": 
            return chalk.red(`${string}`); 
        break; 
        case "yellow": 
            return chalk.yellow(`${string}`); 
        break; 
        default: 
        break;
    }
}
function close() {
    rl.close();
}
function options() {
    console.log("-f gets all info of the pc");
    console.log("-sd shows all data based on the config");
    console.log("-sc shows all config based on the data");
    console.log("-config gives prompts to make the config file");
    console.log("--help shows all options");
    console.log("-ascii creates ascii art");
}
function create_art()
{
    aste();
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