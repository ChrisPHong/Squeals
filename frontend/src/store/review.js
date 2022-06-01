export const LOAD_REVIEWS = 'reviews';
export const ADD_REVIEW = 'review/ADD'

const { csrfFetch } = require('../store/csrf')

const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const add = (review) => ({
    type: ADD_REVIEW,
    review
})


export const loadReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews', {
        method: 'GET'
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
            console.log(action, '<<<<<<<<< ACTION >>>>>>>>> IN THE ADD REVIEW')
            if (!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                };
                return newState;
            }
        default:
            return state
    }
}

export default reviewsReducer;
