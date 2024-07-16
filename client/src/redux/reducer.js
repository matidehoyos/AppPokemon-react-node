const initialState = {
    pokemons: [],
    searchedPokemon: null,
    types: [],
    createdPokemon: null,
    createdError: null,
    filterOrigin: "all",
    filterType: "all",
    orderBy: "name",
    sort: "asc",
}

const reducer = (state= initialState, action) => {  
    switch (action.type) {
        case 'SET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'SEARCH_POKEMON':
            const searched = state.pokemons.find((pokemon) => 
                pokemon.name === action.payload );
            return {
                ...state,
                searchedPokemon: searched
            };
        case 'RESET_SEARCHED':
            return {
                ...state,
                searchedPokemon: null
            };
        case 'SET_TYPES':
            return {
                ...state,
                types: action.payload
            };
        case 'CREATE_POKEMON':
            return{
                ...state,
                createdPokemon: action.payload
            };
        case 'RESET_CREATED_POKEMON':
            return{
                ...state,
                createdPokemon: null
            };
        case 'ERROR_CREATED_POKEMON':
            return{
                ...state,
                createdError: action.payload
            };
        case 'SET_FILTER_ORIGIN':
            return{
                ...state,
                filterOrigin: action.payload
            };
        case 'SET_FILTER_TYPE':
            return{
                ...state,
                filterType: action.payload
            };
        case 'SET_ORDERBY':
            return{
                ...state,
                orderBy: action.payload
            };
        case 'SET_SORT':
            return{
                ...state,
                sort: action.payload
            }; 
        default:
            return state;
    }
}

export default reducer;