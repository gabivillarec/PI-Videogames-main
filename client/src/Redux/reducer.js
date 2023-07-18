import {  LOADING ,GET_GAMES_API, GET_GAMES_DB, CLEAN_STATE, SEARCH_NAME, GENRES_SORT, AZ_SORT, GET_GENRES, POST_GAME, GET_ID, ID_CLEAN, SET_PAGE } from "./actions";

const initialState = {
    games : [],
    allGames : [],
    gameID:{},
    api:[],
    db:[],
    genres : [],
    loading : true,
    currentPage: 1
};


const reducer = (state = initialState, {type, payload})=>{

    switch (type){

        case LOADING : return{
          ...state,
          loading: payload
        };

        case SET_PAGE : return{
          ...state,
          currentPage: payload
        }

        case GET_GAMES_DB : return{
          ...state,
          db: payload
        
        };

        case GET_GAMES_API: return{
            ...state,
            allGames: [...state.db, ...payload],
            games: [...state.db, ...payload],
            api:payload
        };

        case GET_ID : return{
          ...state,
          gameID: payload
        };

        case ID_CLEAN : return{
          ...state,
          gameID: {}
        };

        case CLEAN_STATE: return{
            ...state,
            games: [],
            genres: []
        };

        case SEARCH_NAME : return{
            ...state,
            games : payload,
            allGames: payload,
        };

        case GET_GENRES : return{
          ...state,
          genres : payload
        };

        case POST_GAME : 
  
        return{
          ...state,
          db : [...state.db, payload]
        };

        //? ORDENAMIENTOS
        case GENRES_SORT : 
            const filterGenres = state.allGames.filter(el => el.genres.find(gm => gm.name.includes(payload)));

            if(payload === "DB"){
              return {...state, games: state.db}
            };

            if(payload === "API"){
              return {...state, games: state.api}
            };

            return{
                ...state,
                games: payload === "All" 
                ? [...state.allGames]
                : filterGenres
            };

            case AZ_SORT: // Creo una copia de games en cada caso (ya que sort ordena el array y no crea un nuevo array )
                const sortedAZ = [...state.games].sort((a, b) => a.name.localeCompare(b.name)); // Utilizo localeCompare para realizar la comparación según la region actual.
                const sortedZA = [...state.games].sort((a, b) => b.name.localeCompare(a.name));
                const sortedRatingMayor = [...state.games].sort((a, b) => b.rating - a.rating);
                const sortedRatingMenor = [...state.games].sort((a, b) => a.rating - b.rating);
              
                if (payload === "AZ") {
                  return { ...state, games: sortedAZ };
                };
                if (payload === "ZA") {
                  return { ...state, games: sortedZA };
                };
                if (payload === "mayor") {
                  return { ...state, games: sortedRatingMayor };
                };
                if (payload === "menor") {
                  return { ...state, games: sortedRatingMenor };
                };
              
                return { ...state };


        default : return {...state}
    };
};



export default reducer;

