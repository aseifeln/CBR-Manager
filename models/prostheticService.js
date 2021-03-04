const { UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../config/database');
const Referral = require('./referral');

const ProstheticService = db.define('ProstheticService', {
    ProstheticServiceId: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    Photo: {
        type: Sequelize.BLOB('long'),
        allowNull: true
    },
    InjuryPosition: {
        type: Sequelize.ENUM,
        values: ['Above knee', 'Below knee'],
        allowNull: false
    }
}, {
    tableName: 'ProstheticService',
    timestamps: false
});

//Define associations here
ProstheticService.hasOne(Referral, {
    foreignKey: {
        name: 'ProstheticServiceId',
        type: Sequelize.UUID
    }
})

Referral.belongsTo(ProstheticService, {foreignKey: 'ProstheticServiceId', targetKey: 'ProstheticServiceId'})

module.exports = ProstheticService;