import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";


export default function Detail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();

    const closeDetail = () => {
        navigate("/home");
    }

    useEffect(()=>{
            axios(`https://pokemon-proyecto-production.up.railway.app/pokemons/${id}`)
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
            <div className={style.card}>
                <div className={style.image}>
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
                    <div className={style.txt}>
                            <div className={style.buttonClose}>
                                <Link to='/home'>
                                    <button onClick={closeDetail} className={style.close}>X</button>
                                </Link>
                            </div> 
                            <h2 className={style.h2}>{pokemon.name?.toUpperCase()}</h2>  
                            <h4>ATTACK: <span className={style.valores}> {pokemon.attack}</span></h4>
                            <h4>DEFENSE: <span className={style.valores}> {pokemon.defense}</span></h4>
                            <h4>SPEED: <span className={style.valores}> {pokemon.speed}</span></h4>
                            <h4>HEIGHT: <span className={style.valores}> {pokemon.height}</span></h4>
                            <h4>WEIGHT: <span className={style.valores}> {pokemon.weight}</span></h4>
                            <h3> {pokemon.types?.join(', ')?.toUpperCase()}</h3>
                </div>
                </div>
        </div>
    )
}