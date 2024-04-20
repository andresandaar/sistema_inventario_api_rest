
const Product = require('../models/model.product');
const createError = require('http-errors');

async function getAll() {
    try {
        return await Product.findAll();
    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }

        throw new createError(500, 'Error al obtener productos');

    }
}

async function getById(productId) {
    try {
        const result = await Product.findByPk(productId);
        if (!result) {
            throw new createError(404, 'Producto no encontrado');
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
        throw new createError(500, 'Error al obtener producto por ID');
    }
}

async function create(productData) {
    try {
        return await Product.create(productData);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        throw new createError(500, 'Error al crear producto');


    }
}

async function update(productId, productData) {
    try {
        const result = await Product.findByPk(productId);
        if (!result) {
            throw createError(404, 'Producto no encontrado');
        }
        await result.update(productData);
        return result;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw createError(500, 'Error al actualizar producto');

    }
}

async function remove(productId) {
    try {
        const result = await Product.findByPk(productId);
        if (!result) {
            throw createError(404, 'Producto no encontrado');
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
        throw createError(500, 'Error al eliminar producto');
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};

