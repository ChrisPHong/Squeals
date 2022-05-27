export const LOAD_BUSINESSES = 'businesses'

const load = (businesses) =>{
    type: LOAD_BUSINESSES,
    businesses
}

export const loadBusinesses = () => async (dispatch) =>{
    const response = await fetch('/api/businesses');

    if(response.ok){
        const businesses = await response.json();
        dispatch(load(businesses));
    }
}

const initialState = {};

const businessReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOAD_BUSINESSES:
            const newBusiness = {};
            action.businesses.forEach(business => {
                newBusiness[business.id] = business
            });
            return {
                ...state,
                ...newBusiness
            }
        default:
            return state;
    }
}

export default businessReducer;
