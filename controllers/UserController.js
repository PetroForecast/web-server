//All the http requests in regards to the user
//this is a design pattern (MVC) to follow

//const db = require('../db');

function getAllUsers(req, res) {
    res.send("All users");
};


module.exports = {
    getAllUsers,

}