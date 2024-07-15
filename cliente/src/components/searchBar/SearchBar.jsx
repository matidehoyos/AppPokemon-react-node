import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../../redux/actions";


export default function SearchBar() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPokemon(input));
        setInput("");
    }
    
    return(
        <div className={style.container}>
            <input name="search" 
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)} 
                   placeholder="Insert pokemons name here..." 
                   className={style.input}
                   />
            
            <button className={style.button} onClick={handleSearch}>Search</button>
        </div>
    )
}