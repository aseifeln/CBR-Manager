'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.createTable('Alert', {
    AlertId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    Message: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    Date: {
      type: Sequelize.DATE,
      default: Sequelize.NOW,
      allowNull: false
    },
    SpecificWorkers: {
      type: Sequelize.ARRAY(Sequelize.UUID),
      allowNull: true
    },
    ForAllWorkers: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    },{
      tableName: 'Alert',
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alert');
  }
};
