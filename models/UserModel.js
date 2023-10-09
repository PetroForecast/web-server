//const db = require('../db');
const dummyUserData = require('../data/dummyUserData');
////////////////////////////////////////////////////////////////////////
async function getAllUsers() {
    //const query = 'SELECT * FROM users';
    try {
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
async function loginUser(username, password) {
    //const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    try {
        //const [results] = await db.query(query, [username, password]);
        //return results.length === 0 ? null : results[0];
        //FIXME Temporary Dummy Data
        const user = dummyUserData.find((user) => user.username === username && user.password === password);
        return user;

    } catch (error) {
        //console.error('Error fetching user by credentials:', error);
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
module.exports = {
    getAllUsers,
    loginUser,
    // Add more functions for other user-related database operations
};