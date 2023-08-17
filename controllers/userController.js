const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.json({
            status: 'success',
            message: 'Usuario actualizado con éxito',
            data: newUser
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateUserById = async (req, res) => {
    try {
        // Solo permite actualizar los campos permitidos
        const allowedFields = ['username', 'city', 'birthdate'];
        const updateData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        const updatedUser = await userService.updateUserById(req.params.id, updateData);
        res.json({
            status: 'success',
            message: 'Usuario actualizado con éxito',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        await userService.deleteUserById(req.params.id);
        res.json({
            message: 'Usuario eliminado'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};