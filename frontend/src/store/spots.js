import thunk from "redux-thunk"
import { csrfFetch } from "./csrf"


// *****************************************************************************
//****************************** ACTION CREATORS *****************************
// Create a Spot
// Read a Spot
// Update/Edit a Spot
// Delete a Spot

const GET_ALLSPOTS = 'spots/getAllSpots'
// const GET_SPOT= 'spots/getSpot'
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


// // Get a spot and its info
// const getSpot = (spotInfo) => {
//     return {
//         type: GET_SPOT,
//         payload: spotInfo
//     }
// }


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
        type: REMOVE_SPOT,
        payload: spotId

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


export const createNewSpot = spotData => async dispatch => {
   // console.log("IS MY CODE RUNNING IN THIS THUNK")
    try {
        const response = await csrfFetch(`/api/spots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spotData)
        });
         if (!response.ok) {
             const error = await response.json()
            //  throw new ValidationError(error)
         }
        //else if all is good update our store state with new store data
       // console.log("THIS IS THE RESPONSE",response)
        let spotInfo = await response.json();

       // console.log("THIS IS SPOT IN THUNK AFTER JSON", spotInfo)

         dispatch(createSpot(spotInfo)); // dispatch
        return spotInfo;
    } catch (error) {
        throw error;
    }
};


// // GET A SPOT INFO
// export const getSpotInfo = spotId => async dispatch => {
//      const response = await fetch(`/api/spots/${spotId}`);

//      if (response.ok) {
//          const spot = await response.json();
//          console.log(spot)
//          dispatch(getSpot(spot)) // dispatch using out action creator from above to get spot's info by spotId
//      }
// }


// EDIT A SPOT INFO
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


// DELETE A POKEMON
export const deleteSpot = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
         method: 'DELETE'
    });

    dispatch(removeSpot(spotId)) // dispatch the action create to remove a user
    return response;
}



// *****************************************************************************
// ******************************* REDUCERS ********************************

const initialState = {}


const spotsReducer = (state=initialState, action) => {
     let allSpots = {}

    switch(action.type) {
        case GET_ALLSPOTS:

            //normalize our data
            action.spots.Spots.forEach(spot=> {
                allSpots[spot.id] = spot
            })


            return {...state, ...allSpots} //return a new updated state for spots

        case CREATE_SPOT:
            const newState = {...state}
            //console.log(action.payload)
            newState[action.payload.id] = action.payload
            return newState //??

        case UPDATE_SPOT:
            const updatedState = {...state}
            //console.log("THIS IS PAYLOAD INSIDE THE REDUCER", action.payload)
            updatedState[action.payload.id] = action.payload
            return updatedState;

        case REMOVE_SPOT:
            const modifiedState = {...state}
           // console.log("REACHED REDUCER FOR DELETE")
            delete modifiedState[action.payload]
            return modifiedState

        default: return state;
    }
}


export default spotsReducer
