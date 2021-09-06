export const sapa = nama => {
    return `Halo Selamat Pagi, ${nama}`;
}

//object literals
export const convert = (nama, domisili, umur) => {
    let output = {
        nama,
        domisili,
        umur
    }
    return output;
}

export const checkScore = param => {
    let output = {};
    let arr = param.split(/,/);
    for (let i = 0; i < arr.length; i++){
        let [key, value] = arr[i].split(':');
        output[[key]] = value;
    }
    return output;
}

export const data = [
    { name: "Ahmad", class: "adonis"},
    { name: "Regi", class: "laravel"},
    { name: "Bondra", class: "adonis"},
    { name: "Iqbal", class: "vuejs" },
    { name: "Putri", class: "Laravel" }
];

export const filterData = (param, ...rest) =>  rest.filter(data => data.class === param);

