import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './business.css';
import { loadBusinesses } from '../../store/business'

function BusinessPage() {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => Object.values(state.business));

    useEffect(() => {
        dispatch(loadBusinesses());
    }, [dispatch])

    return (
        <div>
            <h1>Businesses</h1>
            <div>

                {businesses.map(business => {
                    return (
                        <div key={`div${business.id}`}className={`div${business.id}`}>

                        <img key={`image${business.id}`} src={business.image} />
                        <h2>Restaurant Name</h2>
                        <ul className='businessTitle' key={`title${business.id}`}>{business.title}</ul>
                        <h2>Description</h2>
                        <li key={`description${business.id}`}>{business.description}</li>

                        </div>

                    )
                })}

            </div>
        </div>
    )
}

export default BusinessPage;
