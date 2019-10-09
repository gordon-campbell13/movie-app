const Sequelize = require('sequelize');
const db = require('./database.js');

const Movie = db.define('movie', {
    title: { 
        type: Sequelize.STRING, 
        allowNull: false
    },
    overview: {
        type: Sequelize.STRING,
    },
    releaseDate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    averageVote: {
        type: Sequelize.INTEGER,
    },
    genre: {
        type: Sequelize.STRING,
    }
})

module.exports = Movie