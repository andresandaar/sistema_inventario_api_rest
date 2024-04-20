// routes/index.js

const express = require('express');
const router = express.Router();
const productoRoutes = require('./product.routes');
const supplierRoutes = require('./supplier.routes');
const receptionRoutes = require('./reception.routes');

// Montar las rutasn
router.use('/producto', productoRoutes);
router.use('/proveedor', supplierRoutes);
router.use('/recepcion', receptionRoutes);

module.exports = router;
