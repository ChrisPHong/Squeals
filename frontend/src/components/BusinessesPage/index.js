import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './business.css';
import { loadBusinesses, deleteBusiness, getOneBusiness } from '../../store/business'
import BusinessPage from '../BusinessPage'

function BusinessesPage() {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => Object.values(state.business.entries));
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    let userId = useSelector((state) => state.session)



    useEffect(() => {
        dispatch(loadBusinesses());

    }, [dispatch])

    return (
        <>
            <div className='entireDiv'>
                <h1 className='businessesTitle'>Businesses
                </h1>
                <div className='allBusinessDiv'>

                    {businesses.map(business => {
                        return (
                            <div key={`div${business.id}`}
                                className={`divbusinessCard`}
                                >
                            <BusinessPage business={business} />


                            </div>

                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default BusinessesPage;
