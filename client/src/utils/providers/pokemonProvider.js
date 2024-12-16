import axios from "axios"
const URL_SERVER = import.meta.env.VITE_URL_SERVER;


const pokemonProvider = {
    
    async getPokemones() {
        try {
            const pokemones = await axios(`${URL_SERVER}/pokemons/`)
            return pokemones;
        } catch (error) {
            console.error(error.message)
            return error.message
        }
    },

    async getPokemonById(id) {
        try {
            const pokemon = await axios(`${URL_SERVER}/pokemons/${id}`)
            return pokemon;
        } catch (error) {
            console.error(error.message)
            return error.message
        }
    },

    async getTypes() {
        try {
            const types = await axios(`${URL_SERVER}/pokemons/types`)
            return types;
        } catch (error) {
            console.error(error.message)
            return error.message
        }
    }
}

export default pokemonProvider;