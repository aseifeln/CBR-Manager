const express = require('express')
const router = express.Router()
const visit = require('../models/visit')
const healthForm = require('../models/healthForm')
const educationForm = require('../models/educationForm')
const socialForm = require('../models/socialForm')
const multer = require('multer')
const upload = multer({});
const { v4: uuidv4 } = require('uuid');

// @route   GET /visits/id
// @desc    GET Retrieve a visit with a certain id from the database
router.get('/:id', (req,res) => {
    const visitId = req.params.id
    visit.findByPk(visitId)
        .then(visit => {
            return visit;
        })
        .then(visit => res.json(visit))
        .catch(err => res.status(404).json(err))
})


// @route   POST /visit/add
// @desc    POST Add a new client to the database
router.post('/add', (req,res) => {
    let {VisitPurpose, GPSLocation, Date,
        Location, VillageNumber, WorkerId,
        HealthForm, EducationForm, SocialForm} = req.body;

    const VisitId = uuidv4();

    visit.create({
        VisitId,
        VisitPurpose,
        GPSLocation,
        Date,
        Location,
        VillageNumber,
        WorkerId,
        HealthFormId,
        EducationFormId,
        SocialFormId
    })
    .then(result => res.send("Visit Added Successfully"))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })

})

module.exports = router