'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BaselineSurvey',{
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

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BaselineSurvey');
  }
};
