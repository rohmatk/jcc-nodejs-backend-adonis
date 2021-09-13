const e = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');


class UserController {
    static findAll(req, res) {
        fs.readFile('data.json', (err, data) => {
            if (err) {
                res.status(400).json({ "errors": 'gagal membaca data' })
            } else {
                let realData = JSON.parse(data);
                res.status(200).json({ 'messages': 'Berhasil get karyawan', data: realData.karyawan })
            }
        })
    }
    static register(req, res) {
        fs.readFile('data.json', (err, data) => {
            if (err) {
                res.status(400).json({ 'error': 'gagal register user' })
            } else {
                let existingData = JSON.parse(data)
                let { karyawan } = existingData
                let { name, role, password } = req.body
                let isLogin = false
                let newUser = { name, role, password, isLogin }
                karyawan.push(newUser)
                let newData = { ...existingData, karyawan }
                fs.writeFile('data.json', JSON.stringify(newData), (err) => {
                    if (err) {
                        res.status(400).json({ 'error': 'gagal menyimpan data user' })
                    } else {
                        res.status(201).json({ "message": "Berhasil register" })
                    }
                })
                res.send({ "message": "Berhasil register" })
            }
        })
    }
    static login(req, res) {
        fs.readFile('data.json', (err, data) => {
            if (err) {
                res.status(400).json({ 'error': 'gagal membaca file' })
            } else {
                let existingData = JSON.parse(data)
                let { name, password } = req.body
                let indexName = existingData.karyawan.findIndex(user => (user.name == name))
                if (indexName < 0) {
                    res.status(400).json({ 'error': `tidak ada user dengan nama ${name}` })
                } else {
                    let passwordDb = existingData.karyawan[indexName].password
                    if (password == passwordDb) {
                        existingData.karyawan[indexName].isLogin = true
                        let newData = { ...existingData }
                        fs.writeFile('data.json', JSON.stringify(newData), (err) => {
                            if (err) {
                                res.status(400).json({ 'error': 'gagal menyimpan data' })
                            } else {
                                res.send({ "message": "Berhasil login" })
                            }
                        })
                    } else {
                        res.status(400).json({ 'error': 'password salah' })
                    }
                }

            }
        })
    }
}

module.exports = UserController;