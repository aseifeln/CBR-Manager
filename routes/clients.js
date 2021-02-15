const express = require('express')
const router = express.Router()
const client = require('../models/client')
const multer = require('multer')
const upload = multer({});

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
    .catch(err => res.status(400).json(err))
})




module.exports = router