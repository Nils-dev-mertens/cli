import pcdata from "./getdata.js";
import readline from 'node:readline';
import data from "./data.json" assert {type : "json"};
import config from "./config.json" assert {type : "json"};
const col_function = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const args = process.argv.slice(2); // Slice to ignore the first two default args
if (args.length > 0) {
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        switch (element) {
            case "start":
                    col_function.push(newuser());
                break;
            case "lol":
                    col_function.push(damm());
                break;
            default:
                break;
        }
    }
}
function newuser() {
    rl.question(`new user?(y/n) `,answer => {
        if(answer == "y"){
            get();
        }
        rl.close();
    });
}
function damm(params) {
    console.log("function damm");
}
function get() {
    pcdata("y");
}