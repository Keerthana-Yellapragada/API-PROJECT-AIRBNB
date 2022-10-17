'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'John',
        lastName: 'Doe',
        username: 'JohnDoe',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'JaneDoe',
        hashedPassword: bcrypt.hashSync('password3')
      },
       {
         email: 'user3@user.io',
         firstName: 'Robert',
         lastName: 'Crane',
         username: 'RobertCrane',
         hashedPassword: bcrypt.hashSync('password4')
       },
        {
          email: 'user4@user.io',
          firstName: 'Penelope',
          lastName: 'Waters',
          username: 'PenelopeWaters',
          hashedPassword: bcrypt.hashSync('password5')
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']
      }
    }, {});
  }
};
