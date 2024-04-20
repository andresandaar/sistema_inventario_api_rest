// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/product.controller');

router.get('/all', ProductoController.getAll)// Obtener todos los productos
      .get('/:id', ProductoController.getById)// Obtener un producto por ID
      .post('/', ProductoController.create)// Crear un nuevo producto
      .put('/:id', ProductoController.update)// Actualizar un producto existente
      .delete('/:id', ProductoController.remove)// Eliminar un producto

module.exports = router;
