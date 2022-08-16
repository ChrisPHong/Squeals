export const LOAD_REVIEWS = 'reviews';
export const ADD_REVIEW = 'review/ADD';
export const EDIT_REVIEW = 'review/EDIT';
export const DELETE_REVIEW = 'review/delete';
export const ONE_REVIEW = 'review/ONE';

const { csrfFetch } = require('../store/csrf')
//actions
const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const add = (review) => ({
    type: ADD_REVIEW,
    review
})

const edit = (review) => ({
    type: EDIT_REVIEW,
    review
})

const delReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

const getOneReview = (review) =>({
    type: ONE_REVIEW,
    review
})
//Thunks

export const loadReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`, {
        method: 'GET'
        //might need to fetch a specific business and get all the reviews for that specific business
    })

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
    }
}

export const addReview = (review) => async (dispatch) => {
    const {userId, businessId, rating, answer, image} = review

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("businessId", businessId);
    formData.append("rating", rating);
    formData.append("answer", answer);

    if (image) formData.append("image", image);

    const response = await csrfFetch('/api/reviews', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,

    })
    if (response.ok) {
        const review = await response.json();
        dispatch(add(review))
        return review
    }
}

export const editReview = (reviewId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(edit(review));
        return review;
    }

}

export const deleteReview = (businessId, reviewId) => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(delReview(reviewId))
        return data;
    }
}

export const oneReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'GET'
    })

    if(response.ok){
        const review = await response.json();
        dispatch(getOneReview(review));
    }
}
const initialState = {entries:{}, one:{}}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {...state, entries:{}}
            action.reviews.forEach(review => {
                newState.entries[review.id] = review
            })
            // console.log(newState, "newState ------------")

            // const reviewStateAndBusiness = {};
            // console.log(action, "ACTION REVIEWSSSSSSSSSSSSSSSS")
            //  action.reviews.reviews.forEach(review =>{
            //     reviewStateAndBusiness[review.id] = review
            // });
            // const newState = {};
        // action.reviews.reviews.forEach(review => {
        //     newState[review.id] = review
        // })


        return newState

        case ADD_REVIEW:

            if (!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                };
                return newState;
            }

        case EDIT_REVIEW:
            newState = {...state}
            console.log(action, "THIS IS THE ACTION <<<<<<<<<<<<<< HIT HTISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs")
            console.log(action.review, "THIS IS THE ACTION <<<<<<<<<<<<<<")
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = { ...state }
            console.log(action, "<<<<<<<<<<<<< HELLO??")
            delete newState.entries[action.review]

            return newState
        case ONE_REVIEW:
            newState = {...state, one:{}}
            newState.one[action.review.id] = action.review
            return newState

        default:
            return state
    }
}

export default reviewsReducer;
