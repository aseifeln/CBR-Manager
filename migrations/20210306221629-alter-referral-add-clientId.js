'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.addColumn(
        'Referral', 'ClientId', {type: Sequelize.INTEGER} );
  },

  down: async (queryInterface, Sequelize) => {
    // intentionally blank
  }
};
