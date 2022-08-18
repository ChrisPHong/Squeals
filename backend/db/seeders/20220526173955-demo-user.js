'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        image: 'https://quickspic.s3.us-west-1.amazonaws.com/defaultPicture.png',
        hashedPassword: bcrypt.hashSync('password'),
        bio: 'Thanks For checking out my site!'
      },
      {
        email: 'user1@user.io',
        username: 'SquealsJr',
        image: 'https://quickspic.s3.us-west-1.amazonaws.com/defaultPicture.png',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'SquealsExpert',
        image: 'https://quickspic.s3.us-west-1.amazonaws.com/defaultPicture.png',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'chrisC@aa.io',
        username: 'PrettyBoy123',
        image: 'https://squealsbucket.s3.us-west-1.amazonaws.com/chrispicture.gif',
        hashedPassword: bcrypt.hashSync('password'),
        bio: "Some think I'm pretty pretty, but I'm just pretty"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
