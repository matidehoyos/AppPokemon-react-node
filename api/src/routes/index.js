const { Router } = require('express');
const getPokemons = require("../controllers/getPokemons");
const getPokemonsById = require('../controllers/getPokemonsById');
const getPokemonsbyName = require('../controllers/getPokemonsByName');
const postPokemons = require('../controllers/postPokemons');
const getTypes = require('../controllers/getTypes');


const router = Router();



router.get("/", getPokemons);
router.get("/types", getTypes);
router.get("/name", getPokemonsbyName);
router.get("/:idPokemon", getPokemonsById);
router.post("/", postPokemons);

module.exports = router;
