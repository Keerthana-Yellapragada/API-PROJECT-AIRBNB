const express = require('express')
const router = express.Router()
const {
    Spot,
    Review,
    SpotImage,
    sequelize
} = require('../../db/models');



router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [{
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ['url']
            }
        ],


        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
            ]
        },
        group: ['Spot.id'], // to return all spots
        raw: true


    })


    return res.json({
        allSpots
    });

})



















module.exports = router;
