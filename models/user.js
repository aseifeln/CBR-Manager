const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    Username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    WorkerId: {
        type: Sequelize.UUID,
        references: {
            model: 'Worker',
            key: 'WorkerId'
        }
    }
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;