const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

//Database
const db = require('./config/database');

//Testing DB Connection
db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log("Error: " + err));

//const workers = require('./routes/workers');

// Routes
//app.use('/workers', workers)




const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};