// import thunk from "redux-thunk"



// // *****************************************************************************
// //****************************** ACTION CREATORS *****************************
// // Create a Review
// // Read a Review
// // Update/Edit a Review
// // Delete a Review

// const GET_ALLREVIEWS = 'reviews/getAllReviews'
// const GET_REVIEW = 'reviews/getReview'
// const CREATE_REVIEW = 'reviews/createReview'
// // const UPDATE_REVIEW = 'reviews/updateReview'
// const REMOVE_REVIEW = 'reviews/removeReview'


// // Get/Load All Reviews
// const getAllReviews = (reviews) => {
//     return {
//         type: GET_ALLREVIEWS,
//         reviews
//     }

// }


// // Get a review and its info
// const getReview = (review) => {
//     return {
//         type: GET_REVIEW,
//         payload: review
//     }
// }


// //create a review
// const createReview = (review) => {
//     return {
//         type: CREATE_REVIEW,
//         payload: review

//     }
// }


// // edit/update a review
// // const updateReview = (review) => {
// //     return {
// //         type: UPDATE_REVIEW,
// //         payload: review
// //     }
// // }


// //delete/remove a review
// const removeReview = reviewId => {
//     return {
//         type: REMOVE_REVIEW

//     }
// }




// // *****************************************************************************
// //************************************ THUNKS **********************************

// // LOAD ALL SPOTS
// export const loadAllReviews = (spotId) => async dispatch => {
//     const response = await fetch(`/api/reviews`);
//     // console.log(response)
//     if (response.ok) {
//         const reviewsList = await response.json();

//         const filteredReviews = reviewsList.find(review=>reviewsList.review.spotId ===spotId)

//         dispatch(getAllReviews(reviewsList)) // dispatch using out action creator from above to get all reviews
//     }
// }




// // GET A REVIEW INFO
// export const getReviewInfo = reviewId => async dispatch => {
//     const response = await fetch(`/api/reviews/${reviewId}`);

//     if (response.ok) {
//         const reviewInfo = await response.json();
//         dispatch(getReview(reviewInfo)) // dispatch using out action creator from above to get review's info by spotId
//     }
// }


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


// // DELETE A POKEMON
// export const deleteReview = reviewId => async dispatch => {
//     const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: 'DELETE'
//     });

//     dispatch(removeReview(reviewId)) // dispatch the action create to remove a user
//     return response;
// }



// // *****************************************************************************
// // ******************************* REDUCERS ********************************

// const initialState = {}


// const spotsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_ALLREVIEWS:
//             const allReviews = {}

//             //normalize our data
//             action.reviews.Reviews.forEach(review => {
//                 allReviews[review.id] = review
//             })


//             return {
//                 ...state, ...allReviews
//             } //return a new updated state for reviews
//             default:
//                 return state;
//     }
// }


// export default reviewsReducer
