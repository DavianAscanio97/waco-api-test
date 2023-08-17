const FavoritePokemon = require('../models/favoritePokemon');

const addFavoritePokemon = async (userId, pokemonName) => {
    try {
        const existingFavorite = await FavoritePokemon.findOne({
            userId,
            pokemonName
        });
        if (existingFavorite) {
            throw new Error('Este Pokémon ya está en la lista de favoritos');
        }
        const favoritePokemon = new FavoritePokemon({
            userId,
            pokemonName,
        });
        await favoritePokemon.save();
        return favoritePokemon;
    } catch (error) {
        throw error;
    }
};

const removeFavoritePokemon = async (userId, pokemonName) => {
    try {
        const result = await FavoritePokemon.deleteOne({
            userId,
            pokemonName
        });
        if (result.deletedCount === 0) {
            throw new Error('Este Pokémon no está en la lista de favoritos');
        }
    } catch (error) {
        throw error;
    }
};

const getFavoritePokemonsByUserId = async (userId) => {
    try {
        const favoritePokemons = await FavoritePokemon.find({
            userId
        });
        return favoritePokemons;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addFavoritePokemon,
    removeFavoritePokemon,
    getFavoritePokemonsByUserId,
};
