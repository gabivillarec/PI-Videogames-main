require('dotenv').config();
const {API_KEY} = process.env
const axios = require("axios");
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
const { Genres } = require('../db.js');

const getGenres = async (req,res)=>{
    try {
        let genres = await Genres.findAll({ attributes: ['id', 'name'] });// incluyo los atributos que quiero ver

        if(genres.length === 0){  // cargo la tabla con la API 
            const {data} = await axios (URL);
            const genMap = data.results.map(gen=>{let {name} = gen; return({name})});
            genres = genMap;
            
            await Genres.bulkCreate(genres); // permite crear múltiples registros en una base de datos
        }
        
        return res.json(genres);
    } catch (error) {
       return new Error({error: error.message}); 
    }
};


module.exports = getGenres;