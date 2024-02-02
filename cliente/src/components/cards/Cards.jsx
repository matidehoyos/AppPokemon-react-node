import style from "./Cards.module.css";
import { useSelector } from "react-redux";
import Card from "../card/Card";
import Filters from "../filters/Filters";
import SearchedCard from "../searchedCard/SearchedCard";
import { useState } from "react";


export default function Cards () {

    const pokemons = useSelector(state => state.pokemons);
    const searchedPokemon = useSelector(state => state.searchedPokemon);
    const filterOrigin = useSelector(state => state.filterOrigin);
    const filterType = useSelector(state => state.filterType);
    const orderBy = useSelector(state => state.orderBy);
    const sort = useSelector(state => state.sort);
    const [currentPage, setCurrentPage] = useState(1);


    const filteredPokes = pokemons.filter((pokemon) => {
        if (filterOrigin === 'all') {
          return true; 
        } else {
          return pokemon.origin === filterOrigin; 
        }
      });

    const matchesName =
        orderBy !== "name" ? filteredPokes.sort((a,b) => a.attack - b.attack) : 
                             filteredPokes.sort((a,b) => a.name.localeCompare(b.name));

    const filteredPokemons = filteredPokes.filter((pokemon) => {
    const matchesType = filterType === 'all' || pokemon.types.includes(filterType);

   return matchesName && matchesType;
    }); 
    
    const pageSize = 12;
    const indexOfLastPokemon = currentPage * pageSize;
    const indexOfFirstPokemon = indexOfLastPokemon - pageSize;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    return(

    <div className={style.container}>
         <Filters /> 
         { searchedPokemon && (
          <SearchedCard pokemon={searchedPokemon}/>
          )}
        <div className={style.pikaWalking}>
           <img src="./pikaWalk.gif"></img>
        </div>
        <div className={style.cardsContainer}>
          { currentPokemons
            .sort((a, b) => {
                if (orderBy === 'name') {
                  return a.name.localeCompare(b.name) * (sort === 'asc' ? 1 : -1);
                } else if (orderBy === 'attack') {
                  return (a.attack - b.attack) * (sort === 'asc' ? 1 : -1);
                }
              })
            .map((pokemon,index) => (
                    <div key={index}>
                        <Card pokemon={pokemon}/>
                    </div>
                ))}
        </div>


        <div className={style.pagination}>
                {Array.from({ length: Math.ceil(currentPokemons.length / pageSize) }, (_, index) => (
                  <div key={index}>
                      <button key="previous" 
                              onClick={() => paginate(currentPage -1)}
                               disabled={currentPage === 1} >
                        Previous
                      </button>
                      <span className={style.pagination_span}>{`Page: ${currentPage}`}</span>
                      <button key="next" 
                              onClick={() => paginate(currentPage + 1)}
                              disabled={currentPage === 4}>
                        Next
                      </button>
                  </div>
                ))}
        </div>
  </div> 
    )
}