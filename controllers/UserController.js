// This is where our business and validation logic lives (Checking input to running calculations)
const UserModel = require('../models/UserModel');
////////////////////////////////////////////////////////////////////////
async function getAllUsers(req, res) {
    try {
        const users = await UserModel.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(500).json({ error: 'Error getting users' });
    }
}
////////////////////////////////////////////////////////////////////////
async function getByUsername(req, res) {
    try {
        const username = req.params.username;
        const user = await UserModel.getByUsername(username);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: 'User not found' });
    }
}
////////////////////////////////////////////////////////////////////////
async function getQuoteHistoryByUsername(req, res) {
    try {
        const username = req.params.username;
        const quoteHistory = await UserModel.getQuoteHistoryByUsername(username);
        return res.status(200).json(quoteHistory);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: 'User Quote History not found' });
    }
}
////////////////////////////////////////////////////////////////////////
async function isUsernameAvailable(req, res) {
    try {
        const usernameToCheck = req.params.username;
        const isAvailable = await UserModel.isUsernameAvailable(usernameToCheck);
        if (isAvailable) {
            return res.status(200).json({ available: true });
        } else {
            return res.status(409).json({ available: false });
        }

    } catch (error) {
        console.error('Error checking username availability:', error);
        return res.status(500).json({ error: 'Internal server error' });
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
        console.error(error);
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
        console.error('Error Registering User:', error);
        return res.status(500).json({ error: 'Error Registering User' });
    }
}
////////////////////////////////////////////////////////////////////////
async function updateUser(req, res) {
    try {
        const username = req.params.username;
        const updatedUserInfo = req.body;
        const updatedUser = await UserModel.updateUser(username, updatedUserInfo);
        return res.status(201).json(updatedUser);
    } catch (error) {
        console.error('Error Updating User:', error);
        return res.status(500).json({ error: 'Error Updating User' });
    }
}
////////////////////////////////////////////////////////////////////////
async function addQuote(req, res) {
    try {
        const newQuote = req.body;
        const result = await UserModel.addQuote(newQuote);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error Updating User:', error);
        return res.status(500).json({ error: 'Error Adding Quote' });
    }
}
////////////////////////////////////////////////////////////////////////
module.exports = {
    getAllUsers,
    getByUsername,
    getQuoteHistoryByUsername,
    isUsernameAvailable,
    loginUser,
    registerUser,
    updateUser,
    addQuote,
};