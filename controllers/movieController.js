const db = require('../database/database.js');
const Movie = require('../database/movie-model.js');

function addMovie (req, res, next) {
    // console.log('req.body: ', req.body);
    // console.log('made it add movie middleware');
    // const {title, overview} = req.body;
    const newMovie = {
        title: req.body.title,
        overview: req.body.overview,
        releaseDate: req.body.releaseDate,
        averageVote: req.body.averageVote,
        genre: req.body.genre
    }

    Movie.create(newMovie)
        .then( () => {
            return next();
            // res.status(200).json(newMovie) 
        })
        .catch( (err) => {
            console.log('this is error in add movie middleware: ', err)
            err.log = 'Error in addMovie middleware';
            err.message = 'We could not add your new movie';
            return next(err);
        });
}

function getMovies (req, res, next) {
    Movie.findAll()
        .then(function (movies) {
            res.locals.movies = movies;
            return next();
        })
        .catch(function (err) {
            err.log = 'Error retrieving rows from database';
            err.message = 'We could not find your movie list :(((';
            return err;
        });
}

module.exports = { addMovie, getMovies }