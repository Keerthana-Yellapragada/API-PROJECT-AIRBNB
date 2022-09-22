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

    const userId = req.user.id

    let reviewObj = {};

    let finalArray = [];

    // get all reviews
    let allReviews = await Review.findAll({
        where: {
            userId: userId //our current user
        },
        include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            }
            // ,{
            //     model: ReviewImage,
            //     attributes: ['id', 'url']
            // }
        ]
    })

    //iterate through allReviews Array
    for (let review of allReviews) {
        // convert each review object into json format
        reviewObj = review.toJSON() // ****************** HAVE TO FORMAT IT BEFORE WE CAN ADD MANIPULATE OBJ

        //console.log(review)
        //console.log(reviewObj)
        // get the associated images
        let image = await SpotImage.findByPk(reviewObj.id, {
            where: {
                preview: true
            },
            attributes: ['url'],
            raw: true
        });


        // add preview image to each review obj's "Spot" property in the Array
        if (!image) { // if there is no image, set to an empty string
            reviewObj.Spot.previewImage = ""
        } else { // if there is an image, add its url as a kvp
            reviewObj.Spot.previewImage = image.url
        }


        // get the associated review images:
        let reviewImagesArray = await ReviewImage.findAll({
            where: {
                reviewId: reviewObj.id
            },
            attributes: ['id', 'url']
        })

        //set this to a new property in our object
        reviewObj.ReviewImages = reviewImagesArray


        // push each newaly updated review obj into our final array
        finalArray.push(reviewObj)

    }


    return res.json({
        Reviews: finalArray
    })





    // const allReviews = await Review.findAll({
    //     include: [{
    //             model: User,
    //             attributes: ["id", "firstName", "lastName"]
    //         },
    //         {
    //             model: Spot,// NEED TO ADD PREVIEW IMAGE TO THIS NEED TO RENAME!!!!!!!
    //             attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"], // to include preview image
    //             include: { model: SpotImage,  attributes: ['url']} // REDO THIS !!!!!!!!!!!!!!!!
    //         },
    //         {
    //             model: ReviewImage,
    //             attributes: ["id", "url"]
    //         }
    //     ]
    // });

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

})


//*********************************************************************** */
//------------------------ CREATE/ ADD AN IMAGE TO REVIEW by review id ------------------------

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {

    const {
        url
    } = req.body

    let review = await Review.findByPk(req.params.reviewId)

    //Error response: Couldn't find a Review with the specified id
    if (!review) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    // if the user isn't the creator of the review -- don't authorize
    if (review.userId !== req.user.id) {
        res.status(403)
        return res.json({
            message: "You must have authorization to add images to this review",
            statusCode: 403
        })
    }


    else if (review.userId === req.user.id) { // if the user is the one who made the review...

        //get all review images associated with this review
        const allReviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['url']
        });


        // ERROR HANDLING: don't allow more than 10-- try this with sequelize  aggregate!!!!
        let numImages = allReviewImages.length

        if (numImages >= 10) { // ERROR: IF MORE THAN TEN DONT ALLOW NEW IMAGES TO BE ADDED
            res.status(403)
            return res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
        } else { // WE CAN CREATE A NEW IMAGE


            const newReviewImage = await ReviewImage.create({
                url,
                reviewId: req.params.reviewId
            })

            // add properties to response
            let responseObj = {}
            responseObj.id = newReviewImage.id
            responseObj.url = newReviewImage.url

            res.status(200)
            return res.json(responseObj)
        }
    }

});




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
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    // Error Response: Body validation errors

    if (stars < 1 || stars > 5 || Number.isNaN(stars) || !review || review === '') {
        res.status(404)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    // update properties in the obj
    let reviewObj = currReview.toJSON()

    console.log(reviewObj)


    reviewObj.review = review
    reviewObj.stars = stars


    res.status(200)
    return res.json(reviewObj)

})


//*********************************************************************** */
//------------------------- DELETE A  REVIEW -------------------------------

router.delete("/:reviewId", requireAuth, async (req, res, next) => {

    const userId = req.user.id

    const {
        reviewId
    } = req.params

    console.log(userId)
    console.log(reviewId)

    const review = await Review.findByPk(reviewId)

    if (!review) {

        res.status(404)

        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }


    await review.destroy()

    res.status(200)

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })


})


//*********************************************************************** */


module.exports = router;
