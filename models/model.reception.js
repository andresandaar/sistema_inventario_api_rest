
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Supplier = require('./model.supplier');
const Reception = sequelize.define('recepcion', {

    fecha_hora: {
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La fecha y hora son  requeridas'
            },
            notEmpty: {
                msg: 'La fecha y hora son  requeridas'
            },
        }
    },
    numero_factura: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El número de factura es requerido'
            },
            notEmpty: {
                msg: 'El número de factura debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 50],
                msg: 'El número de factura debe tener entre 1 y 50 caracteres'
            }
        }
    },
}, {
    tableName: 'recepcion',
    timestamps: false
});

Reception.belongsTo(Supplier, { foreignKey: 'proveedor_id' });
Supplier.hasMany(Reception, { foreignKey: 'proveedor_id' });

module.exports = Reception;