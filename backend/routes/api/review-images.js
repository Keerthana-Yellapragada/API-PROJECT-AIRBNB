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



//*********************************************************************** */
//--------------------- *** REVIEW-IMAGES ROUTER *** -----------------------
//*********************************************************************** */
//---------------- DELETE A REVIEW IMAGE by review id ----------------
//------------!!!!!!!! CHECK AFTER FINISHING REVIEWS ROUTES !!!!!!!!!!!!!!-------

router.delete("/:imageId", async (req, res) => {

    // get image id from req params
    const {imageId }= req.params

    console.log(imageId)

    // get image by pk
    let image = await ReviewImage.findByPk(imageId)

    console.log(image) // why is this returning null?

    // ERROR HANDLING: if we can't find review image by id
    if (!image) {
        res.status(404)
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    // DESTROY the image
    await image.destroy()

    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })


})


//*********************************************************************** */

//------------------------- DELETE A REVIEW IMAGE --------------------------


router.delete("/:imageId", requireAuth, async (req, res, next) => {

    const {
        imageId
    } = req.params

    const userId = req.user.id

  // add user authorization for deleting

    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        res.status(404)
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    await reviewImage.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })


});



//*********************************************************************** */

module.exports = router;
