
const sequelize = require('../config/database');
const createError = require('http-errors');
const Reception = require('../models/model.reception');
const ItemReception = require('../models/model.itemReception');
const Supplier = require('../models/model.supplier');
const Product = require('../models/model.product');

async function createReceptionWithItems(receptionData, itemsData) {

    if (!Array.isArray(itemsData) || itemsData.length === 0) {
        throw new createError(400, 'itemsData must be a non-empty array');
    }
    // Iniciar una transacción
    const t = await sequelize.transaction();
    try {
        const reception = await Reception.create(receptionData, {
            transaction: t,
        });

        const supplier = await Supplier.findByPk(reception.proveedor_id)

        const itemsWithReceptionId = await itemsData.map(itemData => {
            return { ...itemData, recepcion_id: reception.id };
        });

        //bulkCreate método que permite crear múltiples registros a la vez, con una sola consulta
        const result = await ItemReception.bulkCreate(itemsWithReceptionId, {
            transaction: t, validate: true,
        });

        const itemsReception = await Promise.all(result.map(async (data) => {
            const product = await Product.findByPk(data.dataValues.producto_id)
            return { ...data.dataValues, producto: { nombre: product.nombre } };
        }));

        await t.commit();
        return {
            ...reception.toJSON(),
            proveedor: { nombre_contacto: supplier.nombre_contacto },
            itemsReception: itemsReception
        };
    } catch (error) {
        // Si hay un error, hacer rollback de la transacción
        if (t) await t.rollback();

        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }

        if (error.name === 'AggregateError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        if (error.name === 'BadRequestError') {
            throw new createError(error);
        }

        throw new createError(500, 'Error creating Recepcion with Items');
    }
};

async function getReceptionAll() {
    try {
        const receptions = await Reception.findAll({
            include: {
                model: Supplier,
                attributes: ['nombre_contacto'],
            },
        });

        const itemsWithReceptionId = await Promise.all(receptions.map(async (reception) => {
            const itemReception = await ItemReception.findAll({
                where: { recepcion_id: reception.id },
                include: {
                    model: Product,
                    attributes: ['nombre'],
                },
            });
            return { ...reception.toJSON(), itemsReception: itemReception };
        }));

        return itemsWithReceptionId;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new Error(errorMessage);
        } else {
            throw new Error('Error al obtener las recepciones');
        }

    }
};

async function getReceptionById(id) {
    try {
        const result = await Reception.findByPk(id, {
            include: {
                model: Supplier,
                attributes: ['nombre_contacto'],
            },
        });

        if (!result) {
            throw new createError(404, 'Resepción  no encontrado');
        }

        const itemsReception = await ItemReception.findAll({
            where: { recepcion_id: result.id },
            include: {
                model: Product,
                attributes: ['nombre'],
            },
        });

        return {
            ...result.toJSON(),
            itemsReception
        }

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw new createError(500, 'Error al obtener la recepción por ID');
    }
}

async function getItemsReceptionById(idReception) {
    try {
        const result = await Reception.findByPk(idReception);
        if (!result) {
            throw new createError(404, 'Resepción  no encontrado');
        }

        const itemsReception = await ItemReception.findAll({ where: { recepcion_id: idReception } });
        if (!itemsReception || itemsReception.length === 0) {
            throw new createError(404, 'No se encontraron item de resepción');
        }

        return itemsReception

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw new createError(500, 'Error al obtener la recepción por ID');
    }
}

//Nota: Revisar función
async function updateReception(idReception, receptionData, itemsData) {

    if (!Array.isArray(itemsData) || itemsData.length === 0) {
        throw new createError(400, 'itemsData must be a non-empty array');
    }
    // Iniciar una transacción
    const t = await sequelize.transaction();
    try {
        const resultReception = await Reception.findByPk(idReception);

        if (!resultReception) {
            throw createError(404, 'Recepcion no encontrada');
        }

        const reception = await resultReception.update(receptionData, {
            transaction: t,
        });

        const supplier = await Supplier.findByPk(reception.proveedor_id)

        const itemsWithReceptionId = await Promise.all(itemsData.map(async (data) => {
            const resultItemReception = await ItemReception.findByPk(idReception);

            if (!resultItemReception) {
                throw createError(404, 'item Recepcion no encontrao');
            }
            const itemReception = await resultItemReception.update({ ...data, recepcion_id: idReception },
                {
                    transaction: t, validate: true,
                });
            return itemReception;
        }));

        const itemsReception = await Promise.all(itemsWithReceptionId.map(async (data) => {
            const product = await Product.findByPk(data.dataValues.producto_id)
            return { ...data.dataValues, producto: { nombre: product.nombre } };
        }));

        await t.commit();
        return {
            ...reception.toJSON(),
            proveedor: { nombre_contacto: supplier.nombre_contacto },
            itemsReception: itemsReception
        };
    } catch (error) {
        // Si hay un error, hacer rollback de la transacción
        if (t) await t.rollback();
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }

        if (error.name === 'AggregateError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        if (error.name === 'BadRequestError') {
            throw new createError(error);
        }

        throw new createError(500, 'Error update Recepcion with Items');

    }
}

async function removeReception(idReception) {
    try {
        const resultReception = await Reception.findByPk(idReception);

        if (!resultReception) {
            throw createError(404, 'Recepcion no encontrada');
        }
        
        await ItemReception.destroy({
            where: { recepcion_id: idReception },
            force: true
        });
        
        await resultReception.destroy({ force: true });

    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            throw new createError(500, errorMessage);
        }
        if (error.name === 'NotFoundError') {
            throw new createError(error);
        }
        throw createError(500, 'Error al eliminar la recepcion');
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