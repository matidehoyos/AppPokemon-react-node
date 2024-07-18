import style from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import Filters from "../filters/Filters";
import SearchedCard from "../searchedCard/SearchedCard";
import { useEffect, useState } from "react";
import { setFilterType } from "../../redux/actions";


export default function Cards () {

    const pokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);
    const searchedPokemon = useSelector(state => state.searchedPokemon);
    const filterOrigin = useSelector(state => state.filterOrigin);
    const filterType = useSelector(state => state.filterType);
    const orderBy = useSelector(state => state.orderBy);
    const sort = useSelector(state => state.sort);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }, [pokemons, filterOrigin, filterType, orderBy, sort ]);


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
    const totalPages = Math.ceil(filteredPokemons.length / pageSize);


    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleType = (e) => {
      dispatch(setFilterType(e.target.value))
    }
    
    return(

    <div className={style.container}>
        { !searchedPokemon && (
            <Filters /> 
          )}
         { searchedPokemon && (
          <SearchedCard pokemon={searchedPokemon}/>
          )}
          {
            !searchedPokemon && (
            <div className={style.subcontainer}>
              <div className={style.typesContainer}>
                <div className={style.types}>
                  <button value="all" onClick={handleType}>All types</button>
                  {types.map(type => (
                    <li key={type.id} value={type.name}><button value={type.name} onClick={handleType}>{type.name}</button></li>
                  ))}
                </div>
              </div>
                  <div className={style.cardsContainer}>
                  {loading ? (
                  <div className={style.loader}>
                    <h3>Loading Pokemons...</h3>
                    <img src="./pikaWalk.gif" alt="Loading..." />
                  </div>
                ) : (
                    <div className={style.cards}>
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
                          {
                            currentPokemons.length === 0 && (
                              <div className={style.notFound}>
                                <h3>There are no pokemons of that type yet</h3>
                                <img src="./sad.png" />
                              </div>
                            )
                          }
                    </div>
                  )}                    
                    {
                            currentPokemons.length !== 0 &&  !loading && (
                            <div className={style.pagination}>
                                    {Array.from({ length: Math.ceil(currentPokemons.length / pageSize) }, (_, index) => (
                                      <div key={index}>
                                          <button key="previous" 
                                                  onClick={() => paginate(currentPage -1)}
                                                  className={style.boton}
                                                  disabled={currentPage === 1} >
                                            Previous
                                          </button>
                                          <span className={style.pagination_span}>{`Page: ${currentPage}`}</span>
                                          <button key="next" 
                                                  className={style.boton}
                                                  onClick={() => paginate(currentPage + 1)}
                                                  disabled={currentPage === totalPages}>
                                            Next
                                          </button>
                                      </div>
                                    ))}
                          </div>
                          )}
                      </div>
            </div>
            )}
        </div>
    )
}