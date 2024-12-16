import style from './SearchBar.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from 'react-icons/fa'
import { searchPokemon } from '../../redux/actions';



export default function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const pokemons = useSelector((state) => state.pokemons); 
    const dispatch = useDispatch();
    const [abierto, setAbierto] = useState(false)

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setInput(value);
        if (value.length > 0) {
            const filteredSuggestions = pokemons.filter((pokemon) => 
                pokemon.name.toLowerCase().includes(value)
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (pokemonName) => {
        setInput(pokemonName);
        setSuggestions([]);
        dispatch(searchPokemon(pokemonName.toLowerCase())); 
    };
    

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPokemon(input.toLowerCase()));
        setInput("");
        setSuggestions([]);
        setAbierto(false)
    };

    const handleOpen = () => {
        setAbierto(true)
    }

    return (
        <div className={style.container}>
            <button className={style.open} onClick={handleOpen}><FaSearch /></button>
            <div className={style.caja} style={{right: abierto ? '0' : '-1000px' }}>
                <label >
                    <input 
                        name="search" 
                        type="text" 
                        value={input}
                        onChange={handleInputChange} 
                        placeholder="Search Pokemon..." 
                        className={style.input}
                    />
                    <button className={style.button} onClick={handleSearch}>
                        <FaSearch />
                    </button>
                </label>
            </div>
            {suggestions.length > 0 && (
                <ul className={style.suggestions}>
                    {suggestions.map((pokemon) => (
                        <li 
                            key={pokemon.id} 
                            onClick={() => handleSelectSuggestion(pokemon.name)}
                        >
                            {pokemon.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
