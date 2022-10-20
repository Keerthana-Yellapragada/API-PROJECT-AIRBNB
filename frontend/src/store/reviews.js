import thunk from "redux-thunk"
import { csrfFetch } from "./csrf"


// *****************************************************************************
//****************************** ACTION CREATORS *****************************

// Create a Review
// Read a Review
// Update/Edit a Review
// Delete a Review

///*************************************************************************** */

const GET_ALLREVIEWS = 'reviews/getAllReviews'
const GET_REVIEW = 'reviews/getReview'
// const GET_USER_REVIEWS='reviews/userReviews'
const CREATE_REVIEW = 'reviews/createReview'
// const UPDATE_REVIEW = 'reviews/updateReview'
const REMOVE_REVIEW = 'reviews/removeReview'

///*************************************************************************** */
// -------------------------  LOAD ALL REVIEWS   ----------------------------------

// Get/Load All Reviews
const getAllReviews = (reviews) => {
    return {
        type: GET_ALLREVIEWS,
        reviews
    }
}


///*************************************************************************** */
// -------------------------  GET USER'S REVIEWS   ----------------------------------

// const getUserReviews = (reviews) => {
//     return {
//         type: GET_USER_REVIEWS,
//         reviews
//     }
// }

///*************************************************************************** */
// -------------------------  GET REVIEW'S DETAILS   ----------------------------------

// Get a review and its info
const getReview = (review) => {
    return {
        type: GET_REVIEW,
        payload: review
    }
}
///*************************************************************************** */
// -------------------------  CREATE A REVIEW  ----------------------------------

//create a review
const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review

    }
}
///*************************************************************************** */
// -------------------------  EDIT A REVIEW  ----------------------------------
//edit/update a review
// const updateReview = (review) => {
//     return {
//         type: UPDATE_REVIEW,
//         payload: review
//     }
// }

///*************************************************************************** */
// -------------------------  DELETE A REVIEW   ----------------------------------
//delete/remove a review

const removeReview = reviewId => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewId

    }
}

///*************************************************************************** */


// *****************************************************************************
//************************************ THUNKS **********************************
// -------------------------  LOAD ALL REVIEWS OF A SPOT   ---------------------------------

export const loadAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    // console.log(response)
    if (response.ok) {
        const reviewsList = await response.json();

        // const filteredReviews = reviewsList.find(review=>reviewsList.review.spotId ===spotId)

        dispatch(getAllReviews(reviewsList)) // dispatch using out action creator from above to get all reviews
    }
}
///*************************************************************************** */
// -------------------------  GET USER REVIEWS   ----------------------------------
export const loadUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`);
    // console.log(response)
    if (response.ok) {
        const reviews = await response.json();

        // const filteredReviews = reviewsList.find(review=>reviewsList.review.spotId ===spotId)
        dispatch(getAllReviews(reviews)) // dispatch using out action creator from above to get all reviews
    }
}




///*************************************************************************** */
// -------------------------  CREATE A REVIEW   ----------------------------------
export const createNewReview = (reviewData) => async dispatch => {

    let spotId = reviewData.spotId

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    let reviewInfo = await response.json();
    //get reviewId from newly created review obj
    let reviewId = reviewInfo.id
    //use reviewId to create a reviewImage

///:reviewId/images

// if (reviewImageData.url !== "") {
//     const response2 = await csrfFetch(`/api/reviews/${reviewId}/images`, {
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
// -------------------------  GET A REVIEW'S INFO   ----------------------------------

export const getReviewInfo = reviewId => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const reviewInfo = await response.json();
        dispatch(getReview(reviewInfo)) // dispatch using out action creator from above to get review's info by spotId
    }
}
///*************************************************************************** */
// -------------------------  EDIT A REVIEW   ----------------------------------
// // EDIT A REVIEW INFO
// export const editReview = reviewInfo => async dispatch => {
//     const response = await fetch(`/api/reviews/${reviewInfo.id}`, { //get the id from the review obj and use that
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(reviewInfo)
//     });

//     if (response.ok) {
//         const review = await response.json();
//         dispatch(updateReview(review)) // dispatch using out action creator from above to get review's info by spotId
//         return review;
//     }
// }

///*************************************************************************** */
// -------------------------  DELETE A REVIEW  ----------------------------------

export const deleteReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
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
            action.reviews.Reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state, ...allReviews
            } //return a new updated state for reviews
///*************************************************************************** */
            // case GET_USER_REVIEWS:

            // //normalize our data
            // action.reviews.Reviews.forEach(review => {
            //     allReviews[review.id] = review
            // })
            // return {
            //     ...state, ...allReviews
            // }

///*************************************************************************** */

        case CREATE_REVIEW:

            const newState = { ...state }

            newState[action.payload.id] = action.payload // normalize and add data

            return newState;
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
