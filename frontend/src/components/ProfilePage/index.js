import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux'

import { loadUserInfo} from '../../store/user';
import { Link } from 'react-router-dom'
import { useParams, useHistory} from 'react-router-dom'
import { getOneBusiness } from '../../store/business'


function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector((state) => Object.values(state.review.entries));
    const userId = Number(useParams()?.userId)
    const user = useSelector((state) => state?.user?.one)[userId];

    console.log(user, "USER PARAMS()")
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        dispatch(loadUserInfo(userId))
    }, [dispatch])

    return (
       <div className='profile-container'>
        <div className=''>
            <h1>{user?.username}</h1>
            <figure />
        </div>

       </div>
    )
}


export default ProfilePage;
