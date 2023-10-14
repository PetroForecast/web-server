//const db = require('../db');
const dummyUserData = require('../data/dummyUserData');
const dummyQuoteHistory = require('../data/dummyQuoteHistory');
////////////////////////////////////////////////////////////////////////
async function getAllUsers() {
    try {
        //const query = 'SELECT * FROM users';
        //const [results] = await db.query(query);
        //return results;

        //FIXME Temporary Dummy Data
        const results = dummyUserData;
        return results;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function getByUsername(username) {
    try {
        //const query = ...
        //FIXME Temporary Dummy Data
        const user = dummyUserData.find((user) => user.username === username);
        //console.log(user);
        if (!user) {
            throw new Error('User not found in the model');
        }
        return user;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function getQuoteHistoryByUsername(username) {
    try {
        //const query = ...
        //FIXME Temporary Dummy Data
        const userData = dummyQuoteHistory.filter((user) => user.user === username);
        console.log(userData);
        if (userData.length === 0) {
            throw new Error('No User Quote History Found in the model');
        }
        return userData;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function isUsernameAvailable(usernameToCheck) {
    try {
        //const query = ...
        //FIXME Temporary Dummy Data
        const user = dummyUserData.find((user) => user.username === usernameToCheck);
        // If user is not found, it means the username is available
        return !user;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function loginUser(username, password) {
    try {
        //const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        //const [results] = await db.query(query, [username, password]);
        //return results.length === 0 ? null : results[0];
        //FIXME Temporary Dummy Data
        const user = dummyUserData.find((user) => user.username === username && user.password === password);
        if (!user) {
            throw new Error('User not found in the model');
        }
        return user;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function registerUser(username, password) {
    try {
        //const query = INSERT (FIXME)
        const user = {
            username: username,
            password: password,
            fullName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
            isComplete: 'false',
        }
        return user;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function updateUser(username, updatedUserInfo) {
    try {
        //const query = ... (FIXME)
        //First delete the row of the old user
        //Second populate a new row with new data
        return updatedUserInfo;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function addQuote(newQuote) {
    try {
        //const query = ... (FIXME)
        //First break down the object and put into insert query
        return newQuote;
    } catch (error) {
        throw error;
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