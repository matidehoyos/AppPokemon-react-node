const axios = require("axios");
const { Pokemons, Types } = require("../db");

const getPokemonsById = async (req, res) => {
    const {idPokemon} = req.params;
    try {    
        const pokemonFromDB = await Pokemons.findOne({
            where: { id: idPokemon },
            include: [{ model: Types, attributes: ['name'], through: { attributes: [] } }],
          });
        if(pokemonFromDB) {
            const dbPoke = {
                id: pokemonFromDB.id,
                name: pokemonFromDB.name,
                hp: pokemonFromDB.hp,
                image: pokemonFromDB.image,
                attack: pokemonFromDB.attack,
                defense: pokemonFromDB.defense,
                speed: pokemonFromDB.speed,
                height: pokemonFromDB.height,
                weight: pokemonFromDB.weight,
                types: pokemonFromDB.types.map(type => type.name),
              }
        return res.json(dbPoke);
        }

        const responseFromApi = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const fromApi = responseFromApi.data;
        if(fromApi) {
            const apiPokemon = {
                id: fromApi.id,
                name: fromApi.name,
                hp: fromApi.stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: fromApi.stats.find(stat => stat.stat.name === 'attack').base_stat,
                defense: fromApi.stats.find(stat => stat.stat.name === 'defense').base_stat,
                speed: fromApi.stats.find(stat => stat.stat.name === 'speed').base_stat,
                height: fromApi.height,
                weight: fromApi.weight,
                image: fromApi.sprites.front_default,
                types: fromApi.types.map(type => type.type.name),
                }      
            return res.json(apiPokemon);
              }
        return res.status(404).send("Pokemon no encontrado");
    } catch (error) {
        console.error("Error al obtener el pokemon: ", error);
        return res.status(500).send("Error interno del servidor");
    }
}

module.exports = getPokemonsById;