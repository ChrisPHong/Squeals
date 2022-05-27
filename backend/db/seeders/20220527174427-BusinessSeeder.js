'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Businesses', [
     {
      userId: 1, title: 'Fictional Foods', description: "We serve only fictional foods! Shrek & Donkey Waffles, Bob's Burgers, and so much more!", address: '123 SherWood Forest', city: "FantasyLand", state: 'CA', zipCode: '12345', phoneNumber:'1234567890', image: 'https://images.unsplash.com/photo-1507750809133-76dfbb107d68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 2, title: 'No More Guests In My Home', description: "Need a space to rent out for the night? We got you covered! Rent out any space for a nice get together with friends!", address: '456 Home Street', city: "Comfort Zone", state: 'CA', zipCode: '67890', phoneNumber:'0987654321', image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 3, title: 'Haircuts All Around', description: "We cut all types of hair! Please schedule your next haircut with us!", address: '789 Buzzed Cut Blvd', city: "Hair City", state: 'Wigs', zipCode: '12345', phoneNumber:'6789012345', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 4, title: 'Steaks', description: "We serve steaks. Steaks Only", address: '1 Steak', city: "Steaks City", state: 'ST', zipCode: '15794', phoneNumber:'7832576659', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', createdAt: new Date(), updatedAt: new Date()
   },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Businesses', null, {});
    }
};
