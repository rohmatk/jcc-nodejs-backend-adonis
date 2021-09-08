import fspromise from 'fs/promises';

const path = 'data.json';
export const login = (name, password) => {
    fspromise.readFile(path)
        .then(data => {
            let realData = JSON.parse(data);
            let findData = realData.findIndex(item => item.name === name);
            let theData = realData[findData];
            if(theData.password === password){
                theData.isLogin = true;
                realData.splice(findData,1,theData);
                return fspromise.writeFile(path, JSON.stringify(realData), {encoding: 'utf8'});
            } else {
                console.log("Login Gagal");
            }
        })
        .then(() => console.log("Berhasil Login"))
        
        .catch(err => {
            console.log(err);
        });
}
