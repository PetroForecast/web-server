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
    try {
        const { username, password } = req.body;
        const user = await UserModel.loginUser(String(username), String(password));
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
async function registerUser(req, res) {
    try {
        const { username, password } = req.body;
        if (Object.keys(req.body).length === 0 || Object.values(req.body).some(value => value === '')) {
            return res.status(422).json({ error: 'Empty Request Body or Empty String Values' });
        }
        const user = await UserModel.registerUser(String(username), String(password));
        if (!user) {
            return res.status(401).json({ error: 'Error Retrieving User' });
        }
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Error Registering User' });
    }
}
////////////////////////////////////////////////////////////////////////
//TODO//
async function updateUser(req, res) {
    try {
        //Capture req.body and put it inside an object
        //Validate fields on object then persist into model
        //Return the updated User
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Error Updating User' });
    }
}
////////////////////////////////////////////////////////////////////////
module.exports = {
    getAllUsers,
    loginUser,
    registerUser,
    updateUser,
    // Add more controller methods
};