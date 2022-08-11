import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { loadBusinesses, deleteBusiness, getOneBusiness } from '../../store/business'
import './oneBusiness.css'


function OneBusiness() {
    const dispatch = useDispatch();
    const id = Number(useParams()?.businessId)
    const business = useSelector((state) => state.business.one[id]);
    const reviews = useSelector((state) => Object.values(state?.review));
    const state = useSelector((state) => state);
    console.log(reviews)

    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();


    let userId = useSelector((state) => state.session)


    useEffect(() => {
        dispatch(getOneBusiness(id))
    }, [])

    const copyBusinessLink = () => {
        const link = `https://squeals.herokuapp.com/businesses/${id}`
        navigator.clipboard.writeText(link)
    }

    const copyPhoneNumber = () => {
        const phoneNumber = `${business?.phoneNumber}`
        navigator.clipboard.writeText(phoneNumber)
    }

    return (
        <>
            <div className='outerBusiness-container'>
                <div
                    // style={{ backgroundImage: `url(${business?.image})` }}
                    className='title-and-reviews-container'>
                        {/* <img className='image-background' src={business?.image}/> */}
                        <figure  className='photos-profile-page' style={{backgroundImage: `url(${business?.image})`}} />

                    <h1 className='Business-title'>{business?.title}</h1>
                    <p className='reviews-tag'>{reviews?.length} reviews</p>

                </div>
                <div className='review-share-container'>

                    <Link to={`/businesses/${business?.id}/reviews`}>
                        <button
                            onClick={() => {
                                dispatch(getOneBusiness(business?.id))
                            }}
                            className='ownerButton add-a-Review-Button'

                        >Add a Review</button>
                    </Link>
                    <button onClick={copyBusinessLink} className='ShareButton'>
                        Share
                    </button>

                </div>

                <div className='phone-address-container'>
                    <p className='phone-number-line' onClick={copyPhoneNumber}>{`(${business?.phoneNumber.slice(0, 3)}) ${business?.phoneNumber.slice(3, 6)} - ${business?.phoneNumber.slice(6.10)}`}</p>
                    <p className='address-line'>{business?.address} {business?.city} {business?.state} {business?.zipCode}</p>
                </div>

                <div className='About-the-business-Container'>
                    <h2 className='h2-tag-AboutBusiness'>About the Business</h2>
                    <div className='aboutBusiness'>
                            {business?.description}
                    </div>

                </div>
            </div>

        </>
    )
}

export default OneBusiness;
