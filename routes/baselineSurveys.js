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
const { sequelize } = require('../models/BaselineSurveys/baselineSurvey');
const uuid = require('uuid');

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

// @route   /baselineSurveys/add
// @desc    POST a new baseline survey
router.post('/add', async (req, res) => {
    let {WorkerId, ClientId,Date, DateEdited,
        healthSurvey, educationSurvey, socialSurvey,
        nutritionSurvey, shelterSurvey, empowermentSurvey,
        livelihoodSurvey} = req.body;

    try {
        await sequelize.transaction(async (transaction) => {

            if (healthSurvey != null) {
                var HealthSurveyId = uuid.v4();
                await HealthSurvey.create({
                    HealthSurveyId,
                    HealthStatus: healthSurvey.HealthStatus,
                    RehabilitationAccess: healthSurvey.RehabilitationAccess,
                    RehabilitationAccessNeeded: healthSurvey.RehabilitationAccessNeeded,
                    AssistiveDevice: healthSurvey.AssistiveDevice,
                    AssistiveDeviceWorking: healthSurvey.AssistiveDeviceWorking,
                    AssistiveDeviceNeeded: healthSurvey.AssistiveDeviceNeeded,
                    AssistiveDeviceRequired: healthSurvey.AssistiveDeviceRequired,
                    HealthServiceStatus: healthSurvey.HealthServiceStatus,
                }, { transaction });
            }

            if (educationSurvey != null) {
                var EducationSurveyId = uuid.v4();
                await EducationSurvey.create({
                    EducationSurveyId,
                    SchoolState: educationSurvey.SchoolState,
                    CurrentGrade: educationSurvey.CurrentGrade,
                    NoSchoolReason: educationSurvey.NoSchoolReason,
                    SchoolBefore: educationSurvey.SchoolBefore,
                    WantSchool: educationSurvey.WantSchool,
                }, { transaction });
            }

            if (socialSurvey != null) {
                var SocialSurveyId = uuid.v4();
                await SocialSurvey.create({
                    SocialSurveyId,
                    ValuedCommunityMember: socialSurvey.ValuedCommunityMember,
                    Independence: socialSurvey.Independence,
                    CommunityParticipation: socialSurvey.CommunityParticipation,
                    DisabilityImpact: socialSurvey.DisabilityImpact,
                    Discrimination: socialSurvey.Discrimination,
                }, { transaction });
            }

            if (nutritionSurvey != null) {
                var NutritionSurveyId = uuid.v4();
                await NutritionSurvey.create({
                    NutritionSurveyId,
                    FoodStatus: nutritionSurvey.FoodStatus,
                    MonthlyFoodAccess: nutritionSurvey.MonthlyFoodAccess,
                    ChildNutritionStatus: nutritionSurvey.ChildNutritionStatus,
                }, { transaction });
            }

            if (shelterSurvey != null) {
                var ShelterSurveyId = uuid.v4();
                await ShelterSurvey.create({
                    ShelterSurveyId,
                    ShelterAccess: shelterSurvey.ShelterAccess,
                    EssentialsAccess: shelterSurvey.EssentialsAccess,
                }, { transaction });
            }

            if (livelihoodSurvey != null) {
                var LivelihoodSurveyId = uuid.v4();
                await LivelihoodSurvey.create({
                    LivelihoodSurveyId,
                    WorkStatus: livelihoodSurvey.WorkStatus,
                    WorkDescription: livelihoodSurvey.WorkDescription,
                    EmploymentType: livelihoodSurvey.EmploymentType,
                    FinancialNeedsMet: livelihoodSurvey.FinancialNeedsMet,
                    DisabilityImpact: livelihoodSurvey.DisabilityImpact,
                    WorkWanted: livelihoodSurvey.WorkWanted,
                }, { transaction });
            }

            if (empowermentSurvey != null) {
                var EmpowermentSurveyId = uuid.v4();
                await EmpowermentSurvey.create({
                    EmpowermentSurveyId,
                    DisabilityOrganizationMember: empowermentSurvey.DisabilityOrganizationMember,
                    DisabilityOrganizations: empowermentSurvey.DisabilityOrganizations,
                    AwareDisabilityRights: empowermentSurvey.AwareDisabilityRights,
                    Influential: empowermentSurvey.Influential,
                }, { transaction });
            }

            await BaselineSurvey.create({
                Date,
                DateEdited,
                WorkerId,
                ClientId,
                HealthSurveyId,
                EducationSurveyId,
                SocialSurveyId,
                NutritionSurveyId,
                ShelterSurveyId,
                LivelihoodSurveyId,
                EmpowermentSurveyId
            }, { transaction });
        });

        res.status(200).json("New Baseline Survey added");
    } catch(error) {
        res.status(400).json(error);
    }
})

module.exports = router