import style from "./Card.module.css";
import TypeCard from "../typeCard/TypeCard";
import Attack from "../attack/Attack";
import PokemonImage from "../pokemonImage/PokemonImage";


export default function ({pokemon, onSelect}) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase();
    
    return(
        <div onClick={onSelect}>
             <div className={style.container}>
                <TypeCard types={pokemon.types} />
                <PokemonImage image={pokemon.image}/>
                <h2>{name}</h2>
                <Attack attack={pokemon.attack} />
            </div>
        </div>
            
    )
}