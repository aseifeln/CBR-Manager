const express = require('express')
const router = express.Router()
const referral = require('../models/referral')
const { sequelize } = require('../models/referral');

const wheelchairService = require('../models/wheelchairService')
const physiotherapyService = require('../models/physiotherapyService')
const prostheticService = require('../models/prostheticService')
const orthoticService = require('../models/orthoticService')

const { v4: uuidv4 } = require('uuid');

// @route   POST /referrals/add
// @desc    POST Add a new visit to the database
router.post('/add', async (req,res) => {
    let {Date, ServiceRequired, OtherServices,
        ReferTo, Status, Outcome, ClientId, WorkerId,
        WheelchairService, PhysiotherapyService,
        ProstheticService, OrthoticService} = req.body;

    // transaction functionality from
    // https://stackoverflow.com/questions/42870374/node-js-7-how-to-use-sequelize-transaction-with-async-await/49162797
    let transaction;
    try {
        transaction = await sequelize.transaction();


        if (WheelchairService != null) {
            var WheelchairServiceId = uuidv4();
            await wheelchairService.create({
                WheelchairServiceId,
                Photo: WheelchairService.Photo.toString('base64'),
                ClientProficiency: WheelchairService.ClientProficiency,
                ClientHipWidth: WheelchairService.ClientHipWidth,
                WheelchairExist: WheelchairService.WheelchairExist,
                WheelchairRepairable: WheelchairService.WheelchairRepairable
            }, { transaction });
        }

        if (PhysiotherapyService != null) {
            var PhysiotherapyServiceId = uuidv4();
            await physiotherapyService.create({
                PhysiotherapyServiceId,
                Photo: PhysiotherapyService.Photo.toString('base64'),
                ClientCondition: PhysiotherapyService.ClientCondition,
                OtherClientCondition: PhysiotherapyService.OtherClientCondition
            }, { transaction });
        }

        if (ProstheticService != null) {
            var ProstheticServiceId = uuidv4();
            await prostheticService.create({
                ProstheticServiceId,
                Photo: ProstheticService.Photo.toString('base64'),
                InjuryPosition: ProstheticService.InjuryPosition
            }, { transaction });
        }

        if (OrthoticService != null) {
            var OrthoticServiceId = uuidv4();
            await orthoticService.create({
                OrthoticServiceId,
                Photo: OrthoticService.Photo.toString('base64'),
                InjuryPosition: OrthoticService.InjuryPosition
            }, { transaction });
        }

        await referral.create({
            Date,
            ServiceRequired,
            OtherServices,
            ReferTo,
            Status,
            Outcome,
            ClientId,
            WorkerId,
            WheelchairServiceId,
            PhysiotherapyServiceId,
            ProstheticServiceId,
            OrthoticServiceId
        }, { transaction });

        await transaction.commit();
        res.status(200).json("Referral Added Successfully");
    }
    catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        res.status(400).json(error);
    }

})

module.exports = router
