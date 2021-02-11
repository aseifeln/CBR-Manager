const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();

const users = [];

app.use(express.json())

app.get("/register", (req, res) => {
    res.json(users);
});


app.post("/register", async (req, res) => {
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



app.post('/login', async (req, res) => {
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

module.exports = app;