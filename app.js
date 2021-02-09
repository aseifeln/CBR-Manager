require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const workers = require('./routes/workers');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

const users = [];

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get("/users/register", (req, res) => {
    res.json(users);
});

app.post("/users/register", async (req, res) => {
    //TODO: Change variables after register layout finished
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword};
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if( user == null ){
        return res.status(400).send('All fields are required')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Login Success');
        } else {
            res.send('Wrong Password');
        }
    }catch{
        res.status(500).send();
    }

});

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/workers', workers)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//module.exports = {app};