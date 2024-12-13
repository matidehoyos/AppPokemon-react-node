import axios from "axios"
const URL_SERVER = import.meta.env.VITE_URL_SERVER;


const pokemonProvider = {
    
    async getPokemones() {
        try {
            const pokemones = await axios(`${URL_SERVER}/pokemons`)
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
    },

    async uploadImg(imgFile) {
        try {
            const url = `https://api.imgbb.com/1/upload?key=39742373eb01b1f677990f9eaf224ee2&name=${imgFile.name}`
            const data = new FormData();
            data.append("image", imgFile);
            const upload = await fetch(url, {
                method: "POST",
                body: data
            })
            const responseData = await upload.json()
            return responseData
        } catch (error) {
            return error.message
        }
    },
}

export default pokemonProvider;