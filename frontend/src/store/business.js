export const LOAD_BUSINESSES = 'businesses';
export const ADD_BUSINESS = 'business/add';


const load = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

const create = (business) =>({
    type: ADD_BUSINESS,
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
    const response = await fetch ('/api/businesses', {
        method: 'POST',
        headers: {"ContentType": 'application/json',
        // "XSRF-TOKEN": `QboNvVfzygWyjZyxo4ZZMk4e`
    },
        body: JSON.stringify(business)
    })
    if(response.ok){
        const business = await response.json();
        dispatch(create(business));
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

                if(!state[action.businesses.business.id]){
                    const newState = {...state,
                [action.businesses.business.id]: action.businesses.business
                };

                const businessesList = newState.business


                console.log(businessesList);

            }
            const arr = action.businesses.business.forEach(business => {
                console.log(arr);
                newBusiness[business.id] = business

            });


            console.log(action);
        default:
            return state;
    }
}

export default businessReducer;
