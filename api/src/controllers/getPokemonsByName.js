const axios = require("axios");
const { Pokemons, Types} =  require("../db");
const { Sequelize } = require("sequelize");

const getPokemonsbyName = async (req, res) => {
    const { name } = req.query;
    try {
        const pokeDB = await Pokemons.findOne({
            where: { name: {[Sequelize.Op.iLike]: name} },
            include: [{
                model: Types,
                attributes: ['name'],
                through: { attributes: [] }, 
              }]
        })

        if(pokeDB) {
            const pokemonDB = {
                id: pokeDB.id,
                name: pokeDB.name,
                hp: pokeDB.hp,
                origin: pokeDB.origin,
                attack: pokeDB.attack,
                defense: pokeDB.defense,
                speed: pokeDB.speed,
                image: pokeDB.image,
                height: pokeDB.height,
                weight: pokeDB.weight,
                types: pokeDB.Types.map(type => type.name),
            }
            return res.json(pokemonDB);
        }

        const apiResponse = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokeApi = apiResponse.data;

        if(pokeApi) {
            const pokemonApi = {
                id : pokeApi.id,
                name: pokeApi.name,
                hp: pokeApi.stats[0].base_stat,
                origin: "Api",
                attack: pokeApi.stats[1].base_stat,
                defense: pokeApi.stats[2].base_stat,
                speed: pokeApi.stats[5].base_stat,
                height: pokeApi.height,
                weight: pokeApi.weight,
                image: pokeApi.sprites.front_default,
                types: pokeApi.types.map(type => type.type.name),
            }
            return res.json(pokemonApi);
        }

        return res.status(404).send("No se encontraron pokemons con ese nombre");
    } catch (error) {
        console.error("Error al buscar el pokemon: ", error);
        return res.status(500).send("Error interno del servidor");
    }
}


module.exports = getPokemonsbyName;