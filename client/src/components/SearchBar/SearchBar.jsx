import style from './searchBar.module.css';
import { useState} from 'react';
import { useDispatch} from 'react-redux';
import { searchByName, setLoading, cleanState, getGames, setPage } from '../../Redux/actions';


const SearchBar = () => {
// State y dispatch
  const [value, setValue] = useState('');
  const dispatch = useDispatch();



// Handlers del input
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(cleanState());
      dispatch(searchByName(value)); // busco por query (Enter)
      dispatch(setPage(1));
   
    }
  };

  const handleSearch = () => {
    dispatch(cleanState());
    dispatch(searchByName(value)); // busco por query (Click)
    dispatch(setPage(1));
  
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