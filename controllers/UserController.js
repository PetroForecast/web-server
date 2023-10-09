// This is where our business and validation logic lives (Checking input to running calculations)
const UserModel = require('../models/UserModel');
////////////////////////////////////////////////////////////////////////
async function getAllUsers(req, res) {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Error getting users' });
    }
}
////////////////////////////////////////////////////////////////////////
async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await UserModel.loginUser(username, password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.json(user);

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Error logging in' });
    }
}
////////////////////////////////////////////////////////////////////////

module.exports = {
    getAllUsers,
    loginUser,
    // Add more controller methods
};