import style from "./NotPokemon.module.css";


export default function NotPokemon() {

    return(
        <div className={style.container}>
            <h3>There are no pokemons<br/>of that type yet...</h3>
            <img src="./sad.png" />
        </div>
    )
}