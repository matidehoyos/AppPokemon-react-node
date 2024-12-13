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
    };

    return (
        <div className={style.container}>
            <label>
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
