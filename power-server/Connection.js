const { Sequelize } = require('sequelize');

const connection = new Sequelize('power_monitor', 'root', 'abacate',
    {
        host: '172.17.0.2',
        dialect: 'mysql',
        port: 3306
    });

module.exports = connection;
