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
        url: "https://images.unsplash.com/photo-1487695652027-48e475bfa86f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
      },
      {
        reviewId: 2,
        url: "https://images.unsplash.com/photo-1415653041436-cf1c766512ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
      },
      {
        reviewId: 3,
        url: "https://images.unsplash.com/photo-1598210817770-76b744913f56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        reviewId:20,
        url: "https://media.istockphoto.com/photos/swimming-pool-at-at-luxury-tropical-holiday-villa-resort-picture-id963896054?s=612x612"
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
    await queryInterface.bulkDelete('ReviewImages')
  }
};
