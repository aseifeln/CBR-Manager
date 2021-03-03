const express = require('express')
const router = express.Router()
const visit = require('../models/visit')
const worker = require('../models/worker')
const client = require('../models/client')
const healthForm = require('../models/healthForm')
const educationForm = require('../models/educationForm')
const socialForm = require('../models/socialForm')
const { v4: uuidv4 } = require('uuid');

// @route   GET /visits/id
// @desc    GET Retrieve a visit with a certain id from the database
router.get('/:id', (req,res) => {
    const visitId = req.params.id
    visit.findAll({
        where: {
            VisitId: visitId
        },
        attributes: [
            'VisitPurpose', 'GPSLocation', 'Date',
            'Location', 'VillageNumber', 'ClientId'
        ],
        include: [{
            model: client,
            required: true,
            attributes: [
              'ClientId', 'FirstName', 'LastName'
            ]
        },
        {
            model: worker,
            required: true,
            attributes: [
                'WorkerId', 'FirstName', 'LastName'
            ]
        },
        {
            model: healthForm,
            required: false

        },
        {
            model: educationForm,
            required: false
        },
        {
            model: socialForm,
            required: false
        }]
    })
    .then(visits => {
        res.json(visits);
    })
    .catch(err => res.status(404).json(err))

})


// @route   POST /visit/add
// @desc    POST Add a new visit to the database
router.post('/add', async (req,res) => {
    let {VisitPurpose, GPSLocation, Date,
        Location, VillageNumber, WorkerId, ClientId,
        HealthForm, EducationForm, SocialForm} = req.body;

    try {
        [HealthFormId, healthErr] = await createHealthForm(HealthForm);
        if (healthErr) {
            throw healthErr;
        }
        [EducationFormId, educationErr] = await createEducationForm(EducationForm);
        if (educationErr) {
            throw educationErr;
        }
        [SocialFormId, socialErr] = await createSocialForm(SocialForm);
        if (socialErr) {
            throw socialErr;
        }

        allFormsSaved = true;

    } catch (err) {
        allFormsSaved = false;
        res.status(400).json(err);
    }

    if (allFormsSaved) {
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
    }
})

function createHealthForm(HealthForm) {
    if (HealthForm == null) {
        return [id, undefined];
    }

    var id = uuidv4();
    return healthForm.create({
        HealthFormId: id,
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
    .then(data => ([id, undefined]))
    .catch(error => ([undefined, error]));
}

function createEducationForm(EducationForm) {
    if (EducationForm == null) {
        return [id, undefined];
    }

    var id = uuidv4();
    return educationForm.create({
        EducationFormId: id,
        Advice: EducationForm.Advice,
        Advocacy: EducationForm.Advocacy,
        OrganizationReferral: EducationForm.OrganizationReferral,
        Encouragement: EducationForm.Encouragement,
        GoalMet: EducationForm.GoalMet,
        ConcludedOutcome: EducationForm.ConcludedOutcome
    })
    .then(data => ([id, undefined]))
    .catch(error => ([undefined, error]));
}

function createSocialForm(SocialForm) {
    if (SocialForm == null) {
        return [id, undefined];
    }

    var id = uuidv4();
    return socialForm.create({
        SocialFormId: id,
        Advice: SocialForm.Advice,
        Advocacy: SocialForm.Advocacy,
        OrganizationReferral: SocialForm.OrganizationReferral,
        Encouragement: SocialForm.Encouragement,
        GoalMet: SocialForm.GoalMet,
        ConcludedOutcome: SocialForm.ConcludedOutcome
    })
    .then(data => ([id, undefined]))
    .catch(error => ([undefined, error]));
}

module.exports = router