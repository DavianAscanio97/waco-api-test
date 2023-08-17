const pokemonService = require('../services/pokemonService');

const getPokemons = async (req, res) => {
    try {
        const {
            userId
        } = req; // Obtener el ID de usuario desde req (middleware de autenticación)
        const limit = 100;
        const pokemons = await pokemonService.getPokemons(limit, userId);
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener la lista de Pokémon'
        });
    }
};

module.exports = {
    getPokemons,
};