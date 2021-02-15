const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    WorkerId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    Username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role: {
        type: Sequelize.STRING,
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