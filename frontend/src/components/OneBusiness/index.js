import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams} from 'react-router-dom';
import { loadBusinesses, deleteBusiness, getOneBusiness } from '../../store/business'
import './oneBusiness.css'
function OneBusiness() {
    const dispatch = useDispatch();
    const id = Number(useParams()?.businessId)
    const business = useSelector((state) => state.business.one[id]);
    const state = useSelector((state) => state);

    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();


    let userId = useSelector((state) => state.session)


    useEffect(() => {
        dispatch(getOneBusiness(id))
    }, [])

    return (
        <>
        <div className='outerBusiness-container'>
        <h1 className='Business-title'>{business?.title}</h1>
        <p> reviews</p>

        </div>

        </>
    )
}

export default OneBusiness;
