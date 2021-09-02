let funcLib = require('./lib/rangeLib');

let range = funcLib.range;
let rangeWithStep = funcLib.rangeWithStep;
let sum = funcLib.sum;
let dataHandling = funcLib.dataHandling;
let balikKata = funcLib.balikKata;

let args = process.argv;


switch(args[2]){
    case "range":
        let start = args[3];
        let finish = args[4];
        range(start, finish);
        break;
    case "rangeWithStep":
        let start1 = args[3];
        let finish1 = args[4];
        let step = args[5];
        rangeWithStep(start1, finish1, step);
        break;
    case "sum":
        let start_ = args[3];
        let finish_ = args[4];
        let step_ = args[5];
        sum(start_, finish_, step_);
        break;
    case "dataHandling":
        dataHandling();
        break;
    case "balikKata":
        let param = args[3];
        console.log(balikKata(param));
        break;
}