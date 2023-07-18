import style from './formCreater.module.css'
import CheckBoxes from './CheckBoxes';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import {getGenres,cleanState, postGame} from '../../Redux/actions';
import validations from './validations/validations';
import { useNavigate } from 'react-router-dom'

const FormCreater = (props)=>{

    // Local States
    const [form , setForm] = useState({
        name : "",
        description : "",
        platforms : "",
        background_image : "",
        released : "",
        genres : [],
        rating : "",
    });
    
    const [errors, setErrors] = useState({});

    
    // Life Cicle
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getGenres())

      //  return () => dispatch(cleanState());
    },[dispatch]);

    // useSelector (Genres & Db) & useNavigate
    const genres = useSelector(state=>state.genres);
    const db = useSelector (state => state.db); // Llamo a los juegos de DB para validar
    const navigate = useNavigate();
    
    // HANDLERS
    const handleSubmit = (event)=>{
        event.preventDefault();
        dispatch(postGame(form));
        navigate("/home");
    }

    const handleChange = (event) =>{
        setForm ({...form, [event.target.name] : event.target.value}); 
        
        setErrors (validations({...form, [event.target.name] : event.target.value},db))
    }

    const handleCheckbox = (event) => {
        const checked = event.target.checked;
        const id = +event.target.value;
      
        if (checked) {
          // Agrego el género a genres
          setForm({ ...form, genres: [...form.genres, id] });
        } else {
          // Remuevo el género de genres
          setForm({ ...form, genres: form.genres.filter((genreId) => genreId !== id) });
        }
      };

    //? RENDER
    return(

        <div className={style.container}>


            <form action="create" className={style.form} onSubmit={handleSubmit}>
            <h1>- CREATE A GAME -</h1>

                <label htmlFor="name">- NAME -</label>
                <input type="text" name="name" onChange={handleChange} className={style.barras} placeholder=' ex : Grand Theft Auto...'/>
                
                {errors.name && <p className={style.errores}>{errors.name}</p>}
                
                <label htmlFor="platforms">- PLATFORMS -</label>
                <p className={style.plataformas}>You can create a platform to your liking or choose from the following list: <br/><br/>"Atari 2600, Nintendo Entertainment System (NES), Sega Genesis, Super Nintendo Entertainment System (SNES), Game Boy, PlayStation, Nintendo 64, Game Boy Color, Sega Dreamcast, PlayStation 2, Xbox, GameCube, Game Boy Advance, PlayStation Portable (PSP), Nintendo DS, Xbox 360, PlayStation 3, Wii, Nintendo 3DS, PlayStation Vita, Wii U, PlayStation 4, Xbox One, Nintendo Switch, PlayStation 5, Xbox Series X/S, Android, iOS, PC"</p>
                <input type="text" name="platforms" onChange={handleChange} className={style.barras} placeholder=' ex : PC , PlayStation...' />

                {errors.platforms && <p className={style.errores}>{errors.platforms}</p>}

                <label htmlFor="background_image">- IMAGE = URL -</label>
                <input type="text" name="background_image" onChange={handleChange} className={style.barras} placeholder=' ex : https://example.com/VideoGame_image.jpg...' />

                {errors.background_image && <p className={style.errores}>{errors.background_image}</p>}

                <label htmlFor="released">- RELEASED -</label>
                <input type="date" name="released" onChange={handleChange} className={style.barras} />

                {errors.released && <p className={style.errores}>{errors.released}</p>}

                <label htmlFor="description">- DESCRIPTION -</label>
                <textarea name="description" rows="20" maxLength="1000" onChange={handleChange} placeholder='ex :Grand Theft Auto V (GTA 5) is an open-world action-adventure video game developed by Rockstar North and published by Rockstar Games. Set in the fictional city of Los Santos, the game offers players a vast and immersive environment to explore...' />

                {errors.description && <p className={style.errores}>{errors.description}</p>}

                <label htmlFor="rating">- RATING -</label>
                <input type="text" name="rating" onChange={handleChange} className={style.barras} placeholder='0/5' />

                {errors.rating && <p className={style.errores}>{errors.rating}</p>}

                <p>- GENRES -</p>
                <CheckBoxes genres={genres} onChange={handleCheckbox} />  {/* paso genres como props */}

                <button type="submit" className={style.btn} disabled={Object.keys(errors).length > 0 || !form.name || !form.description || !form.platforms 
                    || !form.background_image || !form.released || !form.rating || !form.genres} onClick={handleSubmit}>
                        <span className={style.btn__content}>Create Game</span>
                        <span className={style.btn__glitch}></span>
                        <span className={style.btn__label}>00X</span>
                        </button>
                
            </form>

        </div>

    )
};

export default FormCreater;