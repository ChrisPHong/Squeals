'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    { userId: 1, businessId: 1, rating: 5, answer: 'This place is absolute best. No comparisons at all!', createdAt: new Date(), updatedAt: new Date()},
    { userId: 2, businessId: 2, rating: 3, answer: 'Average. Nothing Great about it', createdAt: new Date(), updatedAt: new Date()},
    { userId: 3, businessId: 3, rating: 2, answer: "Not Really My thing. Or Anyone's thing. Don't go here", createdAt: new Date(), updatedAt: new Date()},
    { userId: 4, businessId: 4, rating: 1, answer: "This is great! But I had to give it a one because I'm a vegetarian. But other than that, everything was perfect", createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
