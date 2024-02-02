import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import NavBar from "../navBar/NavBar";


export default function Detail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    const closeDetail = () => {
        navigate("/home");
    }

    useEffect(()=>{
            axios(`http://localhost:3001/pokemons/${id}`)
            .then(
                ({data}) => {
                     if(data.name){
                        setPokemon(data);
                     } else {
                     alert("No se encontrarton personajes con ese id.")
                 }})
                },[id]);

    return(
        <div className={style.container}>
            <NavBar />
         <h2>Pokemon's details</h2>

         <div className={style.cardDetail}>
            <div className={style.image}>
                <h2 className={style.namePoke}>{pokemon.name?.toUpperCase()}</h2> 
                <img src={pokemon.image}/>
            </div>
         <div className={style.card}>
            <div className={style.close}>
                <button onClick={closeDetail}>X</button>
            </div>
            <h4>HP: <span className={style.value}>{pokemon.hp}</span></h4>
            <h4>Attack: <span className={style.value}>{pokemon.attack}</span></h4>
            <h4>Defense: <span className={style.value}>{pokemon.defense}</span></h4>
            <h4>Speed: <span className={style.value}>{pokemon.speed}</span></h4>
            <h4>Height: <span className={style.value}>{pokemon.height}</span></h4>
            <h4>Weight: <span className={style.value}>{pokemon.weight}</span></h4>
            <h3>{pokemon.types?.join(" - ").toUpperCase()}</h3>
        </div>  
        </div>
     </div>
    )
}