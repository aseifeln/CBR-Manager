const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/user')
const workers = require('../models/worker')
const app = express.Router();
require('dotenv').config();

const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.get("/register", (req, res, next) => {
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
        let user = { 
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            username: req.body.user.username, 
            location: req.body.user.location,
            password: req.body.user.password,
            photo: req.body.user.photo,
            confirm_password: req.body.user.confirm_password
        };
        console.log(user)
        if(validateRegisterDetails(res, user)){
            res.status(400).write('Register Unsuccessful');
            res.send()
            return
        }else{
            //TODO: Check if user already exist in db

            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword
            user.confirm_password = hashedPassword
            
            console.log(user)
            //TODO: Save in db ( FIX DB CONNECTION .ENV FILE INACTIVE )
            //FAIL : ADD TO WORKERS
            await workers.create({
                WorkerId: uuid_generate_v4(),
                Firstname: user.firstname, 
                Lastname: user.lastname,
                Location: user.location,
                Photo: "hey"
                //Photo: 
                //TODO:WORKERID AND PHOTO (CANNOT BE NULL)
            })
            .then(result => res.status(200))
            .catch(err => res.status(400).json(err))
            //SUCCESS : ADD TO USERS
            await users.create({
                Username: user.username, 
                Password: user.password,
                Role: "Worker"
                //TODO:WORKERID 
            })
            .then(result => res.status(200))
            .catch(err => res.status(400).json(err))

            

            res.status(201).send('Register Successful');
            return;
        }

            
        
        
    } catch {
        res.status(500).send();
    }


});



app.post('/login', async (req, res) => {
    console.log("A")
    //TODO: Change find in db
    const user = users.find(user => user.username === req.body.username)
    if( user == null ){
        return res.status(400).send('All fields are required');
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
