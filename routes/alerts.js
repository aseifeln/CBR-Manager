const express = require('express')
const router = express.Router()
const alert = require('../models/alert')

// @route   GET /alerts/id
// @desc    GET Retrieve an alert by id
router.get('/:id', (req, res) => {
    const alertId = req.params.id

    alert.findByPk(alertId)
    .then(alert => res.json(alert))
    .catch(err => res.status(404).json(err))
})

module.exports = router