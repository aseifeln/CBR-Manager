const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: '.env'});


const users = require('./routes/users');

const app = express();


// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', users);




const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};


