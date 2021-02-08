
const { Sequelize } = require('sequelize');

//Connecting to DB
module.exports = new Sequelize('postgres://localhost:5432/CBR_Manager')