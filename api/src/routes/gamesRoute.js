const { Router } = require('express');
const {getGames, getGameById,getGameByQuery,getDbGames} = require('../Controllers/getGames');
const postGame = require('../Controllers/postGame');

const gamesRouter = Router();

gamesRouter.get('/', getGames);

gamesRouter.get ('/db', getDbGames);

gamesRouter.get('/name', getGameByQuery);

gamesRouter.get('/:id', getGameById);

gamesRouter.post('/', postGame);

module.exports = gamesRouter;