import style from './searchBar.module.css';
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { searchByName, setLoading, cleanState, getGames } from '../../Redux/actions';


const SearchBar = (props) => {
// State y dispatch
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

// Life Cicle & useSelector
  useEffect(() => {
    return () => {
      dispatch(cleanState());
    };
  }, [dispatch]);


// Handlers del input
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchByName(value)); // busco por query (Enter)
    }
  };

  const handleSearch = () => {
    dispatch(searchByName(value)); // busco por query (Click)
  };

  const handleReset = () => {
    dispatch(cleanState()); // limpio el estado
    dispatch(setLoading(true)) // muestro la pantalla de loading  
    dispatch(getGames()).then(()=> dispatch(setLoading(false))); // recargo el estado global y el loading
    setValue('');
  };

//? RENDER
  return (

    <div className={style.Bar}>
      <input type="text" value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=" Search Game"
      />

      <button onClick={handleSearch} className={style.btn}>
      <span className={style.btn__content}>Search</span>
      <span className={style.btn__glitch}></span>
      </button>
      <button onClick={handleReset} className={style.btn}>
      <span className={style.btn__content}>Reset</span>
      <span className={style.btn__glitch}></span>
      </button>
    </div>

  );
};

export default SearchBar;