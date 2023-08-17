const jwt = require('jsonwebtoken');
const blacklistedTokens = new Set();

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Acceso no autorizado'
        });
    }

    const token = authHeader.split(' ')[1];

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({
            message: 'Token inválido o revocado.'
        });
    }

    if (!token) {
        return res.status(401).json({
            message: 'Acceso no autorizado'
        });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.userId = decoded.userId; // Asignar el ID de usuario al objeto de solicitud (req)
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Acceso no autorizado'
        });
    }
};

module.exports = authenticate;