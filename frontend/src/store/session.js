// frontend/src/store/session.js
import {
    csrfFetch
} from './csrf';

// *****************************************************************************
//****************************** ACTION CREATORS *****************************
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


// *****************************************************************************
//************************************ THUNKS **********************************
// SIGNUP THUNK:
export const signup = (user) => async (dispatch) => {
    const {
        username,
        email,
        password,
        firstName,
        lastName
    } = user;

    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
            firstName,
            lastName
        }),
    });
    const data = await response.json();

    dispatch(setUser(data));
    return response;
};






//LOGIN THUNK:
export const login = (user) => async (dispatch) => {
    const {
        credential,
        password
    } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};


//our initial state before login
const initialState = {
    user: null
};




// RESTORE USER THUNK:
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

// LOGOUT THINK:

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

// *****************************************************************************
// ******************************* REDUCERS ********************************



const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;


// window.store.dispatch(window.sessionActions.signup({
//     username: 'NewUser',
//     email: 'new@user.io',
//     password: 'password',
//     firstName: 'keerthana',
//     lastName: 'Yellapragada'
// }));
