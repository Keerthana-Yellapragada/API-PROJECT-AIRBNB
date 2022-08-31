const express = require('express');
const router = express.Router();
const {
    Spot,
    sequelize,
    Review,
    SpotImage,
    User,
    Booking,
    ReviewImage
} = require('../../db/models');
const {
    setTokenCookie,
    restoreUser,
    requireAuth
} = require('../../utils/auth')
//*********************************************************************** */
// GET REVIEW BY SPOT ID
// INCLUDE REVIEW IMAGES AND USER INFO

router.get("/:spotId/reviews", async (req, res) => {

    const {
        spotId
    } = req.params;

    const spot = await Spot.findByPk(spotId)

    console.log(spot)

    // ERROR HANDLING

    if (!spot) {
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const spotReviews = await Review.findAll({
        where: {
            spotId: spot.id // WHY IS THIS NOT WORKING?
        },
        include: [{
                model: ReviewImage,
                attributes: ['id', 'url', ]
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]

    })

    console.log(spotReviews)

    return res.status(200).json({
        Reviews: spotReviews
    })

})

//**********************************************************/
//*********************************************************************** */
// 3. Get details of a Spot from an id --- RETURNS NULL ?!?!?

router.get("/:spotId", async (req, res, next) => {
    //const spotId = req.params.spotId

    const {
        spotId
    } = req.params
    const spotInfo = await Spot.findByPk(spotId)
    if (!spotInfo) {
        res.json({
            message: 'Spot couldn’t be found',
            statusCode: 404
        })
    }

    // lazy load info
    const owner = await User.findByPk(spotInfo.ownerId, {
        attributes: ["id", "firstName", "lastName"]
    })
    const numReviews = await Review.count({
        where: {
            spotId: spotId
        },
        raw: true
    })


    const SpotImages = await SpotImage.findAll({
        attributes: ["id", "url", "preview"],
        where: {
            spotId: spotId
        }
    })

    // find average star rating
    const averageRating = await Review.findOne({
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
        ],
        where: {
            spotId: spotId
        },
        raw: true
    })

    // add as properties
    const details = spotInfo.toJSON()
    details.numReviews = numReviews,
        details.avgStarRating = averageRating.avgStarRating, // RETURNS NULL!?!??!?!
        details.SpotImages = SpotImages,
        details.owner = owner
    return res.json(details)
})

//***************************************************** */

// 1. Get All Spots including previewImage and avgRating ***** DONE

router.get('/', async (req, res, next) => {

    const allSpots = await Spot.findAll({
        include: {
            model: Review,
            attributes: []
        },
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
                ]
            ]
        },
        group: ['Spot.id'], // THIS IS TO RETURN ALL THE SPOTS, and not just One
        raw: true // sequelize says set this tot true if you dont have a model definition in your query
    })
    // go through each Spot and see if they have an associated image
    for (let spot of allSpots) {
        const spotImage = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            },
            raw: true
        })
        // if true, then set the new keyvaluepair in that object.
        if (spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = null
        }
    }
    return res.json({
        Spots: allSpots
    })
})

//*********************************************************************** */

// 2. Get all spots owned by a specified owner **** DONE

router.get('/current', requireAuth, async (req, res, next) => {
    // get the user Id that we generated from the requireAuth func
    const userId = req.user.id
    // get all the spots that match this userId to the ownerId
    const allSpots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        //INCLUDE PREVIEW IMG & AVG RATING ALSO IN THE RESULTS
        include: {
            model: Review,
            attributes: []
        },
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
                ]
            ]
        },
        group: ['Spot.id'], // THIS IS TO RETURN ALL THE SPOTS, and not just One
        raw: true // sequelize says set this not true if you dont have a model definition in your query
    })
    // iterate through each Spot and see if they have an associated image
    for (let spot of allSpots) {
        const spotImage = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            },
            raw: true
        })
        // if true, then set the new kvp in that object.
        if (spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = null
        }
    }
    // SEND RESPONSE OBJECT
    return res.json({
        Spots: allSpots
    });
})
//*********************************************************************** */
//*********************************************************************** */
// 5. Add an Image to a Spot based on the Spot’s id

router.post("/:spotId/images", requireAuth, async (req, res) => {
    const {
        url,
        preview
    } = req.body
    const {
        spotId
    } = req.params;

    // get spot obj by pk
    const spot = await Spot.findByPk(spotId)

    console.log(spot)
    const newImage = await SpotImage.create({ // is this valid?
        url,
        preview,
        spotId: spot.id // add from the obj we got by pk
    })
    console.log(newImage)
    if (!newImage) {
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    // add values to the new image obj

    newImage.url = req.body.url
    newImage.preview = req.body.preview

    // add image to spot obj
    spot.previewImage = newImage

    res.status = 200
    return res.json({
        url: newImage.url,
        preview: newImage.preview

    })
})

//*********************************************************************** */
// 3. Get details of a Spot from an id --- RETURNS NULL ?!?!?

router.get('/:spotId', async (req, res, next) => {
    let spotId = req.params.id
    let spotInfo = await Spot.findByPk(spotId, {
        //have to add numReviews by getting length of associatred reviews
        //have to add avgStarRating(same as above)
        // haave to add SpotImages(id,url,preview) in array
        // have to add Owner: id, firstName, lastName from Users table
        include: {
            model: SpotImage,
            where: {
                preview: true
            }
        }

        // include: [{
        //         model: SpotImage
        //     },
        //     {
        //         model: User,
        //         attributes: ["id", "firstName", "lastName"]
        //     }
        // ]
    })

    console.log(spotInfo)

    // NEED TO ADD ERROR HANDLING FOR 404 RESPONSE IF WE CANT FIND SPOT BASED ON ID


    return res.json({ // WHY IS THIS RETURNING NULL
        spotInfo: spotInfo
    })
})
//*********************************************************************** */

// 6. Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {

    //get info sent by user
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body

    // find the spot based on Id with await findbyPk
    let {spotId }= req.params

    let spot = await Spot.findByPk(spotId)


    // have error handling for if we can’t find spot by id
    if (!spot) {

        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    //update the obj
    spot.address = req.body.address
    spot.city = req.body.city
    spot.state = req.body.state
    spot.country = req.body.country
    spot.lat = req.body.lat
    spot.lng = req.body.lng
    spot.name = req.body.name
    spot.description = req.body.description
    spot.price = req.body.price


    // console.log(spot)

    // call save
    await spot.save()

    //send response body
    res.status(200)
    return res.json(spot)

});


//*********************************************************************** */

// 4. Create a Spot ******   WORKS!!!!

router.post('/', requireAuth, async (req, res, next) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        user
    } = req.body; // get variable info from form created by user from the req body
    // const{user} = req.body
    //get userId to set as ownerId
    const userId = req.user.id
    const newSpot = await Spot.create({
        ownerId: userId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })
    // CREATE ERROR HANDLING FOR THIS
    return res.json(newSpot)

})


//*********************************************************************** */

//7. DELETE A SPOT-- WORKS!
router.delete('/:spotId', async (req, res) => {

    // get the spotId from params
    let {spotId} = req.params
    // find spot by pk
    let spot = await Spot.findByPk(spotId)

    // have error handling for if we can’t find spot by id
    if (!spot) {

        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    //call destroy() method
    await spot.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        statusCode: 200
    })

})

//******************************************************** */

module.exports = router;
