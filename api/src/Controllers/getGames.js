require('dotenv').config();
const {API_KEY} = process.env
const axios = require("axios");
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const { Videogame, Genres } = require('../db.js');
const { Op } = require('sequelize');
const {mapDataResults, destrucData, mapDataDb} = require ('./FuncionesH.js'); // importo los handlers personalizados


//! Obtener Juegos API /////////////

const getGames = async (req,res) => {
    try {
    const arrayGames = []
        //como tiene paginados de 20 juegos c/pag , busco los primeros 100 juegos en las 5 primeras pag
        for(let i = 1; i <= 5; i++){
        const {data} = await axios(`${URL}&page=${i}`);
        const dataOrdenada = mapDataResults(data)
        arrayGames.push(...dataOrdenada)
        }
        
        return res.json(arrayGames);   
    } catch (error) {
        return res.status(500).json({error: error.message});
    };
};

//! Obtener Juegos DB /////////////

const getDbGames = async (req,res) => {
    try {
        const game = await Videogame.findAll({where:{db : true}, include:[{model:Genres}]}) // Incluyo la tabla de genres
        const arrayGames = [...game]
        const arrayOrdenado = mapDataDb(arrayGames)

        if(arrayGames) return res.json(arrayOrdenado)

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//! Obtener Un Juego por ID en DB o API /////////////

const getGameById = async (req,res) => {
    try {
    const {id} = req.params

    // Verificamos si el id no es número y trata de obtener el videojuego de la base de datos 
    if (isNaN(id)) {
        const game = await Videogame.findByPk(id, {include: Genres});
        if (game) return res.json(game);
        return res.status(400).send("That Game doesn't exist in the DB");
      }    

    const {data} = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const dataID = destrucData(data);

    return res.json(dataID)  
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

//! Obtener Un Juego por Query ? ///////////// 

const getGameByQuery = async (req,res)=>{ 
    try {
    const {name} = req.query;

    if (!name) {
        return res.status(400).json({ error: "A name is required in the query" });
      }

    //busco en DB    
    const dbName = await Videogame.findAll({where :{name: {
        [Op.iLike]: `%${name}%`}, // los % son comodines en sequelize para cualquier otro carácter
        },include:[{model:Genres}]
    });    
    //busco en API
    const {data} = await axios (`${URL}&search=${name}`);
    
    const dataQuery = mapDataResults(data)
    //concateno el array de API con la dbName
    const games = dataQuery.concat(dbName).slice(0,15);

    games.length 
    ? res.json(games)
    : res.status(400).send("Don't have eny coincidence");
    
    } catch (error) {
    return res.status(500).json({error: error.message});    
    }
};


module.exports = {
    getGames,
    getGameById,
    getGameByQuery,
    getDbGames
};