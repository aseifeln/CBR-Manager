const express = require('express')
const router = express.Router()
const visit = require('../models/visit')
const healthForm = require('../models/healthForm')
const educationForm = require('../models/educationForm')
const socialForm = require('../models/socialForm')
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
        .catch(err => res.status(400).json(err))
})


// @route   POST /visit/add
// @desc    POST Add a new client to the database
router.post('/add', (req,res) => {
    let {VisitPurpose, GPSLocation, Date,
        Location, VillageNumber, WorkerId, ClientId,
        HealthForm, EducationForm, SocialForm} = req.body;

    if (HealthForm != null) {
        var HealthFormId = uuidv4();
        healthForm.create({
            HealthFormId,
            Wheelchair: HealthForm.Wheelchair,
            Prosthetic: HealthForm.Prosthetic,
            Orthotic: HealthForm.Orthotic,
            WheelchairRepair: HealthForm.WheelchairRepair,
            HealthCenterReferral: HealthForm.HealthCenterReferral,
            Advice: HealthForm.Advice,
            Advocacy: HealthForm.Advocacy,
            Encouragement: HealthForm.Encouragement,
            GoalMet: HealthForm.GoalMet,
            ConcludedOutcome: HealthForm.ConcludedOutcome
        })
        .then(console.log("Health form added successfully"))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

    if (EducationForm != null) {
        var EducationFormId = uuidv4();
        educationForm.create({
            EducationFormId,
            Advice: EducationForm.Advice,
            Advocacy: EducationForm.Advocacy,
            OrganizationReferral: EducationForm.OrganizationReferral,
            Encouragement: EducationForm.Encouragement,
            GoalMet: EducationForm.GoalMet,
            ConcludedOutcome: EducationForm.ConcludedOutcome
        })
        .then(console.log("Education form added successfully"))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

    if (SocialForm != null) {
        var SocialFormId = uuidv4();
        socialForm.create({
            SocialFormId,
            Advice: SocialForm.Advice,
            Advocacy: SocialForm.Advocacy,
            OrganizationReferral: SocialForm.OrganizationReferral,
            Encouragement: SocialForm.Encouragement,
            GoalMet: SocialForm.GoalMet,
            ConcludedOutcome: SocialForm.ConcludedOutcome
        })
        .then(console.log("Social form added successfully"))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

    visit.create({
        VisitPurpose,
        GPSLocation,
        Date,
        Location,
        VillageNumber,
        WorkerId,
        ClientId,
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