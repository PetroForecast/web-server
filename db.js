const mysql = require('mysql2');
require('dotenv').config();

// Replace these values with your MySQL database configuration
const connectionPool = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

connectionPool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected succesfully to ${process.env.DATABASE}`);
    connection.release();
});

module.exports = connectionPool;