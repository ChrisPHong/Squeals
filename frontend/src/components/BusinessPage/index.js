import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './business.css';
import { loadBusinesses, deleteBusiness } from '../../store/business'

function BusinessPage() {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => Object.values(state.business));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    
    let userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(loadBusinesses());

    }, [dispatch])

    return (
        <div>
            <h1>Businesses</h1>
            <div>

                {businesses.map(business => {
                    return (
                        <div key={`div${business.id}`} className={`div${business.id}`}>
                            <div className='EntireBusinessDiv'>
                                <Link to={`/businesses/${business.id}`}>
                                <img key={`image${business.id}`} src={business.image}
                                />
                                </Link>
                                <h2 className='businessName'>Business Name</h2>
                                <ul className='businessTitle' key={`title${business.id}`}>{business.title}</ul>
                                <h2>Description</h2>
                                <li key={`description${business.id}`}>{business.description}</li>
                            </div>
                            <div className='editDiv'>
                                {(business.userId === userId) ?
                                    <Link to={`/businesses/${business.id}`}>
                                        <button className='editButton'

                                        >Edit</button>
                                    </Link>
                                    : null}
                            </div>

                            <div className='deleteDiv'>
                                {(business.userId === userId) ?
                                    <button className='deleteButton'
                                        onClick={() => {
                                            dispatch(deleteBusiness(business.id))
                                        }}
                                    >Delete</button>
                                    : null}
                            </div>

                        </div>

                    )
                })}

            </div>
        </div>
    )
}

export default BusinessPage;
