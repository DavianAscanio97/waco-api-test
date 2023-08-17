const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ajusta la ruta según tu estructura

const generateToken = (userId, email) => {
    return jwt.sign({
        userId,
        email
    }, 'secretKey', {
        expiresIn: '1h'
    });
};

const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        const token = generateToken(user._id, user.email);
        return {user, token};
    } catch (error) {
        throw error;
    }
};

module.exports = {
    authenticateUser,
};
