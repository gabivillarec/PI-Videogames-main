import style from './landing.module.css';
import { useNavigate } from 'react-router-dom'

const Landing = ()=>{

const navigate = useNavigate()




return (
    <div className={style.container}>

      <h1>City of Games</h1>

      <p>SPA created by: Gabriel Villalobos</p>
      <button onClick={() => navigate('/home')} className={style.btn}>
        <span className={style.btn__content}>Get Into Games</span>
        <span className={style.btn__glitch}></span>
        <span className={style.btn__label}>s08</span>
      </button>
    </div>
  );
};

export default Landing;