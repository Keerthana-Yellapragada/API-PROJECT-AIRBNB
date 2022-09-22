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
//--------------------- *** SPOT-IMAGES ROUTER *** -----------------------
//*********************************************************************** */
//---------------- DELETE A SPOT IMAGE by spot id ----------------

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const {
        imageId
    } = req.params

    const userId = req.user.id

    const image = await SpotImage.findByPk(imageId)

    // DO WE NEED TO ADD AUTHORIXATION ERRORS MANUALLY!??! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // if (!userId) {
    //     res.status(403)
    //     res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     })
    // }

    // Error response: Couldn't find a Spot Image with the specified id
    if (!image) {
        res.status(404)
        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    //else if all is good:

    //DESTROY IMAGE
    await image.destroy()

    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})



//*********************************************************************** */

module.exports = router;
