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
    return queryInterface.bulkInsert('Reviews', [{
        spotId: 2,
        userId: 1,
        review: " Clean place and great hosts. We really enjoyed our stay here.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: " Cozy and private. My family really enjoyed our stay here.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: " Serene and a great place to unwind. The owners are super helpfula and sweet!",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: " A great place to get away from the city. The air conditioning was broken when we arrived, but the owners were suepr helpful. Definitely recommend!",
        stars: 3
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

    await queryInterface.bulkDelete('Reviews')
  }
};
