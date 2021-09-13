var express = require('express');
var router = express.Router();
var fs = require('fs');


class KaryawanController {
    static addSiswa(req, res) {
        fs.readFile('data.json', (err, data) => {
            if (err) {
                res.status(400).json({ 'error': 'gagal add siswa' })
            } else {
                let siswaTrainer = [req.body.name, req.body.class, req.params.name]
                console.log(siswaTrainer)
                let realData = JSON.parse(data)
                let indexAdmin = realData.karyawan.findIndex(item => (item.isLogin == true && item.role == "admin"))
                let indexTrainer = realData.karyawan.findIndex(item => (item.name == siswaTrainer[2] && item.role == "trainer"))
                if (indexAdmin < 0) {
                    res.status(400).json({ "errors": "admin belum login" })
                } else if (indexTrainer < 0) {
                    res.status(400).json({ "errors": `tidak ada trainer dengan nama ${req.params.name}` })
                } else {
                    if (realData.karyawan[indexTrainer].students) {
                        let student = { name: siswaTrainer[0], class: siswaTrainer[1] }
                        realData.karyawan[indexTrainer].students.push(student)
                        fs.writeFile('data.json', JSON.stringify(realData), (err) => {
                            if (err) {
                                res.status(400).json({ 'error': 'gagal menyimpan data' })
                            } else {
                                res.send({ "message": "Berhasil add siswa" })
                            }
                        })
                    } else {
                        let x = []
                        let student = { name: siswaTrainer[0], class: siswaTrainer[1] }
                        x.push(student)
                        realData.karyawan[indexTrainer].students = x
                        fs.writeFile('data.json', JSON.stringify(realData), (err) => {
                            if (err) {
                                res.status(400).json({ 'error': 'gagal menyimpan data' })
                            } else {
                                res.send({ "message": "Berhasil add siswa" })
                            }
                        })
                    }

                }
            }
        })
    }
}

module.exports = KaryawanController;