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
      ownerId: 3,
      address: " 1234 De Anza Ave",
      city: "San Jose",
      state: "CA",
      country: "USA",
      lat: 37.28,
      lng: -121.84,
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
      lat: 32.73,
      lng: -117.16,
      name: "Modern Beachfront Home",
      description: "A fully furnished modern home by the beachfront. All amenities provided. Hot tub and private pool access included. Minimum 2 night booking. No cancellations allowed. No smoking or pets allowed",
      price: 300.00
    },
    {
      ownerId: 3,
      address: " 7890 Summer Lane",
      city: "Austin",
      state: "TX",
      country: "USA",
      lat: 30.22,
      lng: -97.81,
      name: "Entire Home on the Apple Orchard Ranch",
      description: "Entire home available on the Apple Orchard Ranch. Basic amenities provided. Private pool access included. Minimum 1 night booking. Free cancellations allowed. Pets allowed.",
      price: 180.00
    },
    {
      ownerId: 4,
      address: " 4590 Plaza Drive",
      city: "New York City",
      state: "NY",
      country: "USA",
      lat: 40.06,
      lng: -74.16,
      name: "Modern Apartment in Central New York",
      description: "Newly renovated apartment in a central location. All amenities provided. Minimum 2 nights booking.",
      price: 300.00
    },
    {
      ownerId: 3,
      address: " 1590 Lakewood Drive",
      city: "Denver",
      state: "CO",
      country: "USA",
      lat: 47.00,
      lng: 29.00,
      name: "Mountain Cabin",
      description: "Cozy Mountain Cabin by the national park. Basic amenities provided. Minimum 3 nights booking.",
      price: 100.00
    },
    {
      ownerId: 4,
      address: " 4689 Plum Ave",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      lat: 39.89,
      lng: -105.04,
      name: "Downtown Home in Las Vegas",
      description: "Home close to downtown Las Vegas. Basic amenities provided. Minimum 2 nights booking.",
      price: 400.00
    },
    {
      ownerId: 4,
      address: "4566 Calisto Drive",
      city: "Palo Alto",
      state: "CA",
      country: "USA",
      lat: 37.44,
      lng: -122.14,
      name: "Entire Home in Palo Alto",
      description: "Home close to Stanford University. Basic amenities provided. Minimum 2 nights booking.",
      price: 200.00
    },
    {
      ownerId: 1,
      address: "6798 Peacock Lane",
      city: "Sunnyvale",
      state: "CA",
      country: "USA",
      lat: 37.36,
      lng: -122.04,
      name: "Cozy home in Sunnyvale",
      description: "Home close to Google campus and downtown Sunnyvale. Basic amenities provided. Minimum 2 nights booking.",
      price: 160.00
    },
    {
      ownerId: 3,
      address: "5879 Ruby Ave",
      city: "San Jose",
      state: "CA",
      country: "USA",
      lat: 37.36,
      lng: -122.03,
      name: "Entire villa in Evergreen",
      description: "Newly renovated home in central San Jose. Basic amenities provided. Minimum 2 nights booking.",
      price: 190.00
    },
    {
      ownerId: 1,
      address: "4166 Waters Drive",
      city: "Tampa",
      state: "FL",
      country: "USA",
      lat: 27.95,
      lng: -82.49,
      name: "Beach Home",
      description: "Beach Home walkable distance to the beach. Basic amenities provided. Minimum 2 nights booking.",
      price: 100.00
    },
    {
      ownerId: 1,
      address: "1758 Pine Ave",
      city: "Detroit",
      state: "MI",
      country: "USA",
      lat: 42.33,
      lng: -83.07,
      name: "Entire Home in Central Detroit",
      description: "Entire Single Family home near Wayne State University. Pets Allowed. All amenities provided. Minimum 2 nights booking.",
      price: 100.00
    },
    {
      ownerId: 1,
      address: "1324 Grass Lane",
      city: "Lexington",
      state: "KY",
      country: "USA",
      lat: 38.14,
      lng: -84.52,
      name: "Entire Home in Lexington",
      description: "Entire Single Family home. Pets Allowed. All amenities provided. Minimum 1 night booking.",
      price: 70.00
    }, {
      ownerId: 1,
      address: "1356 Water Lane",
      city: "Phoenix",
      state: "AZ",
      country: "USA",
      lat: 33.55,
      lng: -112.04,
      name: "Newly furnished home in Phoenix",
      description: "Entire Single Family home. Pets Allowed. Basic amenities provided. Minimum 1 night booking.",
      price: 60.00
    },
    {
      ownerId: 1,
      address: "1080 Winter Lane",
      city: "Seattle",
      state: "WA",
      country: "USA",
      lat: 47.62,
      lng: -122.31,
      name: "Cozy Cabin in seattle",
      description: "Entire cabin for rent. Pets Allowed. Basic amenities provided. Minimum 2 nights booking.",
      price: 20.00
    },
    {
      ownerId: 3,
      address: "1190 Peach Lane",
      city: "New Orleans",
      state: "LA",
      country: "USA",
      lat: 29.97,
      lng:-90.14,
      name: "Colorful Apartment in Central New Orleans",
      description: "Entire apartment for rent. Walkable distance to downtown. No pets Allowed. Basic amenities provided. Minimum 2 nights booking.",
      price: 120.00
    },
    {
      ownerId: 2,
      address: "1190 Ginger Lane",
      city: "Richmond",
      state: "VA",
      country: "USA",
      lat: 37.54,
      lng: -77.43,
      name: "Rustic Home on an Orchard",
      description: "Entire home for rent. Pets are welcome! Basic amenities provided. Minimum 2 nights booking.",
      price: 150.00
    },
    {
      ownerId: 3,
      address: "350 Waterfront Lane",
      city: "Atlanta",
      state: "GA",
      country: "USA",
      lat: 33.78,
      lng: -84.38,
      name: "Rustic Home on an orchard farm",
      description: "Entire home for rent. Pets are welcome! Basic amenities provided. Minimum 2 nights booking.",
      price: 150.00
    },
    {
      ownerId: 5,
      address: "212 Primrose Lane",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.78,
      lng: -122.41,
      name: "Cute and Colorful townhousse",
      description: "Entire home for rent. Pets are welcome! Basic amenities provided. Minimum 2 nights booking.",
      price: 200.00
    },
     {
       ownerId: 1,
       address: "265 Parrot Dr",
       city: "Gilroy",
       state: "CA",
       country: "USA",
       lat: 36.99,
       lng: -121.57,
       name: "Private Villa",
       description: "Entire villa for rent. Pool access included. Basic amenities provided. Minimum 2 nights booking.",
       price: 250.00
     },
      {
        ownerId: 1,
        address: "6045 Subrook Lane",
        city: "Palm Springs",
        state: "CA",
        country: "USA",
        lat: 33.73,
        lng: -116.37,
        name: "Private Villa in Palm Springs",
        description: "Entire villa is available for rent. Basic amenities provided. Minimum 3 nights booking.",
        price: 400.00
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

    return queryInterface.bulkDelete('Spots')
  }
};
