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
        review: " Clean place and great hosts. We really enjoyed our stay here.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: " Cozy and private. My family really enjoyed our stay here.",
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
         review: "Great place!!",
         stars: 4
       },
        {
          spotId: 5,
          userId: 3,
          review: "Clean and cozy!",
          stars: 4
        },
        {
          spotId: 6,
          userId: 3,
          review: "We enjoyed our stay here!",
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
            review: "Friendly hosts! Would come again!",
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
              review: "Still waiting for my refund. Host is very unresponsive",
              stars: 1
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
              review: "We had a comfortable stay here.",
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
              review: "Host are warm and welcoming and the place was great! Highly recommend!",
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
