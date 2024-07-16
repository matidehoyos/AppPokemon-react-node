const axios = require("axios");
const { Pokemons, Types } = require("../db");

const getPokemons = async (req, res) => {
    try {
        const apiResponse = await axios("https://pokeapi.co/api/v2/pokemon/");
    const apiPokemons = apiResponse.data.results;

    const dbPokemons = await Pokemons.findAll({
        include: [
          {
            model: Types,
            attributes: ['name'],
            through: { attributes: [] }, 
          },
        ],
      });

      const mappedApiPokemons = await Promise.all(
        apiPokemons.map(async (apiPokemon) => {
          const apiPokemonDetails = await axios.get(apiPokemon.url);
          return {
            id: apiPokemonDetails.data.id,
            name: apiPokemonDetails.data.name,
            origin: "api",
            image: apiPokemonDetails.data.sprites.front_default,
            hp: apiPokemonDetails.data.stats.find(stat => stat.stat.name === 'hp').base_stat,
            attack: apiPokemonDetails.data.stats.find(stat => stat.stat.name === 'attack').base_stat,
            defense: apiPokemonDetails.data.stats.find(stat => stat.stat.name === 'defense').base_stat,
            speed: apiPokemonDetails.data.stats.find(stat => stat.stat.name === 'speed').base_stat,
            types: apiPokemonDetails.data.types.map(type => type.type.name),
            height: apiPokemonDetails.data.height,
            weight: apiPokemonDetails.data.weight,
          };
        })
      );

      const mappedDbPokemons = dbPokemons.map(dbPokemon => ({
        id: dbPokemon.id,
        name: dbPokemon.name,
        origin: dbPokemon.origin,
        image: dbPokemon.image, 
        hp: dbPokemon.hp,
        attack: dbPokemon.attack,
        defense: dbPokemon.defense,
        speed: dbPokemon.speed,
        types: dbPokemon.types.map(type => type.name), 
        height: dbPokemon.height,
        weight: dbPokemon.weight,
      }));

      const allPokemons = mappedApiPokemons.concat(mappedDbPokemons);

      return res.json(allPokemons);
    } catch (error) {
        console.error('Error al obtener el pokemon: ', error);
        res.status(500).send('Error interno del servidor');
    }
}

module.exports = getPokemons;