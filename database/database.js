const Sequelize = require('sequelize');

const db = new Sequelize('movielist', 'gordoncampbell', 'katie', {
    dialect: 'postgres'
});

db.query("CREATE TABLE IF NOT EXISTS newList")

module.exports = db;