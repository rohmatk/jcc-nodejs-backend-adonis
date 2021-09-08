export const sapa = (nama) =>`halo selamat pagi, ${nama}`
export const convert = (name,dom,age) => {
    let nama = name 
    let domisili = dom 
    let umur = parseInt(age)
    let konversi = {nama, domisili, umur}
    return konversi
}
export const checkScore = (data) => {
    let datas = data.split(",")
    let nama = datas[0].slice(5) 
    let kelas = datas[1].slice(6)
    let score = parseInt(datas[2].slice(6))
    let konversi = {nama, kelas, score}
    return konversi
}
export const filterData = (kelas) =>{
    const data = [
        { name: "Ahmad", class: "adonis"},
        { name: "Regi", class: "laravel"},
        { name: "Bondra", class: "adonis"},
        { name: "Iqbal", class: "vuejs" },
        { name: "Putri", class: "Laravel" }
      ]
    let hasil = []
    for (let i=0;i<data.length;i++){
        if (data[i].class == kelas){
            hasil.push(data[i])
        } else{}
    }

    return hasil

}