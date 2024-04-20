

const Sequelize = require('sequelize');

const db = new Sequelize('inventario_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db





