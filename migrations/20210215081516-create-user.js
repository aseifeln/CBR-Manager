'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      Username: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.STRING
      },
      WorkerId: {
        type: Sequelize.UUID,
        references: {
            model: 'Worker',
            key: 'WorkerId'
        }
      }
      },{
        tableName: 'User',
        timestamps: false
        });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};