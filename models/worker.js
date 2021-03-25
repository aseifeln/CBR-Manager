const Sequelize = require('sequelize');
const db = require('../config/database');
const Visit = require('./visit');
const User = require('./user');
const Client = require('./client');
const Referral = require('./referral');
const BaselineSurvey = require('./survey/baselineSurvey')


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
        type: Sequelize.BLOB('long')
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

//Define associations here
Worker.hasMany(Visit, {
    foreignKey:{
        name: 'WorkerId',
        type: Sequelize.UUID
    }
})
Worker.hasMany(Client, {
    foreignKey:{
        name: 'WorkerId',
        type: Sequelize.UUID
    }
})
Worker.hasMany(Referral, {
    foreignKey:{
        name: 'WorkerId',
        type: Sequelize.UUID
    }
})
Worker.hasMany(BaselineSurvey, {
    foreignKey:{
        name: 'WorkerId',
        type: Sequelize.UUID
    }
})
Worker.hasOne(User, {
    foreignKey:{
        name: 'WorkerId',
        type: Sequelize.UUID
    }
})
Visit.belongsTo(Worker, {foreignKey: 'WorkerId', targetKey: 'WorkerId'})
Client.belongsTo(Worker, {foreignKey: 'WorkerId', targetKey: 'WorkerId'})
Referral.belongsTo(Worker, {foreignKey: 'WorkerId', targetKey: 'WorkerId'})
User.belongsTo(Worker, {foreignKey: 'WorkerId', targetKey: 'WorkerId'})

module.exports = Worker;