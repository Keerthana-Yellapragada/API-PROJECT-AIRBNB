import thunk from "redux-thunk"



// *****************************************************************************
//****************************** ACTION CREATORS *****************************
// Create a Spot
// Read a Spot
// Update/Edit a Spot
// Delete a Spot

const GET_ALLSPOTS = 'spots/getAllSpots'
const GET_SPOT= 'spots/getSpot'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const REMOVE_SPOT = 'spots/removeSpot'


// Get/Load All Spots
const getAllSpots = (spots) => {
    return {
        type: GET_ALLSPOTS,
        spots
    }

}


// Get a spot and its info
const getSpot = (spotInfo) => {
    return {
        type: GET_SPOT,
        payload: spotInfo
    }
}


//create a spot
const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot

    }
}


// edit/update a spot
const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}


//delete/remove a spot
const removeSpot = spotId => {
    return {
        type: REMOVE_SPOT

    }
}




// *****************************************************************************
//************************************ THUNKS **********************************

// LOAD ALL SPOTS
export const loadAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    // console.log(response)
    if (response.ok) {
        const spotsList = await response.json();
        dispatch(getAllSpots(spotsList)) // dispatch using out action creator from above to get all spots
    }
}




// GET A SPOT INFO
export const getSpotInfo = spotId => async dispatch => {
     const response = await fetch(`/api/spots/${spotId}`);

     if (response.ok) {
         const spotInfo = await response.json();
         dispatch(getSpot(spotInfo)) // dispatch using out action creator from above to get spot's info by spotId
     }
}


// EDIT A SPOT INFO
export const editSpot = spotInfo => async dispatch => {
    const response = await fetch(`/api/spots/${spotInfo.id}`, { //get the id from the spot obj and use that
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotInfo)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(updateSpot(spot)) // dispatch using out action creator from above to get spot's info by spotId
        return spot;
    }
}


// DELETE A POKEMON
export const deleteSpot = spotId => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`, {
         method: 'DELETE'
    });

    dispatch(removeSpot(spotId)) // dispatch the action create to remove a user
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ********************************

const initialState = {}


const spotsReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_ALLSPOTS:
            const allSpots = {}

            //normalize our data
            action.spots.Spots.forEach(spot=> {
                allSpots[spot.id] = spot
            })


            return {...state, ...allSpots} //return a new updated state for spots

            case GET_SPOT:

                let spotDetails = action.spotInfo
                let spotId = action.spotInfo.id
                return {
                ...state,
                [state.spots.spotId]:{...spotDetails}
                }

            default: return state;
    }
}


export default spotsReducer
