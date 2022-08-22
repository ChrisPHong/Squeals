import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './BusinessPage.css'
import { deleteBusiness, getOneBusiness } from '../../store/business'

function BusinessPage({ business }) {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();

    let userId = useSelector((state) => state?.session?.user.id)


    useEffect(() => {

    }, [dispatch])

    return (
        <>
            <div className='contentDiv'>
                <Link to={`/businesses/${business.id}`}>
                    <div className='fillPhoto'>
                        <figure className='imageDivPicture' onClick={() => {
                            dispatch(getOneBusiness(business.id))
                        }} style={{ backgroundImage: `url(${business.image})` }} />

                    </div>
                </Link>
                <div className='informationDiv'>
                {business?.userId === userId ?
                    <div className='edit-Delete-container'>

                        <div className='editDiv'>

                            <button
                                onClick={async () => {
                                    await dispatch(getOneBusiness(business.id))
                                    await history.push(`/businesses/${business.id}/edit`)
                                }}
                                className='editButton ownerButton Link'

                            >Edit</button>
                        </div>


                        <div className='deleteDiv'>

                            <button className='deleteButton ownerButton'
                                onClick={() => {
                                    dispatch(deleteBusiness(business.id))
                                }}
                            >Delete</button>
                        </div>
                    </div>
                    : null}
                    <div className='businessName'>
                        <h2 className='businessTitle' key={`title${business.id}`}>{business.title}</h2>
                    </div>
                    <div className='pDiv'>
                        <p className='description' key={`description${business.id}`}>{business.description}</p>
                    </div>
                    <div className='addressBusiness'>
                        <p className='address' key={`address${business.address}`}>{`${business.address} ${business.city}, ${business.state} ${business.zipCode}`}</p>
                        <div>
                            <p className='address'>{`(${business.phoneNumber.slice(0, 3)})-${business.phoneNumber.slice(3, 6)}-${business.phoneNumber.slice(6.10)}`}</p>
                        </div>
                    </div>
                </div>


            </div>







        </>
    )
}

export default BusinessPage;
