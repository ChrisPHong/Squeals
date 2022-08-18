import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux'

import { loadUserInfo } from '../../store/user';
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom'
import { oneReview } from '../../store/review'

/* 
Things to do
- Design the profile page and what information you'd like to display on there
- Maybe display the types of businesss you wrote about? 
- Show how many reviews you've written? 
- on average your rating scale? 
- latest review
- Highest review (because you want to go back to the place you gave the highest review for)
*/
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

                            className='Each-Review-Container'>
                            <div
                                className='Each-Review-ProfilePage'
                                onClick={() => {
                                    history.push(`/businesses/${review.businessId}`)
                                }
                                }>
                                <div className='userInfo-container'>
                                    <div className='username-profilePicture-container'>
                                        <p className='username-title'>{user?.username}</p>
                                        <figure className='profile-picture-review' style={{ backgroundImage: `url(${user?.image})` }} />
                                    </div>

                                </div>
                                <div className='review-business-container'>
                                    <div className='business-container-profilePage'>
                                    <figure className='review-business-image' style={{ backgroundImage: `url(${review.Business.image})` }} />
                                        {/* <img className='review-business-image' src={review.Business.image} /> */}
                                        <div className='business-title-descrip-profilePage'>

                                            <h4 className='business-title-profilePage'>{review.Business.title} </h4>

                                            <span className='business-descrip-profilePage'>{review.Business.description} </span>
                                        </div>
                                    </div>
                                    <div className='Review-container-profilePage'>
                                    <figure className='review-picture' style={{ backgroundImage: `url(${review?.image})` }} />
                                        {/* <img className='review-picture' src={review?.image} /> */}
                                        <div className='rating-review-container'>
                                            <h4>Rating: {review?.rating}</h4>
                                            <span >"{review?.answer}"</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* <div className='editDiv'>
                                {(review.userId === userId) ?
                                    <button
                                    className='editReviewButton'
                                    onClick={async () => {
                                        await dispatch(oneReview(review.id))
                                        await history.push(`/reviews/${review.id}`)
                                    }}
                                    
                                    >Edit</button>
                                    
                                    : null}
                                </div> */}



                        </div>
                    )
                })}

            </div>

        </div>
    )
}


export default ProfilePage;
