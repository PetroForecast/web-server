//const db = require('../db');

// Function to get all users from the database
async function getAllUsers() {
    const query = 'SELECT * FROM users';
    try {
        //const [results] = await db.query(query);

        //FIXME Temporary Dummy Data
        const dummyUserData = [
            {
                username: 'user1',
                password: 'pw1',
                fullName: 'John Doe',
                address1: '123 Main Street',
                address2: 'Apt 456',
                city: 'Los Angeles',
                state: 'CA',
                zipcode: '90001',
            },
            {
                username: 'user2',
                password: 'pw2',
                fullName: 'Alice Smith',
                address1: '456 Elm Street',
                address2: '',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
            },
            {
                username: 'user3',
                password: 'pw3',
                fullName: 'Bob Johnson',
                address1: '789 Oak Street',
                address2: 'Suite 101',
                city: 'Chicago',
                state: 'IL',
                zipcode: '60601',
            },
        ];

        return dummyUserData;


    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    // Add more functions for other user-related database operations
};