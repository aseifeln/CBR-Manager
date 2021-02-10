
const { Sequelize } = require('sequelize');

//Connecting to DB
module.exports = new Sequelize('postgres://' + process.env.DB_URL)