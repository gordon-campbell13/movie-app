const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const movieController = require('../controllers/movieController.js');

app.use(bodyParser.json());

app.delete('/movie', movieController.deleteMovie, movieController.getMovies, (req, res) => {
    return res.status(200).json(res.locals.movies);
})

// app.patch('/movie', movieController.watchedMovie, movieController.getMovies, (req, res) => {
//     return res.status(200).json(res.locals.movies);
// })

app.patch('/movie', movieController.watchedMovie, (req, res) => {
    return res.status(200).json(res.locals.watched);
})

app.post('/movie', movieController.addMovie, movieController.getMovies, (req, res) => {
    return res.status(200).json(res.locals.movies);
})

app.get('/movie', movieController.getMovies, (req, res) => {
    return res.status(200).json(res.locals.movies);
})

// serves the static bundle when scripts are run in index.html
app.use('/build', express.static(path.join(__dirname, '../build')));

// serves the index.html for all / requests
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
})

app.use((err, req, res, next) => {
    const defaultErrObj = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    // overwrite properties on errObj
    const errObj = { ...defaultErrObj, ...err };
    console.log('Error log: ', err);
    // set status code and send message as json obj
    res.status(errObj.status).json(errObj.message);

})

app.listen(PORT, () => console.log(`Movielist is listening on PORT ${PORT}`));
