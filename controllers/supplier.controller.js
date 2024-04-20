

const SupplierService = require('../services/supplier.service');

async function getAll(req, res, next) {
    try {
        const result = await SupplierService.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    const id = req.params.id;
    try {
        const result = await SupplierService.getById(id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const result = await SupplierService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    const id = req.params.id;
    try {
        const result = await SupplierService.update(id, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    const { id } = req.params;
    try {
        await SupplierService.remove(id);
        res.json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};


