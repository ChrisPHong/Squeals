export const LOAD_USER = 'user/INFO';
export const EDIT_USER = 'user/Edit';
export const ADD_REVIEW = 'review/ADD';
export const EDIT_REVIEW = 'review/EDIT';
// export const DELETE_REVIEW = 'user/review/delete';


const { csrfFetch } = require('../store/csrf')
//actions
const load = (user) => ({
    type: LOAD_USER,
    user
})

const edit = (user) => ({
    type: EDIT_REVIEW,
    user
})

// const delReview = (review) => ({
//     type: DELETE_REVIEW,
//     review
// })

// const add = (review) => ({
//     type: ADD_REVIEW,
//     review
// })


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


export const editUser = (user) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })

    if (response.ok) {
        const user = await response.json();
        dispatch(edit(user));
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
