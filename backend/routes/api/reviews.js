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
    const {
        user
    } = req;

    console.log(req)

    const allReviews = await Review.findAll({
        include: [{
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,// NEED TO ADD PREVIEW IMAGE TO THIS NEED TO RENAME!!!!!!!
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"], // to include preview image
                include: { model: SpotImage,  attributes: ['url']} // REDO THIS !!!!!!!!!!!!!!!!
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });

    // for (let review of allReviews){
    //     // get each review's associated spot's preview Image

    //     const previewImage = await SpotImage.findOne({
    //         where: {
    //             preview:true,
    //             spotId: review.Spot.id
    //         },
    //         include: {
    //             attributes: ['url']
    //         }
    //     });

    //     // add that preview image property to Spot in each review in Reviews Array:
    //     review.Spot.previewImage = previewImage
    // }

    return res.json(allReviews)
})


//*********************************************************************** */
//------------------------ ADD AN IMAGE TO REVIEW by review id ------------------------

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {

    const reviewId = req.params.id

    const currUserId = req.user.id

    const {
        url
    } = req.body // get user input to insert changes

    // get the review by pk
    let review = await Review.findByPk(reviewId)


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
            reviewId: reviewId
        },
        attributes: ['url']
    })

    // ERROR HANDLING: count num of images-- try this with sequelize  aggregate!!!!
    let numImages = reviewImages.length

    if (numImages >= 10) {
        res.status(403)
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }



    // ELSE IF ALL IS GOOD:

    //update url property
    if (url) review.url = url

    //send success response obj
    res.status(200)
    return res.json({

        id: review.id,
        url: review.url

    })


});




//*********************************************************************** */
//------------------------- EDIT A  REVIEW -----------------------------

router.put("/:reviewId", requireAuth, async (req, res, next) => {

    const reviewId = req.params.id

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

    // Error Response: Body validation errors

<<<<<<< HEAD
    if (stars < 1 || stars > 5 || typeof stars !== integer || review === '') {
=======
    if (stars < 1 || stars > 5 || typeof stars !== integer || review === null) {
>>>>>>> 873da92 (add reviews routes)
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

    console.log(stars)
    console.log(review)

    currReview.review = review
    currReview.stars = stars

    // await currReview.save() // do we need this???

    //else if all is fine:

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
