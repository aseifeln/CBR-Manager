const express = require('express')
const router = express.Router()
const alert = require('../models/alert')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

// @route   GET /alerts/id
// @desc    GET Retrieve an alert by id
router.get('/:id', (req, res) => {
    const alertId = req.params.id

    alert.findByPk(alertId)
    .then(alert => res.json(alert))
    .catch(err => res.status(404).json(err))
})

// @route   GET /alerts/worker/id
// @desc    GET Retrieve all alerts for a specific cbr worker
router.get('/worker/:id', (req, res) => {
    const workerId = req.params.id

    alert.findAll({
        attributes: [
            'Title',
            'Message',
            'Date',
            'AuthorUsername'
        ],
        where: {
            [Op.or]: [
                { ForAllWorkers: true },
                { AuthorUsername: 'admin' }
            ]
        }
    })
    .then(alert => res.json(alert))
    .catch(err => res.status(404).json(err))
})

module.exports = router