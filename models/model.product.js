// models/Product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('producto', {
   
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El código es requerido'
            },
            notEmpty: {
                msg: 'El código debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 50],
                msg: 'El código debe tener entre 1 y 50 caracteres'
            }
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            notEmpty: {
                msg: 'El nombre debe tener entre 1 y 250 caracteres'
            }, 
            len: {
                args: [1, 250],
                msg: 'El nombre debe tener entre 1 y 250 caracteres'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La dirección es requerido'
            },
            notEmpty: {
                msg: 'Ingrese una dirección'
            }
        }
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        defaultValue: 'Activo'
    },
    nombre_laboratorio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre del laboratorio es requerido'
            },
            notEmpty: {
                msg: 'El nombre del laboratorio debe tener entre 1 y 250 caracteres'
        }, 
            len: {
                args: [1, 250],
                msg: 'El nombre del laboratorio debe tener entre 1 y 250 caracteres'
            }
        }
    }
}, {
    tableName: 'producto', // Nombre de la tabla en la base de datos
    timestamps: false // No agregar createdAt y updatedAt
},)

module.exports = Product;
