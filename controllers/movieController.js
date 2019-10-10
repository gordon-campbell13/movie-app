const Movie = require('../database/movie-model.js');

function addMovie (req, res, next) {

    const newMovie = {
        title: req.body.title,
        overview: req.body.overview,
        releaseDate: req.body.releaseDate,
        averageVote: req.body.averageVote,
        genre: req.body.genre,
        watched: false
    }

    Movie.create(newMovie)
        .then( () => {
            return next();
        })
        .catch( (err) => {
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

function deleteMovie (req, res, next) {
    let movieTitle = req.body.title;
    Movie.destroy({
        where: {
            title: movieTitle
        }
    })
    .then(() => {
        console.log('made it back from the destroy request')
        return next()
    })
    .catch(function (err) {
        err.log = 'Error could not delete rows from database';
        err.message = 'Uh oh';
        return err;
    });
}

function watchedMovie (req, res, next) {
    console.log('this is req.body in watchedMovie controller: ', req.body)
    let { title, watched } = req.body;
    console.log('this is title in watchedMovie controller: ', title)
    console.log('this is watched in watchedMovie controller: ', watched)
    if (watched) {
        watched = false
    } else {
        watched = true
    }
    console.log('title after conditions check: ', title)
    Movie.findOne({
        where: { title: title }
    })
    .then( record => record.update({ watched: watched }) )
    .then( () => {
        res.locals.watched
        return next()
    })
}

module.exports = { addMovie, getMovies, deleteMovie, watchedMovie }