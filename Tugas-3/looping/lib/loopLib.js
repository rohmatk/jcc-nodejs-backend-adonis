let while_ = () => {
    let i = 2;
    while(i <= 20){
        if(i === 2){
            console.log(
                'LOOPING PERTAMA\n' +
                i + ' - I Love Coding'
            );
        } else if(i % 2 === 0 && i !== 2){
            console.log(
              i + ' - I Love Coding'
            );
        }

        i++;
    }

let j = 20;
    while(j > 0){
        if(j === 20){
            console.log(
                'LOOPING KEDUA\n' +
                j + ' - I will become a mobile developer'
            );
        } else if(j % 2 === 0 && j !== 20){
            console.log(`${j} - I will become a mobile developer`);
        }
        j--;
    }

}

let for_ = () => {
    i = 0;
    for(var i = 1; i <= 20; i++){
        if(i % 2 !== 0){
            if(i % 3 !== 0){
                console.log(`${i} - Santai`);
            } else if (i % 3 === 0){
                console.log(`${i} - I Love Coding`);
            }
        } else if(i % 2 === 0){
            console.log(`${i} - Berkualitas`);
        }
    }
}

let persegiPanjang = (panjang, lebar) => {
    for(let i = 1; i <= lebar; i++){
        for(let j = 1; j <= panjang; j++){
            process.stdout.write("#");
        }
        process.stdout.write("\n");
    }
}

let catur = (rows) => {
    for(let i = 1; i <= rows; i++){
        for(let j = 1; j <= 4; j++){
            if(i % 2 !== 0){
                process.stdout.write(" #");
            } else if (i % 2 === 0){
                process.stdout.write("# ");
            }
        }
        process.stdout.write("\n");
    }
}

let tangga = (rows) => {
    for(let i = 1; i <= rows; i++){
        for(let j = 1; j <= i; j++){
            process.stdout.write("#");
        }
        process.stdout.write("\n");
    }
}

module.exports = {
    while_: while_,
    for_: for_,
    persegiPanjang: persegiPanjang,
    tangga: tangga,
    catur: catur
}