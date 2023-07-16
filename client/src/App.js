import style from './App.module.css'
import { Route, Routes, useLocation} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import GridCards from './components/GridCards/GridCards.jsx';
import Detail from './components/Detail/Detail';
import FormCreater from './components/FormCreater/FormCreater';
import Header from './components/Header/Header';


function App() {

const location = useLocation();

  return (

    <div className={style.App}>
      
    {location.pathname !== '/' ? <Header/> : null}

    <Routes>
      <Route path= '/' element={<Landing/>}/>
      <Route path= '/home' element={<GridCards/>}/>
      <Route path = '/detail/:id' element={<Detail/>}/>
      <Route path='/CreateVideoGame' element={<FormCreater/>}/>
    </Routes>

    </div>
  );
};

export default App;
