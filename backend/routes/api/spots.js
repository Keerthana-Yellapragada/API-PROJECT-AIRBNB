// import express
const express = require('express');

// immport express router
const router = express.Router();

// import models
const {
    Spot,
    sequelize,
    Review,
    SpotImage,
    User,
    Booking,
    ReviewImage
} = require('../../db/models');

// import authentication functions
const {
    setTokenCookie,
    restoreUser,
    requireAuth
} = require('../../utils/auth')


//*************************************************************************/
//----------------------- ****  SPOTS ROUTER **** -------------------------
//*************************************************************************/

//*********************************************************************** */
//--------------------- GET ALL SPOTS FOR A USER/OWNER ----------------------------------



router.get("/current", requireAuth, async (req, res, next) => {

    // get the user Id that we generated from the requireAuth func
    const userId = req.user.id

    // get all the spots that match this userId to the ownerId
    const allSpots = await Spot.findAll({

        where: {
            ownerId: userId
        },
        include: {

            model: Review,
            attributes: []
        },
        attributes: {
            include: [
                [
                    sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("stars")), 2), "avgRating" // this rounds our average to 2 decimal places
                ]
            ]
        },

        group: ['Spot.id'], // need this to return ALL spots

        raw: true

    })


    // iterate through each Spot and see if it has an assoc image
    for (let spot of allSpots) {

        const spotImage = await SpotImage.findOne({ // TO GET PREVIEW IMAGE
            attributes: ['url'],

            where: {
                preview: true,
                spotId: spot.id
            },

            raw: true

        })

        // if true, then set the property in that object.
        if (spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = " "
        }

    }


    return res.json({
        Spots: allSpots
    });

});

//******************************************************************************* */

//-------------------------- CREATE REVIEW FOR SPOT by id -------------------------

router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
    let userId = req.user.id
    let {
        spotId
    } = req.params

    console.log("SPOT ID FOR THIS SPOT IS :", spotId)

    let {
        stars,
        review
    } = req.body

    // find the spot by pk so we can get its id
    let spot = await Spot.findByPk(spotId)

    //ERROR HANDLING: if we can't find spot by id
    if (!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // check if we already have a review for this spot from this user: ONLY ALLOW ONE:

    let existingReview = await Review.findOne({
        where: {
            userId: userId,
            spotId: spotId // *******!!!!!!!! ********** SHOULD I INCLUDE THIS OR NOT ?! ********** !!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    })

    // ERROR HANDLING: if we have an existing review by this user already at this spot
    if (existingReview) {
        res.status(403)
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    //CREATE A NEW REVIEW
    let newReview = await Review.create({
        stars: stars,
        review: review,
        spotId: spotId,
        userId: userId
    })


    //SEND RESPONSE
    res.status(201)
    return res.json({

        id: newReview.id,
        userId: newReview.userId,
        spotId: newReview.spotId,
        review: newReview.review,
        stars: newReview.stars,
        createdAt: newReview.createdAt,
        updatedAt: newReview.updatedAt
    })


});
//****************************************************************************** */
//-------------------------- GET ALL REVIEWS BY A SPOT ID -------------------------

router.get("/:spotId/reviews", async (req, res, next) => {
    const {
        spotId
    } = req.params

    // find spot based on id
    const spotInfo = await Spot.findByPk(spotId)

    // ERROR HANDLING: if we don't find the spot based on given id....
    if (!spotInfo) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // find all associated reviews:

    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]

    })


    res.status(200)
    return res.json({
        Reviews: allReviews
    })

})



//****************************************************************************** */
//-------------------------- GET DETAILS OF A SPOT by id -------------------------



router.get("/:spotId", async (req, res, next) => {

    const {
        spotId
    } = req.params

    // find spot based on id
    const spotInfo = await Spot.findByPk(spotId)


    // ERROR HANDLING: if we don't find the spot based on given id....
    if (!spotInfo) {

        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }


    // find the owner
    const owner = await User.findByPk(spotInfo.ownerId, {
        attributes: ["id", "firstName", "lastName"]
    })


    // find the # num of reviews
    const numReviews = await Review.count({
        where: {
            spotId: spotId
        },
        raw: true
    })

    // find related spot images
    const SpotImages = await SpotImage.findAll({
        attributes: ["id", "url", "preview"],
        where: {
            spotId: spotId
        }
    })

    // find average star rating
    const averageRating = await Review.findOne({
        attributes: [
            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 2), 'avgStarRating'] // there has to be amore elegant way to di this!!?! ?
        ],
        where: {
            spotId: spotId
        },
        raw: true
    })

    // Add info we lazy loaded as properties to the obj
    const spotObj = spotInfo.toJSON() // need to do this first in order to manipulate object


    spotObj.avgStarRating = averageRating.avgStarRating, // RETURNS NULL!?!??!?!
        spotObj.SpotImages = SpotImages,
        spotObj.numReviews = numReviews,
        spotObj.Owner = owner



    return res.json(spotObj)
})

