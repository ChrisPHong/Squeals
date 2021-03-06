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
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'GET'
        //might need to fetch a specific business and get all the reviews for that specific business
    })

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
    }
}

export const addReview = (review) => async (dispatch) => {
    const response = await csrfFetch('/api/reviews', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)

    })
    if (response.ok) {
        const review = await response.json();
        dispatch(add(review))
        return review
    }
}

export const editReview = (reviewId, review) => async (dispatch) => {
    console.log('<<<<<<<<<<<<<<< IN THE EDIT THUNK >>>>>>>>>>>>', review);
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
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const reviewStateAndBusiness = {};
             action.reviews.reviews.forEach(review =>{
                reviewStateAndBusiness[review.id] = review
            });
            const newState = {};
        action.reviews.reviews.forEach(review => {
            newState[review.id] = review
        })


        return { ...state, ...newState }

        case ADD_REVIEW:

            if (!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                };
                return newState;
            }

        case EDIT_REVIEW:
            console.log('<<<<<<<<<<<<<<< ACTION >>>>>>>>>>>>', action)
            return {
                ...state,
                [action.review.id]: action.review
            }
        case DELETE_REVIEW:
            const delState = { ...state }
            delete delState[action.review]

            return delState;
        case ONE_REVIEW:
            return{
                [action.review.review.id]: action.review.review
            }

        default:
            return state
    }
}

export default reviewsReducer;
