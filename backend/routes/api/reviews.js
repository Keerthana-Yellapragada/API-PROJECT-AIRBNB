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
//----------------------- ****  REVIEWS ROUTER **** -------------------------
//*************************************************************************/


//*********************************************************************** */
//---------------- GET ALL REVIEWS FOR THE CURRENT USER/OWNER --------------
router.get("/current", requireAuth, async (req, res) => {

    // get user id from auth
    const userId = req.user.id


// get all reviews
    const allReviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [{
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
        group: ['Spot.id', 'Review.id'],
        raw: true
    })

    // iterate through and add to each review obj in array
    for (let review of allReviews) {
        const spotImage = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: review.id
            },
            raw: true
        })

        // if we have an image set it to property
        if (spotImage) {
            review.previewImage = spotImage.url
        } else { // if we don't have an image set it to null
            review.previewImage = null
        }
    }


    // send response obj
    res.status(200)
    return res.json({
        Reviews: allReviews
    })
})

//*********************************************************************** */
//------------------------ ADD AN IMAGE TO REVIEW by review id ------------------------

router.post("/:reviewId/images", async (req, res, next) => {

    const currReviewId = req.params.id

    const currUserId = req.user.id

    const {
        url
    } = req.body // get user input to insert changes

    // get the review by pk
    let review = await Review.findByPk(currReviewId)

    //Error response: Couldn't find a Review with the specified id
    if (!review) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    // Error response: Cannot add any more images because there is a maximum of 10 images per resource
    // !!!!!!!!!!!!!!!!!NEED TO DO THIS PROPERLY !!!!!!!!!!!!!!!!!

    // find the associated ReviewImages
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: currReviewId
        }
    })

    // count num of images-- try this with sequelize  aggregate!!!!
    let numReviews = reviewImages.length

    if (numReviews >= 10) {
        res.status(403)
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }


    // ELSE IF ALL IS GOOD:

    //update url property
    review.url = url

    //send success response obj
    res.status(200)
    return res.json({

        id: review.id,
        url: review.url

    })


})




//*********************************************************************** */
//------------------------- EDIT A  REVIEW -----------------------------

router.put("/:reviewId", requireAuth, async (req, res, next) => {

    const {
        reviewId
    } = req.params

    const userId = req.user.id

    const {
        review,
        stars
    } = req.body

    const currReview = await Review.findByPk(reviewId)

    //Error response: Couldn't find a Review with the specified id
    if (!currReview) {

        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    // Error Response: Body validation errors

    if (stars < 1 || stars > 5 || typeof stars !== integer || review === '') {
        res.status(404)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }


    //else if all is fine:

    currReview.review = review
    currReview.stars = stars

    await currReview.save() // do we need this???


    // send response obj

    res.status(200)
    res.json(review)

})


//*********************************************************************** */
//------------------------- DELETE A  REVIEW -------------------------------

router.delete("/:reviewId", requireAuth, async (req, res, next) => {

    const userId = req.user.id

    const reviewId = req.params.id

    const review = await Review.findByPk(reviewId)

    if (!review) {

        res.status(404)

        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }


    await review.destroy()

    res.status(200)

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })


})


//*********************************************************************** */


module.exports = router;
