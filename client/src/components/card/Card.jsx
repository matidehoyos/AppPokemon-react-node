import { Link } from "react-router-dom";
import style from "./Card.module.css";


export default function ({pokemon}) {
    return(

        <Link to={`/detail/${pokemon.id}`}>
             <div className={style.container}>
                <h2>{pokemon.name?.toUpperCase()}</h2>
                <div className={style.image}>
                    <img src={pokemon.image}/>
                </div>
                <h4>Attack: <span className={style.attackValue}>{pokemon.attack}</span></h4>
                <h3>{pokemon.types?.join(" - ")?.toUpperCase()}</h3>
            </div>
        </Link>
            
    )
}