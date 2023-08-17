const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const favoritePokemonController = require('../controllers/favoritePokemonController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones para usuarios
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               city:
 *                 type: string
 *               birthdate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos del usuario
 */

router.post('/', userController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', authenticate, userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', authenticate, userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               city:
 *                 type: string
 *               birthdate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en los datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', authenticate, userController.updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', authenticate, userController.deleteUserById);

/**
 * @swagger
 * /favorites/{action}:
 *   post:
 *     summary: Agrega o quita un Pokémon de la lista de favoritos
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: action
 *         required: true
 *         description: Acción a realizar (add o remove)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemonName:
 *                 type: string
 *                 description: Nombre del Pokémon
 *                 example: Pikachu
 *     responses:
 *       201:
 *         description: Pokémon agregado a la lista de favoritos exitosamente
 *       204:
 *         description: Pokémon eliminado de la lista de favoritos exitosamente
 *       400:
 *         description: Error al procesar la solicitud
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/favorites/:action', authenticate, favoritePokemonController.addOrRemoveFavoritePokemon);


module.exports = router;
