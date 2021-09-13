var express = require('express');
const { addSiswa } = require('../controllers/karyawan');
var router = express.Router();
const KaryawanController = require('../controllers/karyawan')
/* GET users listing. */

// router.get('/karyawan')
// router.get('/login')

router.post("/:name/siswa", KaryawanController.addSiswa)

module.exports = router;