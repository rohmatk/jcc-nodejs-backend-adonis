const funcLib = require('./lib/funcLib');


var teriak = funcLib.teriak;
var kalikan = funcLib.kalikan;
var introduce = funcLib.introduce;

const args = process.argv;

switch (args[2]) {
    case "teriak":
        console.log(teriak());
        break;
    case "kalikan":
        let num1 = args[3];
        let num2 = args[4];
        console.log(kalikan(num1,num2));
        break;
    case "introduce":
        let nama = args[3];
        let age = args[4];
        let address = args[5];
        let hobby = args[6];
        console.log(introduce(nama,age,address,hobby));
        break;    


}