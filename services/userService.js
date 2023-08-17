const User = require('../models/user');

const createUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
};

const getAllUsers = async () => {
    return await User.find();
};

const getUserById = async (userId) => {
    return await User.findById(userId);
};

const updateUserById = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, {
        new: true
    });
};

const deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};