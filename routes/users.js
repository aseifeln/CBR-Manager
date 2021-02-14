const express = require('express');
const bcrypt = require('bcrypt');
const app = express.Router();

const users = [];

app.use(express.json())

app.get("/register", (req, res) => {
    res.json(users);
});

function validateRegisterDetails(res, user){
    FAIL = false;
    if( !user.firstname || !user.lastname || !user.username || !user.location || !user.password || !user.confirm_password){
        res.status(400).write('All fields are required\n');
        FAIL = true;
    }
    if (user.password.length < 6){
        res.status(400).write('Password must be at least 6 characters\n');
        FAIL = true;
    }
    if(user.password != user.confirm_password){
        res.status(400).write('Password and Confirm Password do not match\n');
        FAIL = true;
    }
    return FAIL;
}

app.post("/register", async (req, res) => {
    //TODO: Change variables after register layout finished
    try{
        const user = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username, 
            location: req.body.location,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        };
        if(validateRegisterDetails(res, user)){
            res.status(400).send('Register Unsuccessful');
            res.send()
        }else{
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword
            user.confirm_password = hashedPassword
            users.push(user);
            res.status(201).send('Register Successful');
        }
            //TODO: Check if user already exist in db
            //TODO: Change the password to hashedPassword
            //TODO: Save in db
        
        
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