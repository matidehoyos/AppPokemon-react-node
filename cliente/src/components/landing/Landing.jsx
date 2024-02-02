import style from "./Landing.module.css";
import { Link } from "react-router-dom";


export default function Landing() {
    return(
        <div className={style.container}>
                <div className={style.background}>
                    <img src="./landing.jpeg"  />
                </div>
                <div className={style.txtContainer}>
                <div className={style.logoPoke}></div>
                <h2>WELCOME TO THE POKEMON-APP</h2>
                <h3>Discover the features of your favourite pokemons</h3>
                <Link to="/home">
                    <button>Enter</button>
                </Link>     
            </div>    
        </div>
    )
}