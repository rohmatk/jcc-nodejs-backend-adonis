let nilaiTertinggi = (siswa) => {
    let output = {};
    for(let i = 0; i < siswa.length; i++) {
        let siswaS = siswa[i];
        if(!(siswaS.class in output)){
            output[siswaS.class] = siswaS;
        } else {            
            let kelas = output[siswaS.class];
            if(siswaS.score > kelas.score){
                output[siswaS.class] = siswaS;
            }
        }
    }
    return output;
}
let kelasA = [
    {
        name: 'Asep',
        score: 90,
        class: 'adonis'
    },
    {
        name: 'Ahmad',
        score: 85,
        class: 'vuejs'
    },
    {
        name: 'Regi',
        score: 74,
        class: 'adonis'
    },
    {
        name: 'Afrida',
        score: 78,
        class: 'reactjs'
    },
];
let kelasB = [
    {
        name: 'Bondra',
        score: 100,
        class: 'adonis'
    },
    {
        name: 'Putri',
        score: 76,
        class: 'laravel'
    },
    {
        name: 'Iqbal',
        score: 92,
        class: 'adonis'
    },
    {
        name: 'Tyar',
        score: 71,
        class: 'laravel'
    },
    {
        name: 'Hilmy',
        score: 80,
        class: 'vuejs'
    }
];
console.log(nilaiTertinggi(kelasA));
console.log(nilaiTertinggi(kelasB));