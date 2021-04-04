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

// @route   DELETE /alerts/:id/delete
// @desc    DELETE an existing alert in the database
router.delete('/:id/delete', async (req, res) => {
    let alertId = req.params.id

    let transaction

    try {
        transaction = await sequelize.transaction()

        let alertToDelete = await alert.findByPk(alertId, { transaction })

        if (alertToDelete === null)
            throw new Error("Alert not found")
        
        await alertToDelete.destroy({ transaction })

        await transaction.commit()
        res.json("Alert deleted")
    }
    catch (error) {
        if (transaction)
            await transaction.rollback()
        
        if (error.message === "Alert not found")
            res.status(404).json(error.message)
        else
            res.status(400).json(error)
    }
})

module.exports = router
