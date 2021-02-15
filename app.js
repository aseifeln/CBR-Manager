const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: '.env'});

//Requiring the routes created
const users = require('./routes/users');
const clients = require('./routes/clients');

const app = express();


// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', users);
app.use('/clients', clients);

// Database
const db = require('./config/database')
db.authenticate()
	.then(() => console.log('[DB] connection established successfully'))
	.catch((err) => console.log('[DB] Warning: ' + err))


const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};


