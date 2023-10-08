//Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Routers
const userRoute = require('./routes/User');


const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});
//Middleware
app.use(bodyParser.json());
app.use(cors());

//Route initializer
app.use('/users', userRoute);


//Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});