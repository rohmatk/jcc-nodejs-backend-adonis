import {sapa, convert, checkScore, filterData} from './lib/eslib.js'

var args = process.argv
switch (args[2]){
    case "sapa":
        console.log(sapa(args[3]))
        break;
    case "convert":
        console.log(convert(args[3],args[4],args[5]))
        break;
    case "checkScore":
        console.log(checkScore(args[3]))
        break;
    case "filterData":
        console.log(filterData(args[3]))
        break;
    default:
        console.log("Perintah yang anda berikan salah!")
        console.log(
            `INSTRUKSI
            node <perintah> <parameter>`
        )
        break;
}
