export const LOAD_USER = 'user/INFO';
export const ADD_REVIEW = 'review/ADD';
export const EDIT_REVIEW = 'review/EDIT';
// export const DELETE_REVIEW = 'user/review/delete';


const { csrfFetch } = require('../store/csrf')
//actions
const load = (user) => ({
    type: LOAD_USER,
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

// export const deleteReview = (reviewId) => async (dispatch) => {

//     const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE",
//     })
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(delReview(reviewId))
//         return data;
//     }
// }
// export const addReview = (review) => async (dispatch) => {
//     const {userId, businessId, rating, answer, image} = review

//     const formData = new FormData();
//     formData.append("userId", userId);
//     formData.append("businessId", businessId);
//     formData.append("rating", rating);
//     formData.append("answer", answer);

//     if (image) formData.append("image", image);

//     const response = await csrfFetch('/api/reviews', {
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//         body: formData,

//     })
//     if (response.ok) {
//         const review = await response.json();
//         dispatch(add(review))
//         return review
//     }
// }


const initialState = { entries: {}, one: {} }

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER:
            newState = { ...state, one: {} }
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
