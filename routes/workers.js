const express = require('express');
const router = express.Router();

// Setup PostgreSQL
const db = require('../db');

// @route GET api/worker
// @desc Get All cbr_workers
// @access Public
router.get('/', (req, res) => {
    db.query('SELECT * FROM cbr_workers', (err, results) => {
        if(err) console.log(err);
        res.status(200).send(results.rows)
    })
})

// TODO The axios request isn't sending the name properly in workerActions.js?
router.post('/', (req, res) => {
    db.query(`INSERT INTO cbr_workers (name, location_id) VALUES (\'${req.data.name}\', 373)`, (err, results) => {
        if(err) console.log(err);
        res.status(200).send(results.rows);
    })
})

// TODO finish
router.delete('/', (req, res) => {
    db.query(`DELETE FROM cbr_workers WHERE name=\'${req.data.name}\'`, (err, results) => {
    })
})


module.exports = router;