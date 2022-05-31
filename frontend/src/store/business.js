export const LOAD_BUSINESSES = 'businesses';
export const ADD_BUSINESS = 'business/add';
export const EDIT_BUSINESS = 'business/edit';

const {csrfFetch} = require('../store/csrf')

const load = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

const create = (business) =>({
    type: ADD_BUSINESS,
    business

})

const edit = (business) =>({
    type: EDIT_BUSINESS,
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

export const createBusiness = (business) => async (dispatch) =>{
    const response = await csrfFetch ('/api/businesses', {
        method: 'POST',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(business)
    })
    if(response.ok){
        const business = await response.json();
        dispatch(create(business));
        return business;
    }
}

export const editBusiness = (businessId, business) => async(dispatch) =>{
    const response = await csrfFetch(`/api/businesses/${businessId}`, {
        method: 'PUT',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(business)
    })

    if(response.ok){
        const business = await response.json();
        dispatch(edit(business));
        return business;
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
            case ADD_BUSINESS:
                console.log(action);
                // if(!state[action.businesses.business.id]){
                //     const newState = {...state,
                // [action.businesses.business.id]: action.businesses.business
                // };
                // return newState;
            // }
            //     const businessesList = newState.business.map((id) => newState[id]);
            //     businessesList.push(action.businesses.business);
            //     return businessesList

            // const arr = action.businesses.business.forEach(business => {

            //     newBusiness[business.id] = business

            // });
            case EDIT_BUSINESS:
        default:
            return state;
    }
}

export default businessReducer;
