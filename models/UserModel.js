const db = require('../db');
const dummyUserData = require('../data/dummyUserData');
////////////////////////////////////////////////////////////////////////
async function getAllUsers() {
    try {
        const query = `
            SELECT *
            FROM ClientInformation CI
            JOIN UserCredential UC ON CI.userId = UC.userId;
        `;
        const [results] = await db.promise().query(query);
        //console.log(results)
        return results;
    } catch (error) {
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function getByUsername(username) {
    try {
        const query = `
            SELECT *
            FROM ClientInformation CI
            JOIN UserCredential UC ON CI.userId = UC.userId
            WHERE CI.userId = ?;
        `;
        const [results] = await db.promise().query(query, [username]);
        //console.log(results);
        const user = results[0];
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
        const query = `
            SELECT *
            FROM FuelQuote FQ
            WHERE FQ.userId = ?;
        `;
        const [results] = await db.promise().query(query, [username])
        console.log(results);
        if (results.length === 0) {
            throw new Error('No User Quote History Found in the model');
        }
        return results;
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
        // 1. Authenticate that the user exists
        const authQuery = `SELECT * FROM UserCredential WHERE userId = ? AND password = ?`;
        const [credentialResults] = await db.promise().query(authQuery, [username, password]);
        if (credentialResults.length === 0) {
            return null;
        }

        // 2. Auth succeeded, retrieve additional user data
        const clientInfoQuery = `
            SELECT *
            FROM ClientInformation CI
            JOIN UserCredential UC ON CI.userId = UC.userId;
        `;
        const [clientInfoResults] = await db.promise().query(clientInfoQuery, [username]);
        const user = clientInfoResults[0];
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