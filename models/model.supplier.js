// models/Proveedor.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supplier = sequelize.define('proveedor', {
    tipo_identificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El tipo de identificación es requerido'
            },
            notEmpty: {
                msg: 'El tipo_identificación debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 50],
                msg: 'El tipo_identificación debe tener entre 1 y 50 caracteres'
            }
        }
    },
    numero_identificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El número de identificación es requerido'
            },
            notEmpty: {
                msg: 'El número de identificación debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 50],
                msg: 'El número de identificación debe tener entre 1 y 50 caracteres'
            }
        }
    },
    nombre_razon_social: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre de la razón social  es requerido'
            },
            notEmpty: {
                msg: 'El nombre de la razón social debe tener entre 1 y 250 caracteres'
            },
            len: {
                args: [1, 250],
                msg: 'El nombre de la razón social debe tener entre 1 y 250 caracteres'
            }
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La direción  es requerido'
            },
            notEmpty: {
                msg: 'La direción  debe tener entre 1 y 250 caracteres'
            },
            len: {
                args: [1, 250],
                msg: 'La direción  debe tener entre 1 y 250 caracteres'
            }
        }
    },
    nombre_contacto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre de contacto es requerido'
            },
            notEmpty: {
                msg: 'El nombre de contacto debe tener entre 1 y 250 caracteres'
            },
            len: {
                args: [1, 250],
                msg: 'El nombre de contacto debe tener entre 1 y 250 caracteres'
            }
        }
    },
    celular_contacto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El celular de contacto es requerido'
            },
            notEmpty: {
                msg: 'El celular de contacto debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 50],
                msg: 'El celular de contacto debe tener entre 1 y 50 caracteres'
            }
        }
    }
}, {
    tableName: 'proveedor',
    timestamps: false
});

module.exports = Supplier;
