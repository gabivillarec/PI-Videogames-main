import style from './checkBoxes.module.css';


const FormCreater = ({ genres, onChange }) => {

  return (
    <div className={style.container}>

        {genres.map((genre) => (
          
          <div className={style.box} key={genre.id}>

            <div className={style.text}>
            <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
            </div> 
            
            <input type="checkbox" onChange={onChange} 
              id={`genre-${genre.id}`}
              name="genres"
              value={genre.id}
            />
          </div>
        ))}

    </div>
  );
};

export default FormCreater;