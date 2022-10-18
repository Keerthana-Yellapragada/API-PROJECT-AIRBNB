import thunk from "redux-thunk"
import { csrfFetch } from "./csrf"


// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a Spot
// Read a Spot
// Update/Edit a Spot
// Delete a Spot

///*************************************************************************** */

const GET_ALLSPOTS = 'spots/getAllSpots'
const GET_ONESPOT = 'spots/getOneSpot'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const REMOVE_SPOT = 'spots/removeSpot'


///*************************************************************************** */

// **** GET ALL SPOTS ****
const getAllSpots = (spots) => {
    return {
        type: GET_ALLSPOTS,
        spots
    }

}
///*************************************************************************** */

// *** GET ONE SPOT ***

const getOneSpot = (spot) => {
    return {
        type: GET_ONESPOT,
        payload: spot
    }
}

///*************************************************************************** */

// **** CREATE A SPOT ****
const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot

    }
}

///*************************************************************************** */

// **** EDIT/UPDATE A SPOT ****
const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}
///*************************************************************************** */

//**** DELETE/REMOVE A SPOT ****
const removeSpot = spotId => {
    return {
        type: REMOVE_SPOT,
        payload: spotId

    }
}



// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL SPOTS   ----------------------------------

export const loadAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    // console.log(response)
    if (response.ok) {
        const spotsList = await response.json();
        dispatch(getAllSpots(spotsList))
    }
}


//*************************************************************************** */

// -------------------------  LOAD ONE SPOT   ----------------------------------

export const loadOneSpot = (spotId) => async dispatch => {

    const response = await fetch(`/api/spots/${spotId}`);

    //response also includes spot owners details(id, firstname, lastname)

    if (response.ok) {
        const spot = await response.json();
        dispatch(getOneSpot(spot))
    }
}

///*************************************************************************** */

// -------------------------  CREATE A SPOT   ----------------------------------

export const createNewSpot = (imageData, spotData) => async dispatch => {

    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });


    let spotInfo = await response.json();
    //console.log("THIS IS SPOT INFO INSIDE THUNK", spotInfo)

    //get the spot Id from newly created spot
    let spotId = spotInfo.id

    //console.log("SPOT ID IS", spotId)
    //-------------------------------------------------

    const response2 = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(imageData)

    });

    let imageInfo = await response2.json();
    //return (imageInfo);

    // UPDATE STATE
    if (response.ok && response2.ok) {
        dispatch(createSpot(spotInfo));
        return spotInfo;
    }


};

///*************************************************************************** */

// -------------------------  EDIT SPOT INFO   ----------------------------------

export const editSpot = (spotInfo) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${spotInfo.id}`, { //get the id from the spot obj and use that
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotInfo)
    });

    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(updateSpot(editedSpot)) // dispatch using out action creator from above to get spot's info by spotId
        return editedSpot;
    }
}


///******************************************************************************/

// -------------------------  DELETE ALL SPOTS   ---------------------------------

export const deleteSpot = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    dispatch(removeSpot(spotId)) // dispatch the action create to remove a user
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}


const spotsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        ///*****************************************************************************/

        case GET_ALLSPOTS:

            //normalize the data
            newState = { ...state }

            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })

            return newState;

        ///*************************************************************************** */
        case GET_ONESPOT:

            newState = {}

            newState[action.payload.id] = action.payload

            return { ...newState }


        ///*************************************************************************** */

        case CREATE_SPOT:
            newState = { ...state }

            newState[action.payload.id] = action.payload

            return newState

        ///*************************************************************************** */

        case UPDATE_SPOT:
            newState = { ...state }
            newState[action.payload.id] = action.payload

            return newState;

        ///*************************************************************************** */

        case REMOVE_SPOT:
            newState = { ...state }

            delete newState[action.payload]

            return newState

        ///*************************************************************************** */

        default:
            return state;

    }
}
///*************************************************************************** */

export default spotsReducer
