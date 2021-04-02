const express = require('express')
const router = express.Router()
const alert = require('../models/alert')
const {sequelize} = require('../models/alert')

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
