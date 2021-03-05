const Sequelize = require('sequelize');
const db = require('../config/database');
const Visit = require('./visit');
const Referral = require('./referral');

const Client = db.define('Client', {
    ClientId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
    Gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female'],
        allowNull: false
    },
    Location: {
        type: Sequelize.ENUM,
        values: ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3', 'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
            'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'],
        allowNull: false
    },
    DateCreated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    ContactNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    VillageNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    DisabilityType: {
        type: Sequelize.ARRAY(Sequelize.ENUM({
                values: [
                    'Amputee', 'Polio',
                    'Spinal Cord Injury',
                    'Cerebral Palsy',
                    'Spina Bifida',
                    'Hydrocephalus',
                    'Visual Impairment',
                    'Hearing Impairment',
                    'Don\'t Know', 'Other'
                ]
            })
        ),
        allowNull: true,
        validate: {
            nonNull(val) {
                if (val == null) {
                    throw new Error('Value must be non-null.')
                }
            }
        }
    },
    Photo: {
        type: Sequelize.BLOB('long'),
        allowNull: false
    },
    GPSLocation: {
        type: Sequelize.STRING
    },
    Consent: {
        type: Sequelize.ENUM('Y', 'N'),
        allowNull: false
    },
    CaregiverState: {
        type: Sequelize.ENUM('Y', 'N'),
        allowNull: false
    },
    CaregiverContactNo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'N/A'
    },
    HealthStatus: {
        type: Sequelize.ENUM('Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'),
        allowNull: false
    },
    HealthDesc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    HealthGoal: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    EducationStatus: {
        type: Sequelize.ENUM('Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'),
        allowNull: false
    },
    EducationDesc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    EducationGoal: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    SocialStatus: {
        type: Sequelize.ENUM('Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'),
        allowNull: false
    },
    SocialDesc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    SocialGoal: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    Priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

}, {
    tableName: 'Client',
    timestamps: false
});

//Define associations here
Client.hasMany(Visit, {
    foreignKey:{
        name: 'ClientId',
        type: Sequelize.INTEGER
    }
})
Client.hasMany(Referral, {
    foreignKey:{
        name: 'ClientId',
        type: Sequelize.UUID
    }
})
Visit.belongsTo(Client, {foreignKey:'ClientId', targetKey: 'ClientId'})
Referral.belongsTo(Client, {foreignKey: 'ClientId', targetKey: 'ClientId'})

module.exports = Client;