const favoritePokemonService = require('../services/favoritePokemonService');

const addOrRemoveFavoritePokemon = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            pokemonName
        } = req.body;
        const action = req.params.action; // 'add' o 'remove' según la acción deseada

        if (action === 'add') {
            await favoritePokemonService.addFavoritePokemon(userId, pokemonName);
             res.json({
                 status: 'success',
                 message: 'Pokemon agregado a favoritos'
             });
        } else if (action === 'remove') {
            await favoritePokemonService.removeFavoritePokemon(userId, pokemonName);
            res.json({
                status: 'success',
                message: 'Pokemon removido de favoritos'
            });
        } else {
            throw new Error('Acción no válida');
        }
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

const getFavoritePokemonsByUserId = async (req, res) => {
    try {
        const userId = req.userId;
        const favoritePokemons = await favoritePokemonService.getFavoritePokemonsByUserId(userId);
        res.json(favoritePokemons);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

module.exports = {
    addOrRemoveFavoritePokemon,
    getFavoritePokemonsByUserId,
};
