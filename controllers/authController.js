const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const secretKey = 'your-secret-key';

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const auth = await authService.authenticateUser(email, password);
        res.json({
            status: 'success',
            data:{
                user: auth.user,
                token: auth.token
            }
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Credenciales inválidas'
        });
    }
};

module.exports = {
    login
};