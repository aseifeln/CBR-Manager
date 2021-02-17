const Sequelize = require('sequelize');
const db = require('../config/database');

const EducationForm = db.define('EducationForm', {
    EducationFormId: {
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4,
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
    tableName: 'EducationForm',
    timestamps: false
});

module.exports = EducationForm;