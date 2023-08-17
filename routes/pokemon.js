const express = require('express');
const pokemonController = require('../controllers/pokemonController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pokémon
 *   description: Manejo de Pokémon y favoritos
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 *       name: Authorization
 *       description: Use el token JWT para autenticación
 *       example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Obtiene una lista de Pokémon con detalles
 *     tags: [Pokémon]
 *     responses:
 *       200:
 *         description: Lista de Pokémon obtenida exitosamente
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authenticate, pokemonController.getPokemons);

module.exports = router;
