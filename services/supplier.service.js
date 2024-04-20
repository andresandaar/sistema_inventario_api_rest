const Supplier = require('../models/model.supplier.js');
const createError = require('http-errors');

async function getAll() {
    try {
        return await Supplier.findAll();
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new Error(errorMessage);
        } else {
            throw createError(500, 'Error al obtener proveedores');
        }


    }
}

async function getById(id) {
    try {
        const result = await Supplier.findByPk(id);
        if (!result) {
            throw new createError(404, 'Proveedor no encontrado');
        }
        return result;
    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw new createError(500, 'Error al obtener el proveedor');

    }
}

async function create(data) {
    try {
        return await Supplier.create(data);
    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        };

        throw createError(500, 'Error al crear el proveedor');

    }
}

async function update(id, data) {
    try {
        const result = await Supplier.findByPk(id);
        if (!result) {
            throw createError(404, 'Proveedor no encontrado');
        }
        await result.update(data);
        return result;

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw createError(500, 'Error al actualizar el proveedor')

    }
}

async function remove(id) {

    try {

        const result = await Supplier.findByPk(id);
        if (!result) {
            throw createError(404, 'Proveedor no encontrado');
        }
        return await result.destroy();
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw createError(500, 'Error al eliminar el proveedor');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};


