const express = require('express');
const router = express.Router();

const VenuesController = require('../controller/venue')

router.post('/', VenuesController.save)

router.get('/', VenuesController.getAll)

router.get('/:id', VenuesController.getByID)

router.put('/:id', VenuesController.updateByID)

router.delete('/:id', VenuesController.deleteByID)

module.exports = router;