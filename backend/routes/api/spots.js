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
// 1. Get All Spots including previewImage and avgRating
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
// 2. Get all spots owned by a specified owner
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
// 3. Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
let spotId = req.params.id
let spotInfo = await Spot.findByPk(spotId, {
    //have to add numReviews by getting length of associatred reviews
    //have to add avgStarRating(same as above)
    // haave to add SpotImages(id,url,preview) in array
    // have to add Owner: id, firstName, lastName from Users table
    include: [{
            model: SpotImage
        },
        {
            model: User,
            attributes: ["id", "firstName", "lastName"]
        }
    ]
})
// NEED TO ADD ERROR HANDLING FOR 404 RESPONSE IF WE CANT FIND SPOT BASED ON ID
return res.json({
    spotInfo
}) // returns null?!
})
//*********************************************************************** */
// 4. Create a Spot
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
// 5. Add an Image to a Spot based on the Spot’s id
router.post('/:spotId/images', async (req, res, next) => {
    let {
        url,
        preview,
        spotId
    } = req.body
    // HAVE TO FIND SPOT BY ID PK :
    let newImage = await SpotImage.create(url, preview, spotId);
    newImage.url = req.body.url
    newImage.preview = req.body.preview
    newImage.spotId = req.body.spotId
    await newImage.save()
    // ADD ERROR HANDLING
    return res.json(newImage)
});
//*********************************************************************** */
// // 6. Edit a Spot
// router.put('/:spotId', async (req, res) => {
// let {
//     address,
//     city,
//     state,
//     country,
//     lat,
//     lng,
//     name,
//     description,
//     price
// } = req.body
// // find the spot based on Id with await findbyPk
// // then call udpate on it
// //add error handling
// // call save
// //send response body
// })
//*********************************************************************** */
// //7. DELETE A SPOT
// router.delete('/spotId', async (req, res) => {
// // find spot by pk
// //call destroy() method
// //save?
// // have error handling for if we can’t find spot by id
// //send response body
// })


module.exports = router;
