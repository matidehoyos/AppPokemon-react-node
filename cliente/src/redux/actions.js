import axios from "axios";


export const setPokemons = (pokemons) => {
    return {
        type: "SET_POKEMONS",
        payload: pokemons,
    }
}

export const searchPokemon = (name) => {
    return{
        type: "SEARCH_POKEMON",
        payload: name 
    }
}

export const resetSearched = () => {
    return{
        type: "RESET_SEARCHED"
    }
}

export const setTypes = (types) => {
    return {
        type: "SET_TYPES",
        payload: types
    }
}

export const createPokemon = (formData) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:3001/pokemons", formData);
        dispatch({ type: 'CREATE_POKEMON', payload: response.data });
    } catch (error) {
        dispatch({
            type: 'ERROR_CREATED_POKEMON',
            payload: {
              status: error.response.status,
              message: error.message,
              details: error.response.data.error + " error to create pokemon",
            },
          });
    } 
}

export const resetCreatedPokemon = () => {
    return {
        type: 'RESET_CREATED_POKEMON'
    }
}

export const setOrigin = (origin) => {
    return{
        type: 'SET_FILTER_ORIGIN',
        payload: origin
    }
}

export const setFilterType = (filter) => {
    return{
        type: 'SET_FILTER_TYPE',
        payload: filter
    }
}

export const setOrderBy = (order) => {
    return{
        type: 'SET_ORDERBY',
        payload: order
    }
}

export const setSort = (sort) => {
    return{
        type: 'SET_SORT',
        payload: sort
    }
}