import thunk from "redux-thunk"
import {
    csrfFetch
} from "./csrf"


// *****************************************************************************
//****************************** ACTION CREATORS *****************************

// Create a booking
// Read a booking
// Update/Edit a booking
// Delete a booking

///*************************************************************************** */

const GET_ALLBOOKINGS = 'bookings/getAllBookings'
const GET_BOOKING = 'bookings/getBooking'
// const GET_USER_REVIEWS='bookings/userReviews'
const CREATE_BOOKING= 'bookings/createBooking'
const UPDATE_BOOKING = 'bookings/updateBooking'
const REMOVE_BOOKING = 'bookings/removeBooking'

///*************************************************************************** */
// -------------------------  LOAD ALL bookings   ----------------------------------

// Get/Load All bookings
const getAllBookings = (bookings) => {
    return {
        type: GET_ALLBOOKINGS,
        bookings
    }
}


///*************************************************************************** */
// -------------------------  GET USER'S bookings   ----------------------------------

// const getUserBookings = (bookings) => {
//     return {
//         type: GET_USER_BOOKINGS,
//         bookings
//     }
// }

///*************************************************************************** */
// -------------------------  GET booking'S DETAILS   ----------------------------------

// Get a booking and its info
const getBooking = (booking) => {
    return {
        type: GET_BOOKING,
        payload: booking
    }
}
///*************************************************************************** */
// -------------------------  CREATE A booking  ----------------------------------

//create a booking
const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking

    }
}
///*************************************************************************** */
// -------------------------  EDIT A booking  ----------------------------------
//edit/update a booking
const updateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        payload: booking
    }
}

///*************************************************************************** */
// -------------------------  DELETE A booking   ----------------------------------
//delete/remove a booking

const removeBooking = reviewId => {
    return {
        type: REMOVE_BOOKING,
        payload: reviewId

    }
}

///*************************************************************************** */


// *****************************************************************************
//************************************ THUNKS **********************************
// -------------------------  LOAD ALL BOOKINGS ---------------------------------

export const loadAllBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {

         const allBookings = await response.json();
         console.log("bookings response ok are", allBookings)
         dispatch(getAllBookings(allBookings))
    }
}
///*************************************************************************** */
// -------------------------  GET USER BOOKINGS   ----------------------------------
export const loadUserBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`);

    if (response.ok) {
        const userBookings = await response.json();
        console.log("user bookings is", userBookings)
        dispatch(getAllReviews(userBookings)) // dispatch using out action creator from above to get all bookings
    }
}



///*************************************************************************** */
// -------------------------  CREATE A BOOKING   ----------------------------------
export const createNewReview = (createBookingPayload, spotId) => async dispatch => {
    console.log("DID IT REACH CREATE BOOKING THUNK")
    let spotId = reviewData.spotId

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    let reviewInfo = await response.json();
    //get reviewId from newly created booking obj
    let reviewId = reviewInfo.id
    //use reviewId to create a reviewImage

    ///:reviewId/images

    // if (reviewImageData.url !== "") {
    //     const response2 = await csrfFetch(`/api/bookings/${reviewId}/images`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(reviewImageData)

    //     });

    //     let imageInfo = await response2.json();
    //         //return (imageInfo);

    //     if (response.ok && response2.json){

    //          dispatch(createReview(reviewInfo));

    //          return reviewInfo;
    //     }

    // }


};

///*************************************************************************** */
// -------------------------  GET A booking'S INFO   ----------------------------------

export const getReviewInfo = reviewId => async dispatch => {
    const response = await fetch(`/api/bookings/${reviewId}`);

    if (response.ok) {
        const reviewInfo = await response.json();
        dispatch(getReview(reviewInfo)) // dispatch using out action creator from above to get booking's info by spotId
    }
}
///*************************************************************************** */
// -------------------------  EDIT A booking   ----------------------------------
// // EDIT A booking INFO
export const editReview = reviewInfo => async dispatch => {
    const response = await fetch(`/api/bookings/${reviewInfo.id}`, { //get the id from the booking obj and use that
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewInfo)
    });

    if (response.ok) {
        const booking = await response.json();
        dispatch(updateReview(booking)) // dispatch using out action creator from above to get booking's info by spotId
        return booking;
    }
}

///*************************************************************************** */
// -------------------------  DELETE A booking  ----------------------------------

export const deleteReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${reviewId}`, {
        method: 'DELETE'
    });

    dispatch(removeReview(reviewId)) // dispatch the action create to remove a user
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ********************************

const initialState = {}


const reviewsReducer = (state = initialState, action) => {
    let allReviews = {}
    switch (action.type) {
        ///*************************************************************************** */
        case GET_ALLREVIEWS:

            //normalize our data
            action.bookings.bookings.forEach(booking => {
                allReviews[booking.id] = booking
            })
            return {
                ...state, ...allReviews
            } //return a new updated state for bookings
            ///*************************************************************************** */
            // case GET_USER_REVIEWS:

            // //normalize our data
            // action.bookings.bookings.forEach(booking => {
            //     allReviews[booking.id] = booking
            // })
            // return {
            //     ...state, ...allReviews
            // }

            ///*************************************************************************** */

            case CREATE_REVIEW:

                const newState = {
                    ...state
                }

                newState[action.payload.id] = action.payload // normalize and add data

                return newState;
                ///*************************************************************************** */
            case UPDATE_REVIEW:
                const anotherState = {
                    ...state
                }

                anotherState[action.payload.id] = action.payload

                return anotherState
                ///*************************************************************************** */

            case REMOVE_REVIEW:
                const modifiedState = {
                    ...state
                }

                delete modifiedState[action.payload]

                return modifiedState

                ///*************************************************************************** */
            default:
                return state;
    }
}

///*************************************************************************** */
export default reviewsReducer
