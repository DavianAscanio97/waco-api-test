const axios = require('axios');
const FavoritePokemon = require('../models/favoritePokemon');

const getPokemonDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getPokemonSpecies = async (speciesUrl) => {
    try {
        const response = await axios.get(speciesUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getPokemons = async (limit, userId) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const favoritePokemons = await FavoritePokemon.find({
            userId
        });
        const pokemons = await Promise.all(response.data.results.map(async (pokemon) => {
            const details = await getPokemonDetails(pokemon.url);
            const species = await getPokemonSpecies(details.species.url);
            const flavorText = species.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;
            const isFavoritePokemon = favoritePokemons.some(favorite => favorite.pokemonName === pokemon.name);
            return {
                name: pokemon.name,
                image: details.sprites.front_default,
                description: flavorText,
                isFavorite: isFavoritePokemon,
            };
        }));
        return pokemons;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getPokemons,
};
