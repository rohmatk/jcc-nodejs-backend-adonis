import fspromise from 'fs/promises';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const path = 'data.json';
export const addSiswa = async (name, trainerName) => {
    try{
        let dataRead = await fspromise.readFile(path);
        let realData = JSON.parse(dataRead);
        let findData = realData.findIndex(item => item.name === trainerName);
        let theData = realData[findData];
        let theAdmin = realData[0];
        if(theAdmin.role === 'admin' && theAdmin.isLogin){
            if(!('students' in theData)){
                theData['students'] = [{name}];
            } else {
                theData['students'].push({name});
            }
            realData.splice(findData, 1, theData);
            await fspromise.writeFile(path, JSON.stringify(realData), {encoding: 'utf8'});
            console.log("berhasil add siswa");
        } else {
            console.log("Gagal Bro");
        }

    } catch (error) {
        console.log("Gagal menambahkan siswa")
    }

}