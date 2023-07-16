const {Videogame,Genres} = require ('../db');


const postGame = async (req,res)=>{
    try {

        const {name,description,platforms,background_image,released,genres,rating,metacritic,short_screenshots} = req.body

        if(name){
            
            const [createGame, created] = await Videogame.findOrCreate({
                where: { name },
                defaults: { description, platforms, background_image, released, rating, metacritic, short_screenshots }
            });

            if(created){
                const genresDb = await Genres.findAll({   // Busco los genres cuyos IDs se proporcionan en la DB
                    where: {
                    id: genres,
                    },
                    attributes: ['id','name'],   // Pido los atributos que quiero mostrar
                });
                
                const genreIds = genresDb.map(genre => genre.id); // Recorro el array y creo otro solo con los id 
    
                await createGame.addGenres(genreIds); // Asocio los genres al Videogame creado arriba pasándole los IDs de los genres 
    
    
                const response = {
                    id: createGame.id,
                    name: createGame.name,
                    description: createGame.description,
                    platforms: createGame.platforms,
                    background_image: createGame.background_image,
                    released: createGame.released,
                    rating: createGame.rating,
                    genres: genresDb, // Agrego los genres al objeto de la respuesta a mostrar
                };
    
                return res.json(response);  // muestro el response con la estructura con su genres
            }else{
                return res.status(400).send('The game already exist in the DB');
            }
        }

        return res.status(400).send("Game name is required");
    } catch (error) {
        return res.status(500).json({error: error.message})
    };
};


module.exports = postGame;
