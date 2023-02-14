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
const CREATE_BOOKING = 'bookings/createBooking'
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
// -------------------------  LOAD ALL BOOKINGS OF A SPOT---------------------------------

export const loadAllBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {

        const allBookings = await response.json();

        dispatch(getAllBookings(allBookings))
    }
}
///*************************************************************************** */
// -------------------------  GET USER BOOKINGS   ----------------------------------
export const loadUserBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`);

    if (response.ok) {
        const userBookings = await response.json();

        dispatch(getAllBookings(userBookings)) // dispatch using out action creator from above to get all bookings
        return userBookings;
    }
}



///*************************************************************************** */
// -------------------------  CREATE A BOOKING   ----------------------------------
export const createNewBooking = (createBookingPayload, spotId) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createBookingPayload)
    });

    if (response.ok) {
        const newBooking = await response.json()
        dispatch(createBooking(newBooking))
        return newBooking
    }

};


///*************************************************************************** */
// -------------------------  EDIT A BOOKING   ----------------------------------
// // EDIT A booking INFO
export const editBooking = (editBookingPayload, bookingId) => async dispatch => {

    const response = await csrfFetch(`/api/bookings/${bookingId}`, { //get the id from the booking obj and use that
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editBookingPayload)
    });

    if (response.ok) {
        const editedBooking = await response.json();
        dispatch(updateBooking(editedBooking)) // dispatch using out action creator from above to get booking's info by spotId
        return editedBooking;
    }
}

///*************************************************************************** */
// -------------------------  DELETE A BOOKING  ----------------------------------

export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    dispatch(removeBooking(bookingId))
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ********************************

const initialState = {}


const bookingsReducer = (state = initialState, action) => {
    let allBookings = {}
    switch (action.type) {
        ///*************************************************************************** */
        case GET_ALLBOOKINGS:

            //normalize our data
            action.bookings.Bookings.forEach(booking => {
                allBookings[booking.id] = booking
            })
            return {
                ...state, ...allBookings
            } //return a new updated state for bookings

        case CREATE_BOOKING:

            const newState = {
                ...state
            }

            newState[action.payload.id] = action.payload // normalize and add data

            return { ...newState };
        ///*************************************************************************** */
        case UPDATE_BOOKING:
            const anotherState = {
                ...state
            }

            anotherState[action.payload.id] = action.payload
            return { ...anotherState }
        ///*************************************************************************** */

        case REMOVE_BOOKING:
            const modifiedState = {
                ...state
            }

            delete modifiedState[action.payload]

            return { ...modifiedState }

        ///*************************************************************************** */
        default:
            return state;
    }
}

///*************************************************************************** */
export default bookingsReducer
