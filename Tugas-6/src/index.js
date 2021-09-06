import {
    sapa,
    checkScore,
    convert,
    data,
    filterData
} from './lib/berlatihEs6';

const args = process.argv;
const [command] = process.argv.slice(2);

switch(command){
    case "sapa":
        let nama = args[3];
        console.log(sapa(nama));
        break;
    case "convert":
        let [name, domisili, umur] = [args[3], args[4], args[5]];
        console.log(convert(name, domisili, parseInt(umur)));
        break;
    case "checkScore":
        let param = args[3];
        console.log(checkScore(param));
        break;
    case "filter":
        let [ahmad, regi, bondra, iqbal, putri] = data;
        let keyword = args[3];
        //keyword menggunakan index ke-3 args jadi harus tetap mengetikkan filter
        console.log(filterData(keyword, ahmad, regi, bondra, iqbal, putri))
        break;
    default:
        break; 
}