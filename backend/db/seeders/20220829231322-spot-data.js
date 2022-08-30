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
    return queryInterface.bulkInsert('Spots', [{
        ownerId: 1,
        address: " 1234 De Anza Ave",
        city: "San Jose",
        state: "CA",
        country: "USA",
        lat: 100.800,
        lng: 200.400,
        name: "Cozy Getaway in Santa Cruz",
        description: "A fully furnished cabin nestled in the Santa Cruz hills. All amenities provided. Hot Tub included. Minimum 2 night booking. Free cancellations. No smoking. Pets allowed.",
        price: 100.00
      },
      {
        ownerId: 2,
        address: " 5678 Domingo Drive",
        city: "San Diego",
        state: "CA",
        country: "USA",
        lat: 200.800,
        lng: 600.400,
        name: "Modern Beachfront Home",
        description: "A fully furnished modern home by the beachfront. All amenities provided. Hot tub and private pool access included. Minimum 2 night booking. No cancellations allowed. No smoking or pets allowed",
        price: 300.00
      },
      {
        ownerId: 1,
        address: " 7890 Summer Lane",
        city: "Austin",
        state: "TX",
        country: "USA",
        lat: 167.841,
        lng: 300.540,
        name: "Entire Home on the Apple Orchard Ranch",
        description: "Entire home available on the Apple Orchard Ranch. Basic amenities provided. Private pool access included. Minimum 1 night booking. Free cancellations allowed. Pets allowed.",
        price: 180.00
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

    return queryInterface.bulkDelete('Spots')
  }
};
