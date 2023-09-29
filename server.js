//
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, console.log(`Server started on port: ${PORT}`));