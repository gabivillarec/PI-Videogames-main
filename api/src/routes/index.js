const { Router } = require('express');
const gamesRouter = require ('./gamesRoute');
const genresRouter = require ('./genresRoute')

const router = Router();

router.use("/videogames", genresRouter);
router.use("/videogames", gamesRouter);



module.exports = router;
