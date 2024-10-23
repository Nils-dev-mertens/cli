import pcdata from "./getdata.js";
import readline from 'node:readline';
import data from "./data.json" assert {type : "json"};
import config from "./config.json" assert {type : "json"};
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
                col_function.push(lol);
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

//function get is used to active the imported js file, if i just used it in the newuser fucntion it always activates
function get() {
    pcdata("y");
}
function show(params) {
    console.log(params);
}
function close(params) {
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