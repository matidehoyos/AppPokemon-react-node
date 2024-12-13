import style from "./PokemonImage.module.css";

export default function PokemonImage({image}) {


    return(
        <div className={style.image}>
            <img src={image} alt="Imagen pokemon."/>
        </div>
    )
}