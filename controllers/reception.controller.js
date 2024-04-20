const ReceptionService = require('../services/reception.service');

async function createReceptionWithItems (req, res, next) {
    const { receptionData, itemsData } = req.body;
    try {
        const newRecepcion = await ReceptionService.createReceptionWithItems(receptionData, itemsData);
        res.status(201).json(newRecepcion);
    } catch (error) {
        next(error);
    }
};

async function updateReception (req, res, next) {
    const { receptionData, itemsData } = req.body;
    const { id } = req.params;
    try {
        const newRecepcion = await ReceptionService.updateReception(id, receptionData, itemsData);
        res.status(201).json(newRecepcion);
    } catch (error) {
        next(error);
    }
};

async function getReceptionById(req, res, next) {
    const { id } = req.params;
    try {
        const result = await ReceptionService.getReceptionById(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

async function getItemsReceptionById(req, res, next) {
    const { id } = req.params;
    try {
        const result = await ReceptionService.getItemsReceptionById(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

async function getReceptionAll(req, res, next) {
    try {
        const result = await ReceptionService.getReceptionAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function removeReception(req, res, next) {
    const { id } = req.params;
    try {
        await ReceptionService.removeReception(id);
        res.json({ message: 'Recepción eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createReceptionWithItems,
    getReceptionById,
    getReceptionAll,
    getItemsReceptionById,
    updateReception,
    removeReception
};
