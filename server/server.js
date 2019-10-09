const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const movieController = require('../controllers/movieController.js');

app.use(bodyParser.json());

app.post('/movie', movieController.addMovie)

app.get('/', (req, res) => {
    res.send('hello from server, world!')
})

app.listen(PORT, () => console.log(`Movielist is listening on PORT ${PORT}`));
