'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Likes', [
     {userId: 2, reviewId:1, createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, reviewId:1, createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, reviewId:1, createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:1, createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:2, createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:3, createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:4, createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:2, createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, reviewId:3, createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, reviewId:1, createdAt: new Date(), updatedAt: new Date()},
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
