import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './business.css';
import { loadBusinesses, deleteBusiness, getOneBusiness } from '../../store/business'

function BusinessPage() {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => Object.values(state.business));
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    useSelector((state) => console.log(state))
    let userId = useSelector((state) => state.session)
    console.log(userId?.user)
    // if(userId?.user){

    //     userId = useSelector((state) => state.session.user.id)
    // }


    useEffect(() => {
        dispatch(loadBusinesses());

    }, [dispatch])

    return (
        <div>
            <h1>Businesses</h1>
            <div>

                {businesses.map(business => {
                    return (
                        <div key={`div${business.id}`} className={`divbusinessCard`}>

                                <Link to={`/businesses/${business.id}`}>
                                <img className='imageDiv' onClick={() =>{
                                    dispatch(getOneBusiness(business.id))}} key={`image${business.id}`} src={business.image}
                                />
                                </Link>
                                <div className='businessName'>
                                <h2 className='businessTitle' key={`title${business.id}`}>{business.title}</h2>
                                </div>
                                <p className='description' key={`description${business.id}`}>{business.description}</p>
                                <p className='address' key={`address${business.address}`}>{business.address}</p>
                            <div className='editDiv'>
                                {(business.userId === userId.user.id) ?
                                    <Link to={`/businesses/${business.id}`}>
                                        <button className='editButton'

                                        >Edit</button>
                                    </Link>
                                    : null}
                            </div>

                            <div className='deleteDiv'>
                                {(business.userId === userId.user.id) ?
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
