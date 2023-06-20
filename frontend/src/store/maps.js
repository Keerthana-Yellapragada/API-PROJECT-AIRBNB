// frontend/src/store/maps.js
import {
    csrfFetch
} from './csrf';
// *****************************************************************
// ACTION
const LOAD_API_KEY = 'maps/LOAD_API_KEY';
// *****************************************************************
// ACTION CREATOR
const loadApiKey = (key) => ({
    type: LOAD_API_KEY,
    payload: key,
});
// *****************************************************************
// THUNK
export const getKey = () => async (dispatch) => {
    const res = await csrfFetch('/api/maps/key', {
        method: 'POST',
    });
    const data = await res.json();
    dispatch(loadApiKey(data.googleMapsAPIKey));
};

// *****************************************************************
// REDUCER
const initialState = {
    key: null
};

const mapsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_API_KEY:
            return {
                key: action.payload
            };
        default:
            return state;
    }
};
// *****************************************************************
export default mapsReducer;
