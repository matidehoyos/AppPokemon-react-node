import './App.css'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPokemons, setTypes } from './redux/actions';
import pokemonProvider from './utils/providers/pokemonProvider';
import Home from './components/home/Home';
import Create from './components/create/Create';

function App() {
  const dispatch = useDispatch();

  const bringData = async () => {
      const pokemones = await pokemonProvider.getPokemones();
      dispatch(setPokemons(pokemones.data));
      const types = await pokemonProvider.getTypes();
      dispatch(setTypes(types.data))
  }

  useEffect(() => {
      bringData() 
  }, []);

  return (
    <div className='container'>
      <Routes>
        <Route path='/'
               element={<Home />}>
        </Route>
        <Route path='/create'
               element={<Create />}></Route>
      </Routes>
    </div>
  )
}

export default App