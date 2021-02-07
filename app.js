require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const workers = require('./routes/workers');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/users/register', (req, res) => {
    res.render("register");
});

app.get('/users/login', (req, res) => {
    res.render("login");
});


// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/workers', workers)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};