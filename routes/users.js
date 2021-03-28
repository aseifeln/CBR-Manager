const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/user')
const workers = require('../models/worker')
const app = express.Router();
const multer = require('multer')
const upload = multer({});
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { sequelize } = require('../models/user');

app.use(cors())
app.use(cookieParser());
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

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

function setCookie(res, accessToken, expiryTime){

    res.cookie('ACCESS_TOKEN', accessToken, {
        maxAge : expiryTime,
        httpOnly : true
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

app.post('/login', async (req, res) => {
    const WRONGPASSWORD = '0'
    const SUCCESS = '1'
    const UNREGISTERED = '2'
    const loginUsername = req.body.user.username
    const loginPassword = req.body.user.password
    if(await userIsExist(loginUsername) == true){
        try{
            await getUserPassword(loginUsername).then(async function(result){
                if(await passwordIsTrue(loginPassword, result.Password)){
                    const user = { username: loginUsername }
                    const accessToken = generateAccessToken(user)
                    expiryTime = 1000 * 60 * 60; //(ms * s * mins) 60 mins
                    setCookie(res, accessToken, expiryTime);
                    return res.send(SUCCESS);
                } else {
                    return res.send(WRONGPASSWORD);     
                }
            });
        }catch{
            res.status(500).send();
        }
    } else {
        res.send(UNREGISTERED);
    }
});

app.post('/logout', async (req, res) => {
    try {
        res.clearCookie("ACCESS_TOKEN");
        res.clearCookie("Role");
        res.clearCookie("WorkerId");
        res.status(200).send("Cookie Deleted");
        return;
    } catch {
        res.status(500).send("Deleting Cookie Fails");
    }
})

app.get('/worker/:id', async (req, res) => {

    let transaction;
    const workerId = req.params.id;

    try {
        transaction = await sequelize.transaction();
        let worker = await users.findAll({
            where: {
                WorkerId: workerId
            },
            attributes: [], // Only want worker info
            include: [{
                model: workers,
                required: true,
                attributes: [
                    'FirstName', 'LastName', 'Location'
                ]
            }]
        }, { transaction })
        
        await transaction.commit();
        if (worker.length === 1) {
            res.json(worker);
        }
        else {
            res.status(404).json(worker);
        }
    }
    catch (error) {
        await transaction.rollback();
        res.status(400).json(error);
    }
})

app.post('/delete', async (req, res) => {
    await users.destroy({
        where: {
            WorkerId: req.body.WorkerId
        }
    })
    await workers.destroy({
        where: {
            WorkerId: req.body.WorkerId
        }
    })
    return res.status(200);
})

app.get('/session', async (req, res) => {
    await users.findAll({
        attributes: ['Role', 'WorkerId'],
        where: {
            Username: req.query.username,
        }
        })
        .then(userData => res.status(200).json(userData))
        .catch(err => res.status(500).json(err))
});

module.exports = app;
