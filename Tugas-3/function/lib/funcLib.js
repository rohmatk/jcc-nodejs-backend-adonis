let teriak = () => {
    return "Hello Guys!";
}

let kalikan = (num1, num2) => {
    return num1 * num2;
}

let introduce = (name, age, address, hobby) => {
    return `Nama saya ${name}, umur saya ${age}, alamat saya di ${address}, dan saya punya hobi yaitu ${hobby}`;
}

module.exports = {
    teriak: teriak,
    kalikan: kalikan,
    introduce: introduce
}