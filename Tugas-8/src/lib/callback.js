import fs from 'fs';

export const register = (dataParam) => {
    let path = 'data.json';
    fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
        } else {
            let dataArr = JSON.parse(data);
            dataArr.push(dataParam);
            fs.writeFile(path, JSON.stringify(dataArr), {encoding: 'utf-8'}, (err) => {
                if (err){
                    console.log(err);
                }
            });
        }
    })
}