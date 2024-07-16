import { Link } from "react-router-dom";
import style from "./Card.module.css";


export default function ({pokemon}) {
    return(

        <Link to={`/detail/${pokemon.id}`}>
             <div className={style.container}>
                <div className={style.attack}>
                     <h4>{pokemon.attack}</h4>
                </div>
                <h2>{pokemon.name?.toUpperCase()}</h2>
                <div className={style.image}>
                    <img src={pokemon.image}/>
                </div>
                <div className={style.type}>
                    <h3>{pokemon.types?.join(" - ")?.toUpperCase()}</h3>
                </div>
            </div>
        </Link>
            
    )
}