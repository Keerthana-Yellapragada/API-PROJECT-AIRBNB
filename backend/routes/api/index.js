// backend/routes/api/index.js
// IMPORT ALL ROUTERS WE HAVE CREATED
//*********************************************************************** */

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewsRouter= require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const reviewImagesRouter = require('./review-images.js');
const spotsRouter = require('./spots.js');
const spotImagesRouter = require("./spot-images.js")
const mapsRouter = require('./maps');


//*********************************************************************** */

const {
    restoreUser
} = require("../../utils/auth.js");

//*********************************************************************** */
// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null

//*********************************************************************** */


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/review-images', reviewImagesRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/maps', mapsRouter);



//*********************************************************************** */


//TEST:

// router.post('/test', (req, res) => {
//     res.json({
//         requestBody: req.body
//     });
// });



//*********************************************************************** */

module.exports = router;
