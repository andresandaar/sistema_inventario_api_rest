const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplier.controller');

router.get('/all', SupplierController.getAll)// Obtener todos los proveedores
      .get('/:id', SupplierController.getById)// Obtener un proveedor por ID
      .post('/', SupplierController.create)// Crear un nuevo proveedor
      .put('/:id', SupplierController.update)// Actualizar un proveedor existente
      .delete('/:id', SupplierController.remove)// Eliminar un proveedor

module.exports = router;
