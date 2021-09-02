let range = (startNum, finishNum) => {
    let arr = [];
    let start = parseInt(startNum);
    let finish = parseInt(finishNum);
    if(start < finish){
        for(let i = start; i <= finish; i++){
            arr.push(i);
        }
        console.log(arr);
    } else if (start > finish) {
        for (let i = start; i >= finish; i--) {
            arr.push(i);
        }
        console.log(arr);
    } else if (!start || !finish){
        arr = [];
        console.log(arr);
    }
}

let rangeWithStep = (startNum, finishNum, step) => {
    let arr = [];
    let start = parseInt(startNum);
    let finish = parseInt(finishNum);
    let stepInt = parseInt(step);

    if(start < finish){
        for(let i = start; i <= finish; i += stepInt){
            arr.push(i);
        }
        console.log(arr);
    } else if (start > finish) {
        for (let i = start; i >= finish; i -= stepInt){
            arr.push(i);
        }
        console.log(arr);
    } else if (!start || !finish || !stepInt){
        arr = [];
        console.log(arr);
    }
}

let sum = (start, finish, step_) => {
    let arr = [];
    let start_ = parseInt(start);
    let finish_ = parseInt(finish);
    let stepInt = parseInt(step_);

    if(!stepInt){
        if(!finish_){
            console.log(start_)
        } else {
            for(let i = start_; i <= finish_;i++){
                arr.push(i);
            }
            let sumArr = 0;
            for(let j = 0; j < arr.length; j++){
                sumArr += arr[j];
            }
            console.log(sumArr);
        }
    } else if (stepInt) {
        for(let i = start_; i <= finish_;i += stepInt){
            arr.push(i);
        }
        let sumArr = 0;
        for(let j = 0; j < arr.length; j++){
            sumArr += arr[j];
        }
        console.log(sumArr);
    }
}

let dataHandling = () => {
    let input = [
        ["0001", "Roman Alamsyah", "Bandar Lampung", "21/05/1989", "Membaca"],
        ["0002", "Dika Sembiring", "Medan", "10/10/1992", "Bermain Gitar"],
        ["0003", "Winona", "Ambon", "25/12/1965", "Memasak"],
        ["0004", "Bintang Senjaya", "Martapura", "6/4/1970", "Berkebun"]
    ];

    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[i].length; j++){
            if(j === 0) {
                console.log(`Nomor ID : ${input[i][j]}`);
            } else if (j === 1) {
                console.log(`Nama Lengkap : ${input[i][j]}`);
            } else if (j === 2) {
                console.log(`TTL : ${input[i][j]} ${input[i][3]}`);
            } else if (j === 4) {
                console.log(`Hobi : ${input[i][j]}\n`);
            }
        }
    }
}

let balikKata = (param) => {
    let kebalikan = "";
    for(let i = param.length - 1; i >= 0; i--){
        kebalikan += param[i];
    }
    let newParam = kebalikan.replace(/,/g, " ");
    return newParam;
}


module.exports = {
    range: range,
    rangeWithStep: rangeWithStep,
    sum: sum,
    dataHandling: dataHandling,
    balikKata: balikKata
}