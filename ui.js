import pcdata from "./getdata.js";
import readline from 'node:readline';
import data from "./data.json" assert {type : "json"};
console.log(data);
const args = process.argv.slice(2); // Slice to ignore the first two default args
if (args.length > 0) {
    args.forEach((arg, index) => {
        console.log(`Argument ${index + 1}: ${arg}`);
    });
} else {
    console.log('No arguments provided.');
}
const fucntion = [damm()];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,});

rl.question(`new user?`, answer => {
    console.log(`${answer}`);
    rl.close();
});
fucntion[0];
function damm(params) {
    console.log("function damm");
}