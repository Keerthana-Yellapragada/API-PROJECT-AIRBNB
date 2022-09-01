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

    const bookings = Booking.findAll({
        where: {
            userId: currUserId
        },
        include: {
            model: Spot,
            attributes: []
        }
    })

    // get associated spot info

    res.status(200)
    res.json(bookings) // why is it returning am empty object!?! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
})


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

    // Error response: Body validation errors ?~!?!?!
    if (startDate > endDate) {
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
    if (endDate < Date.now()) { // ??!?!?!?!?!
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    // Error response: Booking conflict
    // get any existing bokoing and check for conflicts
    const existingBooking = await Booking.findByPk(bookingId)
    if (existingBooking) {
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


    // if everything is ok:

    booking.startDate = req.body.startDate
    booking.endDate = req.body.endDate

    res.status(200)
    return res.json(booking)
})



//*********************************************************************** */
//------------------------- DELETE A BOOKING -------------------------------

router.delete("/:bookingId", requireAuth, async (req, res, next) => {

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
