const express = require('express');
const router = express.Router();
const BaselineSurvey = require('../models/BaselineSurveys/baselineSurvey');
const { sequelize } = require('../models/BaselineSurveys/baselineSurvey');

// @route /baselineSurveys/<clientId>/delete
// @desc DELETE an existing baseline survey
router.delete('/:id/delete', async (req, res) => {
    const clientId = req.params.id;
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const surveyToDelete = await BaselineSurvey.findOne({
            where: {
                ClientId: clientId
            }
        }, { transaction });

        if (surveyToDelete === null)
            throw new Error("Client has no survey");
        
        await surveyToDelete.destroy({ transaction });
        await transaction.commit();
        res.json("Survey successfully deleted");
    }
    catch (error) {
        if (transaction)
            await transaction.rollback();

        if (error.message === "Client has no survey")
            res.status(404).json(error.message);
        else 
            res.status(400).json(error);
    }
})

module.exports = router