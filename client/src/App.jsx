
import './App.css'
import Landing from './components/landing/Landing'
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import Create from './components/create/Create';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTypes } from './redux/actions';
import NavBar from './components/navBar/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const createdPokemon = useSelector(state => state.createdPokemon);

  useEffect(() => {
       axios("https://pokemon-proyecto-production.up.railway.app/pokemons/types")
        .then(
            ({data}) => {
              dispatch(setTypes(data))
            }
        )
  }, [createdPokemon]);

  return (
    <div>
       { location.pathname !== '/' ? <NavBar /> : null }
      <Routes>
        <Route path="/"
               element={<Landing />}>
        </Route>
        <Route path='/home'
               element={<Home />}>
        </Route>
        <Route path='/detail/:id'
               element={<Detail />}>
        </Route>
        <Route path='/create'
               element={<Create />}></Route>
      </Routes>
    </div>
  )
}

export default App