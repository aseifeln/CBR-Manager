const express = require('express')
const router = express.Router()
const referral = require('../models/referral')
const { sequelize } = require('../models/referral')

const worker = require('../models/worker')
const client = require('../models/client')

const wheelchairService = require('../models/wheelchairService')
const physiotherapyService = require('../models/physiotherapyService')
const prostheticService = require('../models/prostheticService')
const orthoticService = require('../models/orthoticService')

const { v4: uuidv4 } = require('uuid');

// @route   GET /referrals/outstanding
// @desc    GET all outstanding referrals (status === "Made") ordered by date
router.get('/outstanding', async (req, res) => {
    let transaction;

    try {
        transaction = await sequelize.transaction();

        let referrals = await referral.findAll({
            where: {
                Status: "Made"
            },
            attributes: [
                "ReferralId", "Date", "ServiceRequired"
            ],
            order: [
                ['Date', 'ASC']
            ],
            include: [{
                model: client,
                required: true,
                attributes: [
                  'ClientId', 'FirstName', 'LastName'
                ]
            }]
        }, { transaction })
        
        await transaction.commit();
        res.status(200).json(referrals);
    }
    catch (error) {
        await transaction.rollback();
        res.status(500).json(error);
    }
})

// @route   GET /referrals/id
// @desc    GET Retrieve a referral with a certain id from the database
router.get('/:id', (req,res) => {
    const referralId = req.params.id;
    referral.findAll({
        where: {
            ReferralId: referralId
        },
        attributes: [
            'Date', 'ServiceRequired', 'OtherServices',
            'ReferTo', 'Status', 'Outcome'
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
            required: false,
            attributes: [
                'WorkerId', 'FirstName', 'LastName'
            ]
        },
        {
            model: wheelchairService,
            required: false

        },
        {
            model: physiotherapyService,
            required: false
        },
        {
            model: prostheticService,
            required: false
        },
        {
            model: orthoticService,
            required: false
        }]
    })
    .then(referralsFound => {
        res.json(referralsFound);
    })
    .catch(err => {
        res.status(404).json(err);
    })

})

// @route   GET /referrals/client/id
// @desc    GET Retrieve all referrals for a specific client from the database ordered by date
router.get('/client/:id', (req, res) => {
    const clientId = req.params.id;
    referral.findAll({
        where: {
            ClientId: clientId
        },
        attributes: [
            'ReferralId', 'Date', 'ServiceRequired', 'OtherServices',
            'ReferTo', 'Status', 'Outcome'
        ],
        order: [
            ['Date', 'DESC']
        ],
        include: [{
            model: worker,
            required: false,
            attributes: [
                'FirstName', 'LastName'
            ]
        }]
    })
    .then(referralsFound => {
        res.json(referralsFound);
    })
    .catch(err => {
        res.status(404).json(err);
    })

})



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

// @route   PUT /referrals/id/edit
// @desc    PUT newly update entries for referral with id in the database
router.put('/:id/edit', async (req,res) => {
    let {Date, ServiceRequired, OtherServices,
        ReferTo, Status, Outcome, ClientId, WorkerId,
        WheelchairService, PhysiotherapyService,
        ProstheticService, OrthoticService} = req.body;

    let transaction;
    const referralId = req.params.id;

    try {
        transaction = await sequelize.transaction();
        const referralToEdit = await referral.findByPk(referralId, { transaction });

        if (referralToEdit === null) {
            throw new Error("Referral not found")
        }

        if (WheelchairService != null) {
            await wheelchairService.update(referralToEdit.WheelchairServiceId, {
                ClientProficiency: WheelchairService.ClientProficiency,
                ClientHipWidth: WheelchairService.ClientHipWidth,
                WheelchairExist: WheelchairService.WheelchairExist,
                WheelchairRepairable: WheelchairService.WheelchairRepairable
            }, { transaction });

            if (typeof WheelchairService.Photo !== "undefined") {
                await wheelchairService.update(referralToEdit.WheelchairServiceId, {
                    Photo: WheelchairService.Photo.toString('base64')
                }, { transaction });
            }
        }

        if (PhysiotherapyService != null) {
            await physiotherapyService.update(referralToEdit.PhysiotherapyServiceId, {
                ClientCondition: PhysiotherapyService.ClientCondition,
                OtherClientCondition: PhysiotherapyService.OtherClientCondition
            }, { transaction });

            if (typeof PhysiotherapyService.Photo !== "undefined") {
                await physiotherapyService.update(referralToEdit.PhysiotherapyServiceId, {
                    Photo: PhysiotherapyService.Photo.toString('base64'),
                }, { transaction });
            }
        }

        if (ProstheticService != null) {
            await prostheticService.update(referralToEdit.ProstheticServiceId, {
                InjuryPosition: ProstheticService.InjuryPosition
            }, { transaction });

            if (typeof ProstheticService.Photo !== "undefined") {
                await prostheticService.update(referralToEdit.ProstheticServiceId, {
                    Photo: ProstheticService.Photo.toString('base64')
                }, { transaction });
            }
        }

        if (OrthoticService != null) {
            await orthoticService.update(referralToEdit.OrthoticServiceId, {
                InjuryPosition: OrthoticService.InjuryPosition
            }, { transaction });

            if (typeof WheelchairService.Photo !== "undefined") {
                await wheelchairService.update(referralToEdit.OrthoticServiceId, {
                    Photo: WheelchairService.Photo.toString('base64')
                }, { transaction });
            }
        }

        await referralToEdit.update({
            Date,
            ServiceRequired,
            OtherServices,
            ReferTo,
            Status,
            Outcome,
            ClientId,
            WorkerId
        }, { transaction });

        await transaction.commit();
        res.status(200).json("Referral updated Successfully");
    }
    catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        if (error.message === "Referral not found")
            res.status(404).json(error.message)
        else
            res.status(400).json(error);
    }
})

module.exports = router
