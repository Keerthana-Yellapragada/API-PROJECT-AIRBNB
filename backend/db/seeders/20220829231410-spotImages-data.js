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
        url: "image url",
        preview: true
      },
      {
        spotId: 2,
        url: "image url",
        preview: false
      },
      {
        spotId: 3,
        url: "image url",
        preview: true
      },
      {
        spotId: 3,
        url: "image url",
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