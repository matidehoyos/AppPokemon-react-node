const axios = require("axios");
const { Types } = require("../db");

const getTypes = async (req, res) => {
    try {
        const response = await axios("https://pokeapi.co/api/v2/type");
        const apiTypes = response.data.results.map(type => type.name);
        
        for (const apiType of apiTypes) {
            await Types.findOrCreate({ where: { name: apiType } });
        }

        const dbTypes = await Types.findAll();

        return res.json(dbTypes);

    } catch (error) {
        console.error("Error al obtener y guardar los tipos:", error);
        return res.status(500).json({ error: 'Error interno del servidor', details: error.message })
    }
    


}

module.exports = getTypes;