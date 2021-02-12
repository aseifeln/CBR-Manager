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
        const user = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username, 
            location: req.body.location,
            password: req.body.password,
            password2: req.body.password2
        };
        console.log("B")
        if( !user.firstname || !user.lastname || !user.username || !user.location || !user.password || !user.password2){
            return res.status(400).send('All fields are required');
        }
        else if (user.password.length < 6){
            return res.status(400).send('Password must be at least 6 characters');
        }
        else if(user.password != user.password2){
            return res.status(400).send('Password and Confirm Password do not match');
        }
        else{
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.password2 = hashedPassword;
            //TODO: Check if user already exist in db
            //TODO: Change the password to hashedPassword
            //TODO: Save in db
        }
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }


});



app.post('/login', async (req, res) => {
    //TODO: Change find in db
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