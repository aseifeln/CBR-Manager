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

// @route   /baselineSurveys/add
// @desc    POST a new baseline survey
// @returns BaselineSurveyId of the new baseline survey
router.post('/add', async (req, res) => {
    let {Date, DateEdited, WorkerId, ClientId,
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
                }, { transaction })
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
                }, { transaction, returning: 'EducationSurveyId' });
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
                }, { transaction, returning: 'SocialSurveyId' });
            }

            if (nutritionSurvey != null) {
                var NutritionSurveyId = uuid.v4();
                await NutritionSurvey.create({
                    NutritionSurveyId,
                    FoodStatus: nutritionSurvey.FoodStatus,
                    MonthlyFoodAccess: nutritionSurvey.MonthlyFoodAccess,
                    ChildNutritionStatus: nutritionSurvey.ChildNutritionStatus,
                }, { transaction, returning: 'NutritionSurveyId' });
            }

            if (shelterSurvey != null) {
                var ShelterSurveyId = uuid.v4();
                await ShelterSurvey.create({
                    ShelterSurveyId,
                    ShelterAccess: shelterSurvey.ShelterAccess,
                    EssentialsAccess: shelterSurvey.EssentialsAccess,
                }, { transaction, returning: 'ShelterSurveyId' });
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
                }, { transaction, returning: 'LivelihoodSurveyId'});
            }

            if (empowermentSurvey != null) {
                var EmpowermentSurveyId = uuid.v4();
                await EmpowermentSurvey.create({
                    EmpowermentSurveyId,
                    DisabilityOrganizationMember: empowermentSurvey.DisabilityOrganizationMember,
                    DisabilityOrganizations: empowermentSurvey.DisabilityOrganizations,
                    AwareDisabilityRights: empowermentSurvey.AwareDisabilityRights,
                    Influential: empowermentSurvey.Influential,
                }, { transaction, returning: 'EmpowermentSurveyId'});
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

        res.status(200).json("New Baseline Survey added")
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router