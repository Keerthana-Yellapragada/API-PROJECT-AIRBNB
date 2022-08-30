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

    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: "image url"
      },
      {
        reviewId: 2,
        url: "image url"
      },
      {
        reviewId: 3,
        url: "image url"
      },
      {
        reviewId: 4,
        url: "image url"
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages')
  }
};