//********************************************************************************/
//-------------------------- GET ALL SPOTS ---------------------------------------

router.get('/', async (req, res, next) => {

    //get query params
    let {
        page,
        size,
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice
    } = req.query;

    //set default values
    if (!page) page = 1;
    if (!size) size = 20;

    //parse from string to Int
    page = parseInt(page);
    size = parseInt(size);

    let pagination = {} // create a pagination obj

    if (size >= 1 && page >= 1) {
        pagination.limit = size // limit results to our size
        pagination.offset = size * (page - 1) // offset all previous results
    }

    // if the page and size query params are invalid
    if (page <= 0 && size <= 0) {
        res.status(400);
        return res.json({
            "page": "Page must be greater than or equal to 0",
            "size": "Size must be greater than or equal to 0",
        })
    }

    if (minPrice <= 0 || maxPrice <= 0) {
        res.status(400)
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 0",
                "size": "Size must be greater than or equal to 0",
                "maxLat": "Maximum latitude is invalid",
                "minLat": "Minimum latitude is invalid",
                "minLng": "Maximum longitude is invalid",
                "maxLng": "Minimum longitude is invalid",
                "minPrice": "Maximum price must be greater than or equal to 0",
                "maxPrice": "Minimum price must be greater than or equal to 0"
            }
        })
    }


    const allSpots = await Spot.findAll({

        include: {
            model: Review,
            attributes: []
        },
        attributes: {
            include: [
                [
                    sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("stars")), 2), "avgRating"
                ]
            ]
        },
        group: ['Spot.id'], // need this to return ALL spots
        ...pagination, // spread our pagination object here
        raw: true, // we are making a raw SQL query--- ?
        subQuery: false // makes sure the limit/offset aren't applied to the subqueries

    });

    // go through spots array and see if each obj has an assoc image
    for (let spot of allSpots) {

        // console.log(spot)
        const spotImage = await SpotImage.findOne({

            attributes: ['url'],

            where: {
                preview: true,
                spotId: spot.id
            },

            raw: true

        })

        // if image exists, then set spotImage property in obj accordingly
        if (spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = " "
        }
    }


    return res.json({
        Spots: allSpots,
        page, //include our page and size numbers at the bottom of page
        size
    })


})

//************************************************************************** */

//--------------------- CREATE/ ADD IMAGE TO A SPOT ----------------------------------



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


    //NEED T ADD OWNER ONLY ERRORS!!!!

    // ERROR HANDLING:  if we can't find a spot from given id
    if (!spot) {

        res.status(404)

        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })

    }

    //create a new image
    const newImage = await SpotImage.create({
        url,
        preview,
        spotId: spot.id
    })



    // add values to the new image obj
    newImage.url = req.body.url
    newImage.preview = req.body.preview

    // add new image to spot obj
    spot.previewImage = newImage


    res.status = 200
    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview

    })
})


//*********************************************************************** */

//-------------------- EDIT A SPOT by id ----------------------------------

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
    let {
        spotId
    } = req.params

    let spot = await Spot.findByPk(spotId)


    // have error handling for if we can’t find spot by id
    if (!spot) {

        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // NEED TO ADD BODY VALIDATIONS ERRORS
    // ERRORS FOR USER AUTH AND ONLY OWNERS ARE ALLOWED TO edit

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
//-------------------- CREATE A SPOT ----------------------------------

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
        price
    } = req.body;


    // get user id
    const userId = req.user.id

    // CREATE PROPER VALIDATION ERROR HANDLING FOR THIS !!!!!!!!!!!!!!!!!!!
    if (address === '' || city === '' || state === '' || state === '' || country === '' || lat === '' || lng === '' || name === '' || description === '' || price === '') {
        res.status(400)
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }

    // CREATE A NEW SPOT
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

    //send response body
    res.status(201)
    return res.json(newSpot)

})


