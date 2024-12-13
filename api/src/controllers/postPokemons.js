const { Pokemons, Types } = require("../db");

const postPokemons = async (req, res) => {
    const {id,name,hp,attack,defense,speed,image,height,weight,types} = req.body;

    try {
        
        if(id,name,hp,attack,defense,speed,image,height,weight,types) {
       
            const newPokemon = {
                id,name,hp,attack,defense,speed,image,height,weight,types
            }
    
            const createPokemon = await Pokemons.create(newPokemon);
    
            const foundTypes = await Types.findAll({
                where: {
                name: types,
                },
            });
      
           await createPokemon.setTypes(foundTypes);
    
           return res.status(201).json({ message: "Pokemon creado exitosamente", createPokemon});
          }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error: "});
    }
}

module.exports = postPokemons;