'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Likes', [
     {userId: 2, reviewId:1, label: 'cool', createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, reviewId:1, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, reviewId:1, label: 'useful', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:1, label: 'cool', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:2, label: 'useful', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:3, label: 'cool', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, reviewId:4, label: 'useful', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:5, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:6, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:7, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:8, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:9, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:10, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:11, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:12, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:13, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:14, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, reviewId:15, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, reviewId:16, label: 'funny', createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, reviewId:17, label: 'cool', createdAt: new Date(), updatedAt: new Date()},
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
