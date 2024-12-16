import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER, 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

const pokemonProvider = {
  async getPokemones() {
    try {
      const { data } = await apiClient.get("/pokemons/");
      return data; 
    } catch (error) {
      console.error("Error al obtener pokemones:", error.message);
      throw new Error(error.response?.data?.message || "Error al obtener pokemones");
    }
  },

  async getPokemonById(id) {
    try {
      const { data } = await apiClient.get(`/pokemons/${id}`);
      return data;
    } catch (error) {
      console.error(`Error al obtener el Pokémon con ID ${id}:`, error.message);
      throw new Error(error.response?.data?.message || `Error al obtener el Pokémon con ID ${id}`);
    }
  },

  async getTypes() {
    try {
      const { data } = await apiClient.get("/pokemons/types");
      return data;
    } catch (error) {
      console.error("Error al obtener los tipos de Pokémon:", error.message);
      throw new Error(error.response?.data?.message || "Error al obtener los tipos de Pokémon");
    }
  },
};

export default pokemonProvider;
