require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const workers = require('./routes/workers');
const users = require('./routes/users');

const app = express();
const PORT = 5000;


// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/workers', workers);
app.use('/users', users);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};


