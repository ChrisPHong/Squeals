import React, { useState, useEffect } from 'react';
import './ReviewEditFormPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { addReview } from '../../store/review'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { editReview, oneReview } from '../../store/review';


function EditFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    
    const reviewId = Number(useParams()?.reviewId);
    const state = useSelector((state) => state);
    const review = useSelector((state) =>state?.review?.one)[reviewId];
    const businessId = review?.businessId
    
    const user = useSelector((state) => Object.values(state.session.user));
    const userId = user[0]
    const [isLoaded, setIsLoaded] = useState(false);
    const [answer, setAnswer] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        dispatch(oneReview(reviewId))
        setAnswer(review.answer)
        setRating(review.rating)
    }, [dispatch, reviewId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {
                userId,
                businessId,
                rating,
                answer
            }
            await dispatch(editReview(reviewId, payload));
            await history.push(`/businesses/${review.businessId}`)

        }
    }


    useEffect(() => {
        const error = [];
        const numbers = '12345'
        if (answer.length < 10) error.push('Please Put a valid Answer with at least 10 characters')
        if (answer.length > 5000) error.push('Your review exceeds the 5,000 character limit. Shorten your response please')
        if (!numbers.includes(rating)) error.push('You need to put only 1 - 5 values')
        if (rating.length < 1) error.push('Please Put a valid Rating')
        if (answer.length < 1) error.push('Please Put a valid answer')

        setErrors(error);
    }, [answer, rating])



    return (

        <div className='editFormDiv'>
            <form
                className='editForm'
                onSubmit={handleSubmit}>
                {errors.length > 0 ? <h3>Validation Errors</h3> : <h3>Post Your Review</h3>}
                <ul className='errors array'>{errors.length > 0 ? errors.map(error => {
                    return <li key={error}>{error}</li>
                }) : null}
                </ul>
                <label>Rating</label>
                <input
                    className='inputValueReviews'
                    placeholder='values 1 - 5'
                    value={rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}
                ></input>
                <label>Your Review</label>
                <input
                    className='inputValueReviews'
                    placeholder='Explain Your Experience'
                    value={answer}
                    onChange={(e) => {
                        setAnswer(e.target.value);
                    }}></input>
                <button
                    type='submit'
                    className='reviewSubmitEditButton'
                    disabled={errors.length ? true : false}
                >Post Review</button>
            </form>
        </div>

    )
}


export default EditFormPage;
