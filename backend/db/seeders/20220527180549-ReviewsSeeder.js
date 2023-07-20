"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          businessId: 1,
          rating: 5,
          answer: "This place is absolute best. No comparisons at all!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 1,
          rating: 4,
          answer: "Great place overall!!! I would come back anyday",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 2,
          rating: 5,
          answer: "B-E-A-UTIFUL BUSINESS",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 2,
          rating: 2,
          answer: "I would recommend somewhere else. There were rats",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 3,
          rating: 5,
          answer: "I had a great time here! It was amazing! ",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 3,
          rating: 3,
          answer:
            "Pretty Average. Not quite happy with my hair but it's not the worst",
          image:
            "https://images.unsplash.com/photo-1585336671611-84c832187eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 4,
          rating: 5,
          answer: "It was fantastic! I would come all the time for sure!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          businessId: 4,
          rating: 1,
          answer:
            "This is great! But I had to give it a one because I'm a vegetarian. But other than that, everything was perfect",
          image:
            "https://images.unsplash.com/photo-1585336671611-84c832187eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 5,
          rating: 4,
          answer: "The curriculum is great but the teachers aren't very good",
          image:
            "https://images.unsplash.com/photo-1585336671611-84c832187eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 6,
          rating: 5,
          answer: "Dance Dance Is great a place to learn how to dance",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 6,
          rating: 5,
          answer: "5 Stars. Hands Down!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 7,
          rating: 5,
          answer:
            "Great Flowers! I would come here every mother's day and it's always great!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 7,
          rating: 4,
          answer: "I love these colorful flowers so much!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 8,
          rating: 5,
          answer: "I love this place so much!!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 8,
          rating: 4,
          answer: "Not my favorite flavor but overall this place is so good!",
          image:
            "https://images.unsplash.com/photo-1585336671611-84c832187eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 9,
          rating: 5,
          answer:
            "If you like glazed donuts then come here! It's the best place here!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 9,
          rating: 5,
          answer: "Instagram pictures galore!! It's so fun and pretty!",
          image:
            "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 10,
          rating: 3,
          answer: "Not Really My thing. Or Anyone's thing. Don't go here",
          image:
            "https://images.unsplash.com/photo-1582545075804-1ed041a959cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 10,
          rating: 5,
          answer: "Functional. And the price is cheap!",
          image:
            "https://images.unsplash.com/photo-1585336671611-84c832187eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
