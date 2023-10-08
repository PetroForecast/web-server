const db = require('../db');

// Function to get all users from the database
async function getAllUsers() {
    const query = 'SELECT * FROM users';
    try {
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    // Add more functions for other user-related database operations
};