const funcLib = require('./lib/loopLib');

let while_ = funcLib.while_;
let for_ = funcLib.for_;
let persegiPanjang = funcLib.persegiPanjang;
let tangga = funcLib.tangga;
let catur = funcLib.catur;

const args = process.argv;

switch(args[2]){
    case "while":
       while_();
        break;
    case "for":
        for_();
        break;
    case "persegiPanjang":
        let panjang = args[3];
        let lebar = args[4];
        persegiPanjang(panjang, lebar);
        break;
    case "tangga":
        let rows = args[3];
        tangga(rows);
        break;
    case "catur":
        let baris = args[3];
        catur(baris);
        break;
}