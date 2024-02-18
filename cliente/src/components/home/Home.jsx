import axios from "axios";
import { useLocation } from "react-router-dom";
import style from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPokemons } from "../../redux/actions";
import Cards from "../cards/Cards";
import NavBar from "../navBar/NavBar";


export default function() {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios('http://localhost:3002/pokemons');
            const pokemones = response.data;
            dispatch(setPokemons(pokemones));
          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        }
        fetchData();
      }, [dispatch]);
    


    return(
        <div className={style.container}>

          {  location.path !== "/" ? <NavBar /> : null  }
            <Cards /> 
        </div>
    )
}