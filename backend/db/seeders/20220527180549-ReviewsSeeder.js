'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    { userId: 1, businessId: 1, rating: 5, answer: 'This place is absolute best. No comparisons at all!', image:'https://squealsbucket.s3.amazonaws.com/1661534638388.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 2, businessId: 1, rating: 4, answer: "Great place overall!!! I would come back anyday", image:'https://squealsbucket.s3.amazonaws.com/1661531741804.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 2, businessId: 2, rating: 5, answer: 'B-E-A-UTIFUL BUSINESS', image:'https://squealsbucket.s3.amazonaws.com/1661531967983.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 2, rating: 2, answer: 'I would recommend somewhere else. There were rats', image:'https://squealsbucket.s3.amazonaws.com/1661532065370.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 3, businessId: 3, rating: 5, answer: "I had a great time here! It was amazing! ", image:'https://squealsbucket.s3.amazonaws.com/1661532154517.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 2, businessId: 3, rating: 3, answer: "Pretty Average. Not quite happy with my hair but it's not the worst", image:'https://squealsbucket.s3.amazonaws.com/1661532432605.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 4, rating: 5, answer: "It was fantastic! I would come all the time for sure!", image:'https://squealsbucket.s3.amazonaws.com/1661532590735.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 4, businessId: 4, rating: 1, answer: "This is great! But I had to give it a one because I'm a vegetarian. But other than that, everything was perfect", image:'', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 5, rating: 4, answer: "The curriculum is great but the teachers aren't very good", image:'https://squealsbucket.s3.amazonaws.com/1661532649844.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 3, businessId: 6, rating: 5, answer: "Dance Dance Is great a place to learn how to dance", image:'https://squealsbucket.s3.amazonaws.com/1661532876200.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 6, rating: 5, answer: "5 Stars. Hands Down!", image:'https://squealsbucket.s3.us-west-1.amazonaws.com/1661532914750.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 7, rating: 5, answer: "Great Flowers! I would come here every mother's day and it's always great!", image:'https://squealsbucket.s3.amazonaws.com/1661533022153.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 2, businessId: 7, rating: 4, answer: "I love these colorful flowers so much!", image:'https://squealsbucket.s3.amazonaws.com/1661533094178.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 8, rating: 5, answer: "I love this place so much!!", image:'https://squealsbucket.s3.amazonaws.com/1661533174895.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 3, businessId: 8, rating: 4, answer: "Not my favorite flavor but overall this place is so good!", image:'https://squealsbucket.s3.amazonaws.com/1661533229491.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 9, rating: 5, answer: "If you like glazed donuts then come here! It's the best place here!", image:'https://squealsbucket.s3.amazonaws.com/1661533289455.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 2, businessId: 9, rating: 5, answer: "Instagram pictures galore!! It's so fun and pretty!", image:'https://squealsbucket.s3.amazonaws.com/1661533332256.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 3, businessId: 10, rating: 3, answer: "Not Really My thing. Or Anyone's thing. Don't go here", image:'https://squealsbucket.s3.amazonaws.com/1661533394892.jpg', createdAt: new Date(), updatedAt: new Date()},
    { userId: 1, businessId: 10, rating: 5, answer: "Functional. And the price is cheap!", image:'https://squealsbucket.s3.amazonaws.com/1661533451671.jpg', createdAt: new Date(), updatedAt: new Date()},
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