//*********************************************************************** */
//--------------------DELETE A SPOT -------------------------------------
// *************** !!! NEED TO FIX THIS-- WAS WORKING BUT DOESNT ANYMORE - FOREIGN KEY CONSTRAINT FAILED!?! !!! *********


router.delete('/:spotId', async (req, res) => {

    // get the spotId from params
    let {
        spotId
    } = req.params


    // find spot by pk
    let spot = await Spot.findByPk(spotId)

    // ERROR HANDLING: if we can’t find spot by id
    if (!spot) {

        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }

    // check if OWNER:!!!! ERROR - ONLY OWNERS CAN DELETE!

    // DESTROY the object
    await spot.destroy()


    // send response body
    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        statusCode: 200
    })

})


// *****************************************************************************
//--------------------- GET ALL BOOKINGS FOR A SPOT -----------------------------
// ******************** !!! NEED TO FIX !!! returning null ***********************************


router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {

    // get the spotId from params
    let {
        spotId
    } = req.params

    // get the current logged-in user obj to get id
    let userId = req.user.id

    // console.log(userId)
    // console.log(userId)

    // find spot by pk
    let spot = await Spot.findByPk(spotId)

    //console.log(spot)

    // ERROR HANDLING: if we can’t find spot by id
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

    }
    // convert spot to json so we can manipulate its info:

    const spotObj = spot.toJSON()

    //    // console.log(spotObj)

    // CASE 1: if you ARE NOT the owner -- you are just the LOGGED-IN CURRENT USER
    if (spotObj.ownerId !== userId) {

        // get all bookings that match this spot.id
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId,
                userId: userId
            },
            attributes: ['startDate', 'endDate', 'spotId']

        });


        res.status(200)
        res.json({
            Bookings: bookings
        })

    }

    //-----------------------------------------------------------------------
    // CASE 2: if you ARE the OWNER:
    if (spotObj.ownerId == userId) {

        // get all bookings that match this spot.id and include the booking user's info as well
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: {
                model: User
            }
        })

        res.status(200)
        res.json({
            Bookings: bookings
        })

    }



});

//****************************************************************************************** */
//--------------------CREATE A BOOKING FOR A SPOT by id -------------------------------------
//-------------------!!!!!!!!!!!! ERROR HANDLING : NEED TO ADD CUSTOM VALIDATION ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {

    // get the spotId from params
    let {
        spotId
    } = req.params

    // get the current logged-in user obj to get id
    let userId = req.user.id


    // get info from req body to create form

    const {
        startDate,
        endDate
    } = req.body // need to get userId, spotId from req params

    console.log(userId)

    // find spot by pk
    let spot = await Spot.findByPk(spotId)


    // ERROR HANDLING: if we can’t find spot by id
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }



    // find any existing bookings and see if dates conflict

    // get an array of all bookings for this spot
    const existingBookingArray = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

    //iterate through array and check for conflicts with each booking obj

    if (existingBookingArray) {

        //iterate though the array:
        for (let existingBooking of existingBookingArray) {

            // convert each obj to json so we can manipulate it
            const existingBookingObj = existingBooking.toJSON()

            // console.log(existingBookingObj)

            // get the dates of the existing booking and current one and parse them into milliseconds
            let existingStartDate = Date.parse(existingBooking.startDate)
            let existingEndDate = Date.parse(existingBooking.endDate)

            let currentStartDate = Date.parse(startDate)
            let currentEndDate = Date.parse(endDate)

            // compare dates to check for any conflicts:
            // LOGIC:
            // if there is an overlap in dates, don't allow booking
            // ERROR HANDLING: BOOKING CONFLICTS
            // !(currentEndDate < existingStartDate || currentStartDate > existingEndDate)
            if (currentEndDate > existingStartDate && currentStartDate < existingEndDate) {
                res.status(403)
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                })
            }
        }

        // if we finish checking all bookings and there is no conflict detected:

        //if (currentEndDate < existingStartDate || currentStartDate > existingEndDate) {
        // CREATE a new booking (if no conflicts exist)
        const newBooking = await Booking.create({
            userId: userId,
            spotId: spotId,
            startDate: startDate,
            endDate: endDate
        });

        //success response
        res.status(200)
        return res.json(newBooking)

    }

});


//************************************************************************* */

module.exports = router;
