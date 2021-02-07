require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const workers = require('./routes/workers');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/users/register', (req, res) => {
    res.render("register");
});

app.get('/users/login', (req, res) => {
    res.render("login");
});

app.post('/users/register', (req, res) => {
    let {name, location, worker_id, password, password2} = req.body;

    console.log({
        name, 
        location, 
        worker_id,
        password,
        password2
    });
    
});


// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/workers', workers)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};