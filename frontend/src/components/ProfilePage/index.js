import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux'

import { loadUserInfo } from '../../store/user';
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom'
import { getOneBusiness } from '../../store/business'
import { oneReview, deleteReview } from '../../store/review'


function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector((state) => Object.values(state.review.entries));
    const profileId = useParams()?.userId
    const user = useSelector((state) => state?.user?.one)[profileId];
    const userId = useSelector((state) => state?.session?.user?.id);

    console.log(profileId, "USER PARAMS()")
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        dispatch(loadUserInfo(profileId))
    }, [dispatch])

    return (
        <div className='profile-container'>
            <div className='username-profilePicture-container'>
                <h1>{user?.username}</h1>
                <figure className='profile-picture' style={{ backgroundImage: `url(${user?.image})` }} />
            </div>
            <div className='reviews-container-profilePage'>
                {user?.Reviews.map((review, idx) => {
                    return (

                        <div
                            key={idx}
                            onClick={() => {
                                history.push(`/businesses/${review.businessId}`)
                            }}
                            className='Each-Review-ProfilePage'>
                            <div >Rating: {review?.rating}</div>
                            <div >"{review?.answer}"</div>
                            <img className='review-picture' src={review?.image} />
                            <div className='editDiv'>
                                {(review.userId === userId) ?
                                    <button
                                        className='editReviewButton'
                                        onClick={async () => {
                                            await dispatch(oneReview(review.id))
                                            await history.push(`/reviews/${review.id}`)
                                        }}

                                    >Edit</button>

                                    : null}
                            </div>

                            <div className='deleteDiv'>
                                {(review.userId === userId) ?
                                    <button className='deleteReviewButton'
                                        onClick={() => {
                                            dispatch(deleteReview(review.businessId, review.id))
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


export default ProfilePage;
