//const db = require('../db');
const dummyUserData = require('../data/dummyUserData');
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
    //const query = INSERT (FIXME)
    try {
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
//TODO//
async function updateUser() {
    try {

    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
module.exports = {
    getAllUsers,
    getByUsername,
    isUsernameAvailable,
    loginUser,
    registerUser,
    updateUser,
    // Add more functions for other user-related database operations
};