const express = require('express')
const router = express.Router()
const client = require('../models/client')
const multer = require('multer')
const upload = multer({});

//Function that converts an image byte array into a base64 string
//Reference: https://robert-keller22.medium.com/upload-and-download-images-to-a-postgres-db-node-js-92e43f232ae4
function ConvertImage(client){
    const clientImage = client.Photo.toString('base64')
    client['Photo'] = clientImage
}

// @route   GET /clients/id
// @desc    GET Retrieve a client with a certain id from the database
router.get('/:id', (req,res) => {
    const clientId = req.params.id
    client.findByPk(clientId)
        .then(client => {
            ConvertImage(client)
            return client;
        })
        .then(client => res.json(client))
        .catch(err => res.status(404).json(err))
})
// @route   GET /clients
// @desc    Get All clients
router.get('/', (req, res) => 
    client.findAll()
    .then(clients => {
        clients.map(client => ConvertImage(client))
        return clients;
    })
    .then(clients => res.json(clients))
    .catch(err => res.status(404).json(err))   
)


// @route   POST /clients/add
// @desc    POST Add a new client to the database
router.post('/add', upload.single('Photo'), (req,res) => {
    let {FirstName, LastName, Gender, Location, ContactNo, 
        VillageNo, Age, DisabilityType, GPSLocation, Consent,
        CaregiverState, CaregiverContactNo, HealthStatus, HealthDesc,
        HealthGoal, EducationStatus, EducationDesc, EducationGoal,
        SocialStatus, SocialDesc, SocialGoal, WorkerId} = req.body;

    client.create({
        FirstName,
        LastName,
        Gender,
        Location,
        ContactNo,
        VillageNo,
        Age,
        DisabilityType,
        Photo: req.file.buffer,
        GPSLocation,
        Consent,
        CaregiverState,
        CaregiverContactNo,
        HealthStatus,
        HealthDesc,
        HealthGoal,
        EducationStatus,
        EducationDesc,
        EducationGoal,
        SocialStatus,
        SocialDesc,
        SocialGoal,
        WorkerId
    })
    .then(result => res.send("Client Added Successfully"))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })

})

// @route   GET /clients/location/location_name
// @desc    GET Retrieve all clients residing in a specific location
router.get('/location/:loc', (req,res) => {
    const location = req.params.loc
    
    client.findAll({
        attributes: {
            exclude: [
                'HealthDesc', 
                'HealthGoal',
                'EducationDesc',
                'EducationGoal',
                'SocialDesc',
                'SocialGoal'
            ]
        },
        where: {
            Location: location
        }
    })
    .then(clients => {
        clients.map(client => ConvertImage(client))
        return clients;
    })
    .then(clients => res.json(clients))
    .catch(err => {
        console.log(err);
        res.status(404).json(err)
    })  
})

// @route   GET /clients/id/edit
// @desc    PUT newly modified entry for client with id in database
router.put('/:id/edit', upload.single('Photo'), (req, res) => {

    let {FirstName, LastName, Gender, Location, ContactNo, 
        VillageNo, Age, DisabilityType, GPSLocation, Consent,
        CaregiverState, CaregiverContactNo, HealthStatus, HealthDesc,
        HealthGoal, EducationStatus, EducationDesc, EducationGoal,
        SocialStatus, SocialDesc, SocialGoal, WorkerId} = req.body;

    const clientId = req.params.id
    client.findByPk(clientId)
        .then(client => {
            // Photo found in request
            try {
                client.update({
                    FirstName,
                    LastName,
                    Gender,
                    Location,
                    ContactNo,
                    VillageNo,
                    Age,
                    DisabilityType,
                    Photo: req.file.buffer,
                    GPSLocation,
                    Consent,
                    CaregiverState,
                    CaregiverContactNo,
                    HealthStatus,
                    HealthDesc,
                    HealthGoal,
                    EducationStatus,
                    EducationDesc,
                    EducationGoal,
                    SocialStatus,
                    SocialDesc,
                    SocialGoal,
                    WorkerId
                })
                .then(client => res.status(200).json(client))
                .catch(err => res.status(400).json(err))
            }
            // No photo found, so removing it
            catch{
                client.update({
                    FirstName,
                    LastName,
                    Gender,
                    Location,
                    ContactNo,
                    VillageNo,
                    Age,
                    DisabilityType,
                    Photo: [],
                    GPSLocation,
                    Consent,
                    CaregiverState,
                    CaregiverContactNo,
                    HealthStatus,
                    HealthDesc,
                    HealthGoal,
                    EducationStatus,
                    EducationDesc,
                    EducationGoal,
                    SocialStatus,
                    SocialDesc,
                    SocialGoal,
                    WorkerId
                })
                .then(client => res.status(200).json(client))
                .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(404).json(err))
})

module.exports = router