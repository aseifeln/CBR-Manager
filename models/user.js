const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    Username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role: {
        type: Sequelize.ENUM,
        values: ['Worker', 'Admin'],
        allowNull: false
    },
    WorkerId: {
      type: Sequelize.UUID,
      references: {
          model: 'Worker',
          key: 'WorkerId'
    }
  }
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;