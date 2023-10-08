const UserModel = require('../models/UserModel');

async function getAllUsers(req, res) {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Error getting users' });
    }
}


module.exports = {
    getAllUsers,
    // Add more controller methods
};