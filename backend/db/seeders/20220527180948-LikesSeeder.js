'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Likes', [
     {userId: 1, businessId:1, createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, businessId:2, createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, businessId:3, createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, businessId:1, createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Likes', null, {});
  }
};
