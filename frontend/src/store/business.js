export const LOAD_BUSINESSES = 'businesses';
export const ADD_BUSINESS = 'business/add';
export const EDIT_BUSINESS = 'business/edit';
export const ONE_BUSINESS = 'business/one'
export const DELETE_BUSINESS = 'business/delete'

const { csrfFetch } = require('../store/csrf')

const load = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

const create = (business) => ({
    type: ADD_BUSINESS,
    business

})

const edit = (business) => ({
    type: EDIT_BUSINESS,
    business
})

const removeBusiness = (business) => ({
    type: DELETE_BUSINESS,
    business
})

const getOne = (business) => ({
    type: ONE_BUSINESS,
    business
})

export const loadBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/businesses', {
        method: 'GET'
    });

    if (response.ok) {
        const businesses = await response.json();
        dispatch(load(businesses));
    }
}

export const getOneBusiness = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${id}`, {
        method: 'GET'
    });

    if (response.ok) {
        const business = await response.json();
        dispatch(getOne(business));
    }
}

export const createBusiness = (business) => async (dispatch) => {
    const response = await csrfFetch('/api/businesses', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(business)
    })
    if (response.ok) {
        const business = await response.json();
        dispatch(create(business));
        return business;
    }
}

export const editBusiness = (businessId, business) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(business)
    })

    if (response.ok) {
        const business = await response.json();
        dispatch(edit(business));
        return business;
    }

}

export const deleteBusiness = (businessId) => async (dispatch) => {

    const response = await csrfFetch(`api/businesses/${businessId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(removeBusiness(businessId));

        return data

    }
}
const initialState = {};

const businessReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_BUSINESSES:
            const newBusiness = {};
            action.businesses.business.forEach(business => {
                newBusiness[business.id] = business
            });
            return {
                ...state,
                ...newBusiness
            }

        case DELETE_BUSINESS:
            const newState = { ...state }
            delete newState[action.business]

            return newState;

        case ONE_BUSINESS:
            //this is for getting the reviews as well
            // const reviewStateAndBusiness = {};
            // action.business.reviews.forEach(review =>{
            //     reviewStateAndBusiness[review.id] = review
            // });

            return {
                // ...reviewStateAndBusiness,
                [action.business.business.id]: action.business.business,
                // [action.business.reviews.id]: action.business.reviews

            }
        case ADD_BUSINESS:
            if (!state[action.business.id]) {
                const newState = {
                    ...state,
                    [action.business.id]: action.business
                };
                return newState;
            }
        case EDIT_BUSINESS:
            return {
                ...state,
                [action.business.id]: action.business
            }


        default:
            return state;
    }
}

export default businessReducer;
