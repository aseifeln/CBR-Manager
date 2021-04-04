const express = require('express')
const router = express.Router()
const alert = require('../models/alert')
const { Op } = require('sequelize')
const {sequelize} = require('../models/alert')

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
                { 
                  SpecificWorkers: {
                    [Op.contains]: [workerId]
                  } 
                }
            ]
        }
    })
    .then(alert => res.json(alert))
    .catch(err => res.status(404).json(err))
})


// @route   POST /alerts/add
// @desc    POST Add a new alert to the database
router.post('/add', async (req, res) => {
    let { Title, Message, SpecificWorkers,
          ForAllWorkers, AuthorUsername} = req.body

    let transaction

    try {
        transaction = await sequelize.transaction();

        await alert.create({
            Title,
            Message,
            SpecificWorkers,
            AuthorUsername,
            ForAllWorkers
        }, { transaction });

        await transaction.commit();
        res.status(201).json("Alert Added Successfully");
    }
    catch(error) {
        await transaction.rollback();
        res.status(400).json(error);
    }
})


module.exports = router
