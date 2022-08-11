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
     {
      userId: 4, title: 'Curriculum Warriors', description: "We Ensure that all students are well prepped and ready to start their academic journey! Need a tutor! We have the best instructors in town! ", address: '14824 Testing Dr', city: "test", state: 'TS', zipCode: '12345', phoneNumber:'1234567890', image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 2, title: 'Dance Dance Dance!', description: "All We Do is Dance! come through and dance with us!", address: '12345 squeals st', city: "squeals", state: 'CA', zipCode: '12346', phoneNumber:'0987654312', image: 'https://images.unsplash.com/photo-1523354177913-be035fcee55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 3, title: 'Fragrance', description: "Don't you love flowers? Come Join us and see out flowers!", address: '1435 Flower St', city: "Floral", state: 'CA', zipCode: '09876', phoneNumber:'1029384756', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=704&q=80', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 1, title: 'Never Melt!', description: "Our ice creams never melt!! You read that right! Our ice cream has been tested in all types of weather conditions and it has never melted once! Not only that, It tastes GREAT! ", address: 'Ice Cream St', city: "Dairy Queen", state: 'Milk', zipCode: '91039', phoneNumber:'0987654323', image: 'https://images.unsplash.com/photo-1623595119708-26b1f7300075?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 4, title: 'Donuts', description: "Everyone loves donuts", address: '1487 Donut City', city: "Donuts", state: 'CA', zipCode: '90064', phoneNumber:'12345798890', image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', createdAt: new Date(), updatedAt: new Date()
   },
     {
      userId: 4, title: 'Chris Parking', description: "Need a place to park your car? No worries! We got the lot for you! You can leave your car here overnight and up to a week for just one charge of $10! Pretty nice if you ask me!", address: '1200 Park St', city: "AutoPark", state: 'TX', zipCode: '73628', phoneNumber:'6789890312', image: 'https://images.unsplash.com/photo-1545179605-1296651e9d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', createdAt: new Date(), updatedAt: new Date()
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
