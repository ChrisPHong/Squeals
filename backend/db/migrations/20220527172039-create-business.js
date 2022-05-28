'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      title: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      address: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(36)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Businesses');
  }
};
