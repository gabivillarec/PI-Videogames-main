import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter} from 'react-router-dom'
import store from './Redux/store'
import { Provider } from 'react-redux'
import axios from "axios";

//? avisamos a axios que todas las peticiones tengan esta misma base Url
//axios.defaults.baseURL = "http://localhost:3001" 

axios.defaults.baseURL = "https://api.render.com/deploy/srv-cj99c0avvtos73ceaa60?key=8rRmw65w51M" 


ReactDOM.render(
<Provider store = {store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
</Provider>,

 document.getElementById('root')
);