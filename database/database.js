const Sequelize = require('sequelize');

const db = new Sequelize('movielist', 'gordoncampbell', 'katie', {
    dialect: 'postgres'
});

module.exports = db;