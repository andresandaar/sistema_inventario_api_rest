const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const  Product = require('./model.product');
const Reception = require('./model.reception');

const ItemReception = sequelize.define('item_recepcion', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La cantidad es requerido'
            },
            notEmpty: {
                msg: 'Ingrese un valor valido'
            },
        }
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El lote es requerido'
            },
            notEmpty: {
                msg: 'El lote debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 250],
                msg: 'El lote debe tener entre 1 y 50 caracteres'
            }
        }
    },
    registro_invima: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notNull: {
                msg: 'El registro invima es requerido'
            },
            notEmpty: {
                msg: 'El registro invima debe tener entre 1 y 50 caracteres'
            },
            len: {
                args: [1, 250],
                msg: 'El registro invima debe tener entre 1 y 50 caracteres'
            }
        }
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La fecha de vencimiento es  requerida'
            },
            notEmpty: {
                msg: 'La fecha de vencimiento es  requerida'
            },
        }
    },
    estado_presentacion_producto: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La presentacion del producto  es requerida'
            },
            notEmpty: {
                msg: 'La presentacion del producto  es requerida'
            }
        }
    }
    /* ,
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    recepcion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Reception,
            key: 'id'
        }
    } */
}, {
    tableName: 'item_recepcion',
    timestamps: false
});

//Relaciones
ItemReception.belongsTo(Product, { foreignKey: 'producto_id'});
Product.hasMany(ItemReception, { foreignKey: 'producto_id' });
ItemReception.belongsTo(Reception, { foreignKey: 'recepcion_id' });
Reception.hasMany(ItemReception, { foreignKey: 'recepcion_id' });

module.exports = ItemReception;
