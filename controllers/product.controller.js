const ProductService = require('../services/product.service');

async function getAll(req, res, next) {
    try {
        const products = await ProductService.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    const { id } = req.params;
    try {
        const product = await ProductService.getById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    const productData = req.body;
    try {
        const newProduct = await ProductService.create(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    const { id } = req.params;
    const productData = req.body;
    try {
        const product = await ProductService.update(id, productData);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    const { id } = req.params;
    try {
        await ProductService.remove(id);
        res.json({ message: 'Producto eliminado exitosamente' });
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

