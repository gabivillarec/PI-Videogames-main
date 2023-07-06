const { Router } = require('express');
const getGenres = require ('../Controllers/getGenres')

const genresRouter = Router();

genresRouter.get('/genres', getGenres)

module.exports = genresRouter;
