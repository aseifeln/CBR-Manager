const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/user')
const workers = require('../models/worker')
const app = express.Router();
const multer = require('multer')
const upload = multer({});
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

async function userIsExist(username){
    const exist = await users.count({
        where: {
          Username: username
        }
    })
    .then(count => {
        return (count > 0) ? true : false
    });
    return exist;
}

async function getUserPassword(username) {
    return await users.findOne({
      where: {
        Username: username
      }
    });
}

async function passwordIsTrue(loginPassword, databasePassword){
    return await bcrypt.compare(loginPassword, databasePassword)
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //BEARER token
    console.log(authHeader)
    console.log(token)
    if( token == null ){
        console.log('oops')
        return res.status(401).send("No access to token")
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err){
            console.log('ayaya')
            return res.status(403).send("Token is no longer valid")
        }
        req.user = user
        console.log('great')
        next()
    })
}

app.post("/register", upload.single('Photo'), async (req, res) => {
    try{
        let user = { 
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            username: req.body.user.username, 
            location: req.body.user.location,
            photo: req.body.user.photo,
            password: req.body.user.password,
            confirm_password: req.body.user.confirm_password
        };
        if (await userIsExist(user.username)){
            const REGISTERED = '3'
            return res.send(REGISTERED);
            
        }else{
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword
            user.confirm_password = hashedPassword

            const new_worker = await workers.create({
                FirstName: user.firstname,
                LastName: user.lastname,
                Photo: user.photo,
                Location: user.location
            })
            .then(function(worker){
                return worker
            })
            .catch(err => res.status(400).json(err))

            await users.create({
                Username: user.username, 
                Password: user.password,
                Role: "Worker",
                WorkerId: new_worker.WorkerId
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

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})//ideal 10m-30m
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    console.log(refreshToken)
})

app.post('/login', async (req, res) => {
    console.log("ASSASASASA")
    const WRONGPASSWORD = '0'
    const SUCCESS = '1'
    const UNREGISTERED = '2'
    const loginUsername = req.body.user.username
    const loginPassword = req.body.user.password
    console.log(loginPassword)
    console.log(loginUsername)
    if(await userIsExist(loginUsername) == true){
        try{
            await getUserPassword(loginUsername).then(async function(result){
                if(await passwordIsTrue(loginPassword, result.Password)){
                    const user = { username: loginUsername }
                    const accessToken = generateAccessToken(user)
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                    res.cookie('ACCESS_TOKEN', accessToken, {
                        maxAge : 15,
                        httpOnly : true
                    })
                    res.json({ accessToken: accessToken, refreshToken: refreshToken })
                    return res.send(SUCCESS);
                } else {
                    return res.send(WRONGPASSWORD); 
                }
            });
            
        }catch{
            console.log("Error")
            res.status(500).send();
        }
    } else {
        res.send(UNREGISTERED);
    }
});

module.exports = app;
