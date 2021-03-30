const Sequelize = require('sequelize');
const db = require('../../config/database');

const BaselineSurvey = db.define('BaselineSurvey', {
    BaselineSurveyId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    Date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    DateEdited: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: true
    },

}, {
    tableName: 'BaselineSurvey',
    timestamps: false
});

module.exports = BaselineSurvey;