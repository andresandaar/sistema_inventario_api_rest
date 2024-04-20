const express = require('express');
const router = express.Router();

const ReceptionController = require('../controllers/reception.controller');

router.post('/', ReceptionController.createReceptionWithItems)
    .get('/all', ReceptionController.getReceptionAll)
    .get('/:id', ReceptionController.getReceptionById)
    .get('/items_reception/:id', ReceptionController.getItemsReceptionById)
    .put('/:id', ReceptionController.updateReception)
    .delete('/:id', ReceptionController.removeReception)

module.exports = router;

