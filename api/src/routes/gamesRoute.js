const { Router } = require('express');
const {getGames, getGameById,getGameByQuery} = require('../Controllers/getGames');
const postGame = require('../Controllers/postGame');

const gamesRouter = Router();

gamesRouter.get('/', getGames);

gamesRouter.get('/name', getGameByQuery);

gamesRouter.get('/:id', getGameById);

gamesRouter.post('/', postGame);

module.exports = gamesRouter;