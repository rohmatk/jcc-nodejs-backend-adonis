let shoppingTime = (memberId, money) =>{
    let listBarang = [
        ['Sepatu Stacattu', 1500000],
        ['Baju Lutfi', 500000],
        ['Baju H&H', 250000],
        ['Sweater Unieropa', 175000],
        ['Daster', 1000000]
    ];
    let temp = [];
    let output = {};
    let uangSisa = money;
    for(let i = 0; i < listBarang.length; i++) {
        if(!memberId){
            return "Mohon dimaafkan, toko aneh hanya berlaku untuk membere onlyfans";
        } else if (money < listBarang[4][1]){
            return "Mohon dimaafkan, uang anda tidak cukup";
        }
        if(uangSisa >= listBarang[i][1]){
            uangSisa -= listBarang[i][1];
            temp.push(listBarang[i][1]);
        }
        output.memberId = memberId;
        output.money = money;
        output.listPurchased = temp;
        output.uangSisa = uangSisa;
    }
    return output;
}
console.log(shoppingTime('1820RzKrnWn08', 2475000));
console.log(shoppingTime('82Ku8Ma742', 10000000));
console.log(shoppingTime('x', 2470));
console.log(shoppingTime());