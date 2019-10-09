const db = require('../database/database.js');
const Movie = require('../database/movie-model.js');

function addMovie (req, res, next) {
    // console.log('req.body: ', req.body);
    const newMovie = {
        title: req.body.title,
        overview: req.body.title,
        releaseDate: req.body.releaseDate,
        averageVote: req.body.averageVote,
        genre: req.body.genre
    }
    Movie.create(newMovie);
    res.status(200).json(newMovie);
}

module.exports = { addMovie }