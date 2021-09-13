var express = require('express');
var router = express.Router();
const UserController = require('../controllers/controller')

/* GET home page. */

router.get('/karyawan', UserController.findAll)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router;
