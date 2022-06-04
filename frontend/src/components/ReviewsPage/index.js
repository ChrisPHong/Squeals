import React, { useState, useEffect } from 'react';
import './ReviewsPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { deleteReview, loadReviews } from '../../store/review';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getOneBusiness } from '../../store/business'


function ReviewsPage() {
    const dispatch = useDispatch();
    const businessid = useParams();
    const businessId = businessid.businessId
    const reviews = useSelector((state) => Object.values(state.review));
    const newReviews = reviews.filter(review => review.businessId == businessId)
    const user = useSelector((state) => Object.values(state.session.user));
    const userName = user[1]

    const userId = user[0]
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadReviews(businessId))
    }, [dispatch])

    return (
        <div>
            <h1>Reviews</h1>
            <div>
                {newReviews.length > 0 ? newReviews.map(review => {
                    return (
                        <div
                        className='reviewForm'
                        key={`outerDiv${review.id}`}>
                            <h2 key={`h2${review.id}`}>Review</h2>
                            {/* <label key={`label${review.id}`}>Review:</label> */}
                            <div key={`answer${review.id}`}>"{review.answer}"</div>
                            <div key={`rating${review.id}`}>Rating: {review.rating}</div>


                            <div className='editDiv'>
                                {(review.userId === userId) ?
                                    <Link to={`/reviews/${review.id}`}>
                                        <button className='editButton'

                                        >Edit</button>
                                    </Link>
                                    : null}
                            </div>

                            <div className='deleteDiv'>
                                {(review.userId === userId) ?
                                    <button className='deleteButton'
                                        onClick={() => {
                                            dispatch(deleteReview(businessId, review.id))
                                        }}
                                    >Delete</button>
                                    : null}
                            </div>
                        </div>
                    )
                }) : <div>
                    <h3>This Business Has No Reviews</h3>
                    <h4>Be the First to Review!</h4>
                </div>}

            </div>
        </div>
    )
}


export default ReviewsPage;
