// import express
const {
    Router
} = require('express');
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
//------------------- ****  BOOKINGS ROUTER **** -------------------------
//*************************************************************************/


//*********************************************************************** */
//-------------------- GET ALL CURRENT USER'S BOOKINGS ----------------------

router.get("/current", requireAuth, async (req, res, next) => {

    // include spot data(exclude created/updated at for spot)
    const currUserId = req.user.id

    const allBookings = await Booking.findAll({
        where: {
            userId: currUserId
        },
        include: {
            model: Spot, // NEED TO EXCLUDE CREATEDAT AND UPDATEDAT
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        }
    });
    let finalBookingArray = []

    for (let booking of allBookings) {

        // convert each booking Obj to a json format so we can manipulate it
        let bookingObj = booking.toJSON()

        // find each booking's assoc spot's preview image
        let previewImage = await SpotImage.findOne({
            where: {
                spotId: bookingObj.Spot.id,
                preview: true
            }
        })

        //add preview image to each booking obj
        if (!previewImage) {
            bookingObj.Spot.previewImage = "No Preview Image Available."
        } else {
            bookingObj.Spot.previewImage = previewImage.url
        }

        // push this updated booking obj to our final array
        finalBookingArray.push(bookingObj)


    }


    // return our final array
    res.status(200)
    res.json({
        Bookings: finalBookingArray
    })

});


//*********************************************************************** */
//------------------------- EDIT A BOOKING-----------------------------

//Require proper authorization: Booking must belong to the current user

router.put("/:bookingId", requireAuth, async (req, res, next) => {

    const {
        bookingId
    } = req.params

    const userId = req.user.id

    const {
        startDate,
        endDate
    } = req.body // get info to update with

    const booking = await Booking.findByPk(bookingId)

    //ERROR HANDLING :

    // Error response: Couldn't find a Booking with the specified id
    if (!booking) {
        res.status(404)
        return res.json({

            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    // convert booking into json so we can manipulate it
    let bookingObj = booking.toJSON()

    let parsedStartDate = Date.parse(bookingObj.startDate)

    let parsedEndDate = Date.parse(bookingObj.endDate)


    // Error response: Body validation errors ?~!?!?!
    if (parsedEndDate < parsedStartDate) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    // Error response: Can't edit a booking that's past the end date
    if (parsedEndDate < Date.now()) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    // Error response: Booking conflict

    // get any existing booking and check for conflicts
    const existingBookings = await Booking.findAll({
        where: {
            spotId: bookingObj.spotId
        }
    })

    //iterate through array and check for booking conflicts
    for (let existingBooking of existingBookings) {
        // convert each obj to json so we can manipulate it
        const existingBookingObj = existingBooking.toJSON()

        // get the dates of the existing booking and current one and parse them into milliseconds
        let existingStartDate = Date.parse(existingBookingObj.startDate)
        let existingEndDate = Date.parse(existingBookingObj.endDate)

        let currentStartDate = Date.parse(startDate)
        let currentEndDate = Date.parse(endDate)

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


    // Else, if we have checked all existing bookings and NO BOOKING conflict exists:

    //update the changes to obj
    // bookingObj.startDate = startDate
    // bookingObj.endDate = endDate

    booking.startDate = startDate
    booking.endDate = endDate
    await booking.save()

    //send success response
    res.status(200)

    return res.json(bookingObj)
})



//*********************************************************************** */
//------------------------- DELETE A BOOKING -------------------------------

router.delete("/:bookingId", requireAuth, requireAuth, async (req, res, next) => {



    const {
        bookingId
    } = req.params

    const userId = req.user.id


    const booking = await Booking.findByPk(bookingId)


    // Error response: Couldn't find a Booking with the specified id
    if (!booking) {
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    // Error response: Bookings that have been started can't be deleted
    if (booking.startDate <= Date.now() || booking.endDate <= Date.now()) {
        res.status(403)
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }


    await booking.destroy()

    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})


//*********************************************************************** */


module.exports = router;
