const Sequelize = require('sequelize');
const db = require('../config/database');

const SocialForm = db.define('SocialForm', {
    SocialFormId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    Advice: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Advocacy: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    OrganizationReferral: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Encouragement: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    GoalMet: {
      type: Sequelize.ENUM,
      values: ['Canceled', 'Ongoing', 'Concluded'],
      allowNull: false
    },
    ConcludedOutcome: {
      type: Sequelize.TEXT,
      allowNull: true
    }
}, {
    tableName: 'SocialForm',
    timestamps: false
});

module.exports = SocialForm;