const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const blacklistedTokens = new Set();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones de autenticación
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
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
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token de acceso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', authController.login);

router.get('/revoke-token', (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(400).json({
            message: 'Se requiere un token para revocar.'
        });
    }
    const token = authHeader.split(' ')[1];
    blacklistedTokens.add(token);
    res.json({
        message: 'Token revocado exitosamente.'
    });
});

module.exports = router;
