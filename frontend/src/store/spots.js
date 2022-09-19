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
const getSpot = (spot) => {
    return {
        type: GET_SPOT,
        payload: spot
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
const removeSpot = (spot) => {
    return {
        type: REMOVE_SPOT
    }
}




// *****************************************************************************
//************************************ THUNKS **********************************
export const getAllSpots =



// *****************************************************************************
// ******************************* REDUCERS ********************************
