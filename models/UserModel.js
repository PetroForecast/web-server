const pool = require('../db');
const bcrypt = require('bcrypt');

////////////////////////////////////////////////////////////////////////
async function getAllUsers() {
    try {
        const query = `
            SELECT *2
            FROM ClientInformation CI
            JOIN UserCredential UC ON CI.userId = UC.userId;
        `;
        const [results] = await pool.promise().query(query);
        //console.log(results)
        return results;
    } catch (error) {
        console.log(error);
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
        const [results] = await pool.promise().query(query, [username]);
        //console.log(results);
        const user = results[0];
        if (!user) {
            return ({ error: 'User not found in the model' });
        }
        return user;
    } catch (error) {
        console.log(error);
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
        const [results] = await pool.promise().query(query, [username]);
        //console.log(results);
        if (results.length === 0) {
            return ({ error: 'No User Quote History Found in the model' });
        }
        return results;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function isUsernameAvailable(usernameToCheck) {
    try {
        const query = `
            SELECT *
            FROM UserCredential UC
            WHERE UC.userId = ?;
        `;
        const [results] = await pool.promise().query(query, [usernameToCheck]);
        return results.length === 0;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function loginUser(username, password) {
    try {
        // 1. Authenticate that the user exists
        const authQuery = `SELECT * FROM UserCredential WHERE userId = ?`;
        const [credentialResults] = await pool.promise().query(authQuery, [username]);
        if (credentialResults.length === 0) {
            return null;
        }

        const check = credentialResults[0];

        // 2. Verify password
        const passwordMatch = await bcrypt.compare(password, check.password);

        if (passwordMatch) {
            // 3. Auth succeeded, retrieve additional user data
            const clientInfoQuery = `
                SELECT *
                FROM ClientInformation CI
                LEFT JOIN UserCredential UC ON CI.userId = UC.userId
                WHERE UC.userId = ?;
                `;
            const [clientInfoResults] = await pool.promise().query(clientInfoQuery, [username]);
            //console.log(clientInfoResults);
            const user = clientInfoResults[0];
            console.log(user);
            return user;
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function registerUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO UserCredential (userId, password)
            VALUES (?, ?);
        `;
        await pool.promise().query(query, [username, hashedPassword]);

        const clientInfoQuery = `
            INSERT INTO ClientInformation (userId, fullName, addressOne, addressTwo, city, state, zipcode)
            VALUES (?, '', '', '', '', '', '');
        `;
        await pool.promise().query(clientInfoQuery, [username]);

        const user = {
            username: username,
            password: hashedPassword,
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
        console.log(error);
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function updateUser(username, updatedUserInfo) {
    try {
        const query = `
            UPDATE ClientInformation
            SET fullName = ?,
                addressOne = ?,
                addressTwo = ?,
                city = ?,
                state = ?,
                zipcode = ?,
                isComplete = ?
            WHERE userId = (
                SELECT userId
                FROM UserCredential
                Where userId = ?
            );
        `;
        const isCompleteValue = updatedUserInfo.isComplete ? 1 : 0;
        const {
            fullName,
            addressOne,
            addressTwo,
            city,
            state,
            zipcode,
        } = updatedUserInfo;
        const [results] = await pool.promise().query(query, [fullName, addressOne, addressTwo, city, state, zipcode, isCompleteValue, username]);
        //console.log(results);
        return updatedUserInfo;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
////////////////////////////////////////////////////////////////////////
async function addQuote(params, pricingInfo) {
    try {
        const query = `
            INSERT INTO FuelQuote (userId, gallonsRequested, deliveryAddress, deliveryDate, suggestedPricePerGallon, totalAmountDue)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const {
            gallonsRequested,
            deliveryAddress,
            deliveryDate,
            user
        } = params;

        const {
            suggestedPricePerGallon,
            suggestedTotalPrice
        } = pricingInfo;

        const [results] = await pool.promise().query(query, [user, gallonsRequested, deliveryAddress, deliveryDate, suggestedPricePerGallon, suggestedTotalPrice]);
        //console.log(results);
        return pricingInfo;
    } catch (error) {
        console.log(error);
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