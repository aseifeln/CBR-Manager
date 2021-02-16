const Sequelize = require('sequelize');
const db = require('../config/database');

const Worker = db.define('Worker', {
    WorkerId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    FirstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Photo: {
        type: Sequelize.BLOB('long'),
        allowNull: false
    },
    Location: {
        type: Sequelize.ENUM,
        values: ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3', 'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
            'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'],
        allowNull: false
    }
}, {
    tableName: 'Worker',
    timestamps: false
});

module.exports = Worker;