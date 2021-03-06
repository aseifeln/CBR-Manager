'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn(
        'Referral', 'WorkerId', {type: Sequelize.UUID});
  },

  down: async (queryInterface, Sequelize) => {
    // intentionally blank
  }
};
