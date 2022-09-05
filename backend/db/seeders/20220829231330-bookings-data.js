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
        startDate: new Date(Date.UTC(2022, 10, 1)),
        endDate: new Date(Date.UTC(2022, 10, 4)),


      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(Date.UTC(2022, 9, 1)),
        endDate: new Date(Date.UTC(2022, 9, 6)),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date(Date.UTC(2022, 11, 1)),
        endDate: new Date(Date.UTC(2022, 11, 8)),
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
