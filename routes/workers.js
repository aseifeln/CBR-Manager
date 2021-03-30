const express = require('express')
const router = express.Router()
const worker = require('../models/worker')
const visit = require('../models/VisitForms/visit')
const referral = require('../models/ReferralForms/referral')

// @route   GET /workers
// @desc    GET Retrieve all workers from the database
router.get('/', (req,res) => {
    worker.findAll({
        attributes: {
            exclude: ['Photo']
        }
    })
    .then(workers => res.json(workers))
    .catch(err => res.status(404).json(err))
})

// @route   GET /workers/id/visits
// @desc    GET Retrieve all visits done by a worker from the database
router.get('/:id/visits', (req,res) => {
    const workerId = req.params.id;

    visit.findAll({
        attributes: [
            'ClientId',
            'VisitId', 
            'VisitPurpose', 
            'Date'
        ],
        where: {
            WorkerId: workerId
        },
        order: [
            ['Date', 'DESC']
        ]
    })
    .then(visits => res.json(visits))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/id/referrals
// @desc    GET Retrieve all referrals performed by a worker from the database
router.get('/:id/referrals', (req,res) => {
    const workerId = req.params.id;

    referral.findAll({
        attributes: [
            'ReferralId', 
            'ClientId', 
            'Date', 
            'Status', 
            'Outcome'
        ],
        where: {
            WorkerId: workerId
        },
        order: [
            ['Date', 'DESC']
        ]
    })
    .then(referrals => res.json(referrals))
    .catch(err => res.status(400).json(err))
})


module.exports = router
