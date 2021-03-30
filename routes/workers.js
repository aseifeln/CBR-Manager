const express = require('express')
const router = express.Router()
const worker = require('../models/worker')
const visit = require('../models/VisitForms/visit')
const referral = require('../models/ReferralForms/referral')
const Client = require('../models/client')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

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
        include: [{
            model: Client,
            required: true,
            attributes: [
                "FirstName", "LastName"
            ]
        }],
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
        include: [{
            model: Client,
            required: true,
            attributes: [
                "FirstName", "LastName"
            ]
        }],
        order: [
            ['Date', 'DESC']
        ]
    })
    .then(referrals => res.json(referrals))
    .catch(err => res.status(400).json(err))
})
// @route   GET /workers/workerId/clients/count
// @desc    GET Retrieve the number of all clients created by a worker
router.get('/:id/clients/count', (req, res) => {
    const workerId = req.params.id

    Client.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/clients/weeklyCount
// @desc    GET Retrieve the number of all clients created by a worker in the past week
router.get('/:id/clients/weeklyCount', (req, res) => {
    const workerId = req.params.id

    let fromDate = new Date()
    fromDate.setHours(0,0,0,0)

    let toDate = new Date()
    toDate.setHours(0,0,0,0)

    Client.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId,
            DateCreated: {
                [Op.between]: [fromDate - ((24 * 60 * 60 * 1000) * 7), toDate]
            }
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/visits/count
// @desc    GET Retrieve the number of all visits created by a worker
router.get('/:id/visits/count', (req, res) => {
    const workerId = req.params.id

    visit.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/visits/weeklyCount
// @desc    GET Retrieve the number of all visits created by a worker in the past week
router.get('/:id/visits/weeklyCount', (req, res) => {
    const workerId = req.params.id

    let fromDate = new Date()
    fromDate.setHours(0,0,0,0)

    let toDate = new Date()
    toDate.setHours(0,0,0,0)

    visit.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId,
            Date: {
                [Op.between]: [fromDate - ((24 * 60 * 60 * 1000) * 7), toDate]
            }
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/referrals/count
// @desc    GET Retrieve the number of all referrals created by a worker
router.get('/:id/referrals/count', (req, res) => {
    const workerId = req.params.id

    referral.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/referrals/weeklyCount
// @desc    GET Retrieve the number of all referrals created by a worker in the past week
router.get('/:id/referrals/weeklyCount', (req, res) => {
    const workerId = req.params.id

    let fromDate = new Date()
    fromDate.setHours(0,0,0,0)

    let toDate = new Date()
    toDate.setHours(0,0,0,0)

    referral.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId,
            Date: {
                [Op.between]: [fromDate - ((24 * 60 * 60 * 1000) * 7), toDate]
            }
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/referrals/resolved/count
// @desc    GET Retrieve the number of all referrals resolved by a worker
router.get('/:id/referrals/resolved/count', (req, res) => {
    const workerId = req.params.id

    referral.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId,
            Status: 'Resolved'
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})

// @route   GET /workers/workerId/referrals/resolved/weeklyCount
// @desc    GET Retrieve the number of all referrals resolved by a worker in the past week
router.get('/:id/referrals/resolved/weeklyCount', (req, res) => {
    const workerId = req.params.id

    let fromDate = new Date()
    fromDate.setHours(0,0,0,0)

    let toDate = new Date()
    toDate.setHours(0,0,0,0)

    referral.count({
        col: 'WorkerId',
        where: {
            WorkerId: workerId,
            Status: 'Resolved',
            Date: {
                [Op.between]: [fromDate - ((24 * 60 * 60 * 1000) * 7), toDate]
            }
        }
    })
    .then(count => res.json(count))
    .catch(err => res.status(400).json(err))
})


module.exports = router
