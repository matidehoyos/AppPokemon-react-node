import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Home.module.css";
import Card from "../card/Card";
import Filters from "../filters/Filters";
import NavBar from "../navBar/NavBar";
import Paginator from "../paginator/Paginator";
import FilterTypes from "../filterTypes/FilterTypes";
import Loader from "../loader/Loader";
import NotPokemon from "../notPokemon/NotPokemon";
import DetailPokemon from "../detailPokemon/DetailPokemon";
import SearchedCard from "../searchedCard/SearchedCard";

export default function Home() {
  const pokemons = useSelector(state => state.pokemons);
  const searchedPokemon = useSelector(state => state.searchedPokemon);
  const filterOrigin = useSelector(state => state.filterOrigin);
  const filterType = useSelector(state => state.filterType);
  const orderBy = useSelector(state => state.orderBy);
  const sort = useSelector(state => state.sort);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPokes = pokemons.filter((pokemon) => {
    if (filterOrigin === "all") return true;
    return pokemon.origin === filterOrigin;
  });

  const filteredPokemons = filteredPokes.filter((pokemon) => {
    const matchesType = filterType === "all" || pokemon.types.includes(filterType);
    return matchesType;
  });

  const pageSize = 8;
  const indexOfLastPokemon = currentPage * pageSize;
  const indexOfFirstPokemon = indexOfLastPokemon - pageSize;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pageSize);

  if (loading) return <Loader />;

  return (
    <div className={style.container}>
      <NavBar />
      { !selectedPokemon && !searchedPokemon && <Filters /> }
      
      <div className={style.subcontainer}>
        { !selectedPokemon && !searchedPokemon && <FilterTypes /> }

        <div className={style.cards}>
          {selectedPokemon ? (
            <DetailPokemon pokemon={selectedPokemon} onBack={() => setSelectedPokemon(null)}
            />
          ) : (
            <>
              {!loading && searchedPokemon && <SearchedCard pokemon={searchedPokemon} onBack={() => setSelectedPokemon(null)} />}
                {!loading && !searchedPokemon && currentPokemons
                    .sort((a, b) => {
                      if (orderBy === "name") {
                        return a.name.localeCompare(b.name) * (sort === "asc" ? 1 : -1);
                      } else if (orderBy === "attack") {
                        return (a.attack - b.attack) * (sort === "asc" ? 1 : -1);
                      }
                    })
                    .map((pokemon, index) => (
                      <div key={index}>
                        <Card 
                          pokemon={pokemon} 
                          onSelect={() => setSelectedPokemon(pokemon)} 
                        />
                      </div>
                    ))}

              {!loading && currentPokemons.length === 0 && <NotPokemon />}

              {!searchedPokemon && !loading && currentPokemons.length > 0 && (
                <Paginator
                  currentPokemons={currentPokemons}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
