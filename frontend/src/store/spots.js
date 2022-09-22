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
        dispatch(getAllSpots(spotsList)) // dispatch using out action creator from above to get all spots
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
        console.log("THIS IS SPOT INFO INSIDE THUNK", spotInfo)

        //get the spot Id from newly created spot
         let spotId = spotInfo.id

         console.log("SPOT ID IS", spotId)
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

    // console.log("THIS HITTING THE THUNK: ",spotInfo.id)

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
    let allSpots = {}

    switch (action.type) {
///*****************************************************************************/

        case GET_ALLSPOTS:
            //normalize our data
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            })

            return { ...state, ...allSpots } //return a new updated state for spots

///*************************************************************************** */

        case CREATE_SPOT:
            const newState = { ...state }
            //console.log(action.payload)
            newState[action.payload.id] = action.payload
           // newState[action.payload.previewImage] = action.payload.images

            return newState //??

///*************************************************************************** */

        case UPDATE_SPOT:
            const updatedState = { ...state }
            //console.log("THIS IS PAYLOAD INSIDE THE REDUCER", action.payload)
            updatedState[action.payload.id] = action.payload

            return updatedState;

///*************************************************************************** */

        case REMOVE_SPOT:
            const modifiedState = { ...state }
            // console.log("REACHED REDUCER FOR DELETE")
            delete modifiedState[action.payload]

            return modifiedState

///*************************************************************************** */

        default:
            return state;

    }
}
///*************************************************************************** */

export default spotsReducer
