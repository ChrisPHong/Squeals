import React, { useState, useEffect } from 'react';
import './ReviewsPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'



function ReviewsPage() {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.review));
    const user = useSelector((state) => Object.values(state.session.user));
    const userName = user[1]
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <h1>Reviews</h1>
            <div>
                {reviews.length > 0 ? reviews.map(review => {
                    return (
                        <div>
                            <h2>Review by {userName}</h2>
                            <div>{review.answer}</div>
                            <div>{review.rating}</div>
                        </div>
                    )
                }) : <div>
                    <h3>This Business Has No Reviews</h3>
                    <h4>Be the First to Review!</h4>
                </div>}

            </div>
            <h2>___________________</h2>
        </div>
    )
}


export default ReviewsPage;
