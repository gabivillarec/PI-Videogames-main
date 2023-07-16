import style from './header.module.css'
import { useNavigate , useLocation } from 'react-router-dom'
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';

const Header = (props)=>{

    // Controlador de la barra lateral
    const [showSidebar , setShowSidebar] = useState(false);

    const handlerSidebar = ()=>{
        setShowSidebar(!showSidebar);
    }

    const closeBar = () =>{
        setShowSidebar(!setShowSidebar)
    }

    const navigate = useNavigate()
    const location = useLocation()

    return(
        <div className={style.header}>

            <div className={style.container}>

            <button className={style.btnN} onClick={handlerSidebar}>
            {showSidebar ? '✕' : '☰'}
            </button>

            {location.pathname === "/home" ? <SearchBar/> : null} 


            </div>

        {showSidebar &&  <div className={style.sidebar}>
                            {location.pathname !== "/home" && <button onClick={() => { navigate('/home'); closeBar()}} className={style.btn}>
                            <span className={style.btn__content}>Home</span>
                            <span className={style.btn__glitch}></span>
                            <span className={style.btn__label}>d08</span>
                            </button>}
                            <button onClick={()=> { navigate('CreateVideoGame'); closeBar()}} className={style.btn}>
                            <span className={style.btn__content}>Create VideoGame</span>
                            <span className={style.btn__glitch}></span>
                            <span className={style.btn__label}>m03</span>    
                            </button>
                            <button onClick={()=>{ navigate('/'); closeBar() }} className={style.btn}>
                            <span className={style.btn__content}>Landing Page</span>
                            <span className={style.btn__glitch}></span>
                            <span className={style.btn__label}>a92</span>
                            </button>
                        </div>}

        </div>
    )
};

export default Header;