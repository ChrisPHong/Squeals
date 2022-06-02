export const LOAD_REVIEWS = 'reviews';
export const ADD_REVIEW = 'review/ADD';
export const EDIT_REVIEW = 'review/EDIT';
export const DELETE_REVIEW = 'review/delete'


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

const edit = (review) =>({
    type: EDIT_REVIEW,
    review
})

const delReview = (review) =>({
    type: DELETE_REVIEW,
    review
})

//Thunks

export const loadReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews', {
        method: 'GET'
        //might need to fetch a specific business and get all the reviews for that specific business
    })

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
    }
}

export const addReview = (review) => async (dispatch) =>{
    const response = await csrfFetch('/api/reviews', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)

    })
    if(response.ok){
        const review = await response.json();
        dispatch(add(review))
        return review
    }
}

export const editReview = (reviewId, review) => async(dispatch) =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    })

    if(response.ok){
        const review = await response.json();
        dispatch(edit(review));
        return review;
    }

}

export const deleteReview = (businessId, reviewId) => async(dispatch) =>{
    console.log(reviewId);
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    })
    if(response.ok){
        const data = await response.json();
        dispatch(delReview(reviewId))
        return data;
    }
}
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newState = {};
            action.reviews.forEach(review => {
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
            return {
                    ...state,
                    [action.review.id]: action.review
            }
        case DELETE_REVIEW:
            const delState = {...state}
            delete delState[action.review]

            return delState;

        default:
            return state
    }
}

export default reviewsReducer;
