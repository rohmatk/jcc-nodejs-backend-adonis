const express = require('express');
const router = express.Router();

const VanuesController = require('../controller/vanue')

router.post('/', VanuesController.save)

router.get('/', VanuesController.getAll)

router.get('/:id', VanuesController.getByID)

router.put('/:id', VanuesController.updateByID)

router.delete('/:id', VanuesController.deleteByID)

module.exports = router;