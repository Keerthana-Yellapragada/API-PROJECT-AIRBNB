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
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://unsplash.com/photos/BUdH3r6s0EM",
        preview: true
      },
      {
        spotId: 2,
        url: "https://unsplash.com/photos/oji_NGmBI5o",
        preview: false
      },
      {
        spotId: 3,
        url: "https://unsplash.com/photos/nzAZxPyhZ2g",
        preview: true
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
    await queryInterface.bulkDelete('SpotImages')
  }
};
