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
        spotId: 1,
        userId: 1,
        review: "Beautiful location. We loved the redwood trees and the remote, peaceful surroundings.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: "A great space to decompress for a few days and enjoy peacefulness in nature. Mary and Matt are incredibly kind and great at communication. Thank you again!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: " Serene and a great place to unwind. The owners are super helpfula and sweet!",
        stars: 5
      },
       {
         spotId: 4,
         userId: 3,
         review: "Amazing place perfect for relaxing. Wife and are already talking about coming back!",
         stars: 4
       },
        {
          spotId: 5,
          userId: 3,
          review: "Beautiful location, very well suited for couples getting away together, or in our case small family gathering. Better for older kids, but definitely worth it.",
          stars: 4
        },
        {
          spotId: 6,
          userId: 3,
          review: "Amazing, Magical, and Unforgettable! Million dollar views, and breathtaking night skies!!!",
          stars: 5
        },
         {
           spotId: 7,
           userId: 3,
           review: "Memorable stay! Definitely recommend",
           stars: 5
         },
          {
            spotId: 8,
            userId: 3,
            review: "We found bedbugs at this stay. Do not recommend. Poor service",
            stars: 2
          },
          {
            spotId: 9,
            userId: 3,
            review: "Beautiful property and friendly hosts! Would come again!",
            stars: 4
          },
          {
            spotId: 10,
            userId: 3,
            review: "We enjoyed our stay here and would come again!",
            stars: 4
          },
            {
              spotId: 11,
              userId: 3,
              review: "This a great place to chill and relax! The host is awesome!",
              stars: 3
            },
            {
              spotId: 12,
              userId: 3,
              review: "It was okay. Not as clean inside as we expected",
              stars: 3
            },
            {
              spotId: 13,
              userId: 3,
              review: "Came here with a bunch of friends for my bachelorette party. We loved the place!",
              stars: 5
            },
            {
              spotId: 14,
              userId: 3,
              review: "Wonderful place! ",
              stars: 4
            },
            {
              spotId: 15,
              userId: 3,
              review: "Amazing and definitely would come back again!",
              stars: 5
            },
            {
              spotId: 16,
              userId: 3,
              review: "We had a comfortable stay here",
              stars: 4
            },
            {
              spotId: 17,
              userId: 3,
              review: "Had a comfortable stay here.",
              stars: 4
            },
            {
              spotId: 18,
              userId: 1,
              review: "We had a comfortable stay here. Could have been cleaner though",
              stars: 3
            },
            {
              spotId: 19,
              userId: 1,
              review: "We had a memorable stay here with our kids over the holidays! ",
              stars: 4
            },
            {
              spotId: 20,
              userId: 1,
              review: "Host is warm and welcoming and the place was great! Highly recommend!",
              stars: 5
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
