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
    const businessId = Number(useParams()?.businessId);
    const reviews = useSelector((state) => Object.values(state.review.entries));
  console.log(reviews, 'THIS IS TH EREVIEWLKSJD:LKJSDF')
    // const newReviews = reviews.filter(review => review.businessId == businessId)
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
            <div className='ReviewDiv'>
                {reviews.length > 0 ? reviews.map(review => {
                    console.log(review, "this is one review of the reviews")
                    return (
                        <div
                        className='reviewForm'
                        key={`outerDiv${review.id}`}>
                            <div key={`rating${review.id}`}>Rating: {review.rating}</div>
                            <div key={`answer${review.id}`}>"{review.answer}"</div>
                            <img className='review-picture' src={review.image} />


                            <div className='editDiv'>
                                {(review.userId === userId) ?
                                    <Link to={`/reviews/${review.id}`}>
                                        <button className='editReviewButton'

                                        >Edit</button>
                                    </Link>
                                    : null}
                            </div>

                            <div className='deleteDiv'>
                                {(review.userId === userId) ?
                                    <button className='deleteReviewButton'
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
