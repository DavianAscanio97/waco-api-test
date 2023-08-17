const mongoose = require('mongoose');

const favoritePokemonSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pokemonName: {
        type: String,
        required: true
    },
});

const FavoritePokemon = mongoose.model('FavoritePokemon', favoritePokemonSchema);

module.exports = FavoritePokemon;
