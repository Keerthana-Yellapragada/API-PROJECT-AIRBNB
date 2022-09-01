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

router.get("/current", requireAuth, async (req, res, next) => {

    // get the user Id that we generated from the requireAuth func
    const currUserId = req.user.id

    // get all reviews created by this user

    const allReviews = await Review.findAll({
        where: {
            userId: currUserId
        }
    })


    // LAZY LOAD associated info and add to final obj -- !!!!!!!!! NEED TO FIX THIS !!!!!!!!!!!!!!!

    console.log(allReviews)
    // iterate through allReviews
    for (let review in allReviews) {

        // console.log(review)
        // console.log(review.dataValues.id) // why is id undefined?

        // get assoc user info
        let userInfo = await User.findOne({
            where: {
                id: currUserId
            },
            attributes: {
                include: ['id', 'firstName', 'lastName']
            }
        })

        // find associated Spot info with spotImg URL as previewIamge
        let spotInfo = await Spot.findOne({
            where: {
                id: review.spotId //??????????????????????????
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: SpotImage,
                attributes: {
                    exclude: ['id', 'spotId', 'preview', 'createdAt', 'updatedAt'] // include only URL with Spot info!!!!!
                }
            }
        })

        // find associated images
        let imageInfo = await ReviewImage.findOne({
            where: {
                reviewId: review.dataValues.id
            },
            attributes: {
                exclude: ['reviewId', 'createdAt', 'updatedAt']
            }
        })
        // add to each review obj
        review.Spot = spotInfo
        review.ReviewImages = imageInfo
        review.User = userInfo
    };




    // send response
    res.status(200)
    res.json({
        Reviews: allReviews
    })

})


//*********************************************************************** */
//------------------------ ADD AN IMAGE TO REVIEW by review id ------------------------

router.post("/:reviewId/images", async (req, res, next) => {

    const {
        reviewId
    } = req.params

    const userId = req.user.id

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
            reviewId: review.id
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
