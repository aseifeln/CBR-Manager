const express = require('express');
const router = express.Router();
const BaselineSurvey = require('../models/BaselineSurveys/baselineSurvey');
const HealthSurvey = require('../models/BaselineSurveys/healthSurvey');
const EducationSurvey = require('../models/BaselineSurveys/educationSurvey');
const SocialSurvey = require('../models/BaselineSurveys/socialSurvey');
const NutritionSurvey = require('../models/BaselineSurveys/nutritionSurvey');
const ShelterSurvey = require('../models/BaselineSurveys/shelterSurvey');
const EmpowermentSurvey = require('../models/BaselineSurveys/empowermentSurvey');
const LivelihoodSurvey = require('../models/BaselineSurveys/livelihoodSurvey');

// @route   /baselineSurveys/:id
// @desc    GET retrieve a survey by SurveyId
router.get('/:id', (req,res) => {
    const surveyId = req.params.id

    BaselineSurvey.findAll({
        where: {
            BaselineSurveyId: surveyId
        },
        attributes: [
            'Date', 'DateEdited', 'BaselineSurveyId',
            'ClientId', 'WorkerId'
        ],
        include: [
            {
                model: HealthSurvey,
                required: false
            },
            {
                model: EducationSurvey,
                required: false
            },
            {
                model: SocialSurvey,
                required: false
            },
            {
                model: NutritionSurvey,
                required: false
            },
            {
                model: ShelterSurvey,
                required: false
            },
            {
                model: EmpowermentSurvey,
                required: false
            },
            {
                model: LivelihoodSurvey,
                required: false
            }
        ]
    })
    .then(survey => res.json(survey))
    .catch(err => res.status(404).json(err))
})

// @route   /baselineSurveys/client/:id
// @desc    GET retrieve a survey by ClientId
router.get('/client/:id', (req,res) => {
    const clientId = req.params.id

    BaselineSurvey.findAll({
        where: {
            ClientId: clientId
        },
        attributes: [
            'Date', 'DateEdited', 'BaselineSurveyId',
            'ClientId', 'WorkerId'
        ],
        include: [
            {
                model: HealthSurvey,
                required: false
            },
            {
                model: EducationSurvey,
                required: false
            },
            {
                model: SocialSurvey,
                required: false
            },
            {
                model: NutritionSurvey,
                required: false
            },
            {
                model: ShelterSurvey,
                required: false
            },
            {
                model: EmpowermentSurvey,
                required: false
            },
            {
                model: LivelihoodSurvey,
                required: false
            }
        ]
    })
    .then(survey => res.json(survey))
    .catch(err => res.status(404).json(err))
})


module.exports = router
