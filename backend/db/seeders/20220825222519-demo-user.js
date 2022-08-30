'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        email: 'demo@user.io',
        firstName: 'Adam',
        lastName: 'Sanders',
        username: 'Demo-lition',
        firstName: "User1",
        lastName: "User1",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
<<<<<<< HEAD
         firstName: "User2",
          lastName: "User2",
=======
        firstName: 'Bill',
        lastName: 'Nye',
>>>>>>> dev
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
<<<<<<< HEAD
         firstName: "User3",
          lastName: "User3",
=======
        firstName: 'Gary',
        lastName: 'Waters',
>>>>>>> dev
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
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
