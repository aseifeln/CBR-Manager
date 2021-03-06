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


})

module.exports = router
