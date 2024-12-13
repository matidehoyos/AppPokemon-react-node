import { typeColors } from "../../utils/providers/typeColors";
import style from "./DetailPokemon.module.css";


export default function DetailPokemon({pokemon, onBack}) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase();

    return(
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.image}>
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className={style.txt}>
                    <div className={style.buttonClose}>
                        <button onClick={onBack} className={style.close}>X</button>
                    </div> 
                    <h2 className={style.h2}>{name}</h2>  
                    <h4>Attack: <span className={style.valores}> {pokemon.attack}</span></h4>
                    <h4>Defense: <span className={style.valores}> {pokemon.defense}</span></h4>
                    <h4>Speed: <span className={style.valores}> {pokemon.speed}</span></h4>
                    <h4>Height: <span className={style.valores}> {pokemon.height}</span></h4>
                    <h4>Weight: <span className={style.valores}> {pokemon.weight}</span></h4>
                    <div className={style.typesContainer}>
                        {pokemon.types.map((type, index) => {
                            const backgroundColor = typeColors[type.toLowerCase()]; 
                            return (
                                <h3 
                                    key={index} 
                                    style={{ backgroundColor }} 
                                    className={style.types}
                                >
                                    {type.toUpperCase()}
                                </h3>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}