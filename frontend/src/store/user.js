export const LOAD_USER = 'user/INFO';
export const EDIT_USER = 'user/Edit';
export const ADD_REVIEW = 'review/ADD';


const { csrfFetch } = require('../store/csrf')
//actions
const load = (user) => ({
    type: LOAD_USER,
    user
})

const editUser = (user) => ({
    type: EDIT_USER,
    user
})


//Thunks

export const loadUserInfo = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const user = await response.json();
        dispatch(load(user));
    }
}


export const editUserProfile = (user) => async (dispatch) => {
    const { bio, image } = user
    const formData = new FormData();

    formData.append("bio", bio);

    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "multipart/form-data", },
        body: formData
    })

    if (response.ok) {
        const user = await response.json();
        dispatch(editUser(user));
        return user;
    }

}

const initialState = { entries: {}, one: {} }

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER:
            newState = { ...state, one: {} }
            newState.one[action.user.id] = action.user
            return newState

        case EDIT_USER:
            newState = { ...state }
            newState.one[action.user.id] = action.user
            return newState
        // case DELETE_REVIEW:
        //     newState = {...state}
        //     console.log(action, " THIS IS THE ACTION>>>>>>>>")
        //     // delete newState.one[action.review]
        //     return newState;

        default:
            return state
    }
}

export default usersReducer;
