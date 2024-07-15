import { useDispatch } from "react-redux";
import style from "./SearchedCard.module.css";
import { resetSearched } from "../../redux/actions";

export default function SearchedCard ({pokemon}) {
    const dispatch = useDispatch();

    const handleCloseSelected = () => {
        dispatch(resetSearched());
    }

    return(
            <div className={style.container}>
                <div className={style.card}>
                        <div className={style.image}>
                            <img src={pokemon.image} alt={pokemon.name} />
                        </div>
                         <div className={style.txt}>
                            <div className={style.buttonClose}>
                                <button onClick={handleCloseSelected} className={style.close}>X</button>
                            </div> 
                            <h2 className={style.h2}>{pokemon.name.toUpperCase()}</h2>  
                            <h4>ATTACK: <span className={style.valores}> {pokemon.attack}</span></h4>
                            <h4>DEFENSE: <span className={style.valores}> {pokemon.defense}</span></h4>
                            <h4>SPEED: <span className={style.valores}> {pokemon.speed}</span></h4>
                            <h4>HEIGHT: <span className={style.valores}> {pokemon.height}</span></h4>
                            <h4>WEIGHT: <span className={style.valores}> {pokemon.weight}</span></h4>
                            <h3> {pokemon.types.join(', ').toUpperCase()}</h3>
                        </div>
                </div>
            </div>      
    
    )
}