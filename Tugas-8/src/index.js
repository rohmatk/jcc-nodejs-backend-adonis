import {register} from "./lib/callback";
import {login} from "./lib/promise";
import {addSiswa} from "./lib/asyncAwait";

const args = process.argv;

switch(args[2]){
    case "register":
        let data = args[3];
        let[name, password, role] = data.split(',');
        let obj = {
            name,
            password,
            role,
            isLogin: false
        }
        register(obj);
        console.log("Berhasil Register");
        break;
    case "login":
        let param1 = args[3];
        let [name1, password1] = param1.split(',');
        login(name1, password1);
        break;
    case "addSiswa":
        let arg = args[3];
        let [name2, trainerName] = arg.split(',');
        addSiswa(name2, trainerName);
        break;
    default:
        break;
}