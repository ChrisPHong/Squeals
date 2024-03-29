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
    const { userId, title, description, address, city, state, zipCode, phoneNumber, image } = business
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("phoneNumber", phoneNumber);


    if (image) formData.append("image", image);

    const response = await csrfFetch('/api/businesses', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
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
        dispatch(removeBusiness(data));

        return data

    }
}
const initialState = { entries: {}, one: {} };

const businessReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_BUSINESSES:
            newState = { ...state, entries: {} };
            action.businesses.business.forEach(business => {
                newState.entries[business.id] = business
            });
            return newState

        case DELETE_BUSINESS:
            newState = { ...state }
            delete newState.entries[action.business.id]
            return newState;

        case ONE_BUSINESS:
            newState = { ...state, one: {} }
            newState.one[action.business.business.id] = action.business.business

            return newState
        case ADD_BUSINESS:
            if (!state[action.business.id]) {
                newState = {
                    ...state,
                };
                newState.entries[action.business.id] =  action.business
                return newState;
            }
        case EDIT_BUSINESS:
            newState = { ...state, entries: { ...state.entries }, one: { ...state.one } }
            newState.entries[action.business.id] = action.business
            return newState


        default:
            return state;
    }
}

export default businessReducer;
