const Sequelize  = require('sequelize');
const db = require('./database.js');

const Movie = db.define('movie', {
    title: { 
        type: Sequelize.TEXT, 
        allowNull: false
    },
    overview: {
        type: Sequelize.TEXT,
    },
    releaseDate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    averageVote: {
        type: Sequelize.DECIMAL(1),
    },
    genre: {
        type: Sequelize.TEXT,
    },
    watched: {
        type: Sequelize.BOOLEAN
    }
})

// Movie.sync({ force: true });

module.exports = Movie