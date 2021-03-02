const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    Username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role: {
        type: Sequelize.ENUM,
        values: ['Worker', 'Admin'],
        allowNull: false
    }
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;