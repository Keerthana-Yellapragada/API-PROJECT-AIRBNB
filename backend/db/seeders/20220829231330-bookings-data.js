'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-11-19",
        endDate: "2022-11-20",


      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2022-11-19",
        endDate: "2022-11-20",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-08-16",
        endDate: "2022-08-24",
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Bookings')
  }
};
