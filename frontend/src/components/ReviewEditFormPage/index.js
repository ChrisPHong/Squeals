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
    const review = useSelector((state) => state?.review?.one)[reviewId];
    const businessId = review?.businessId
    const businessName = useSelector((state) => state?.business?.one[businessId]?.title);


    const user = useSelector((state) => Object.values(state.session.user));
    const userId = user[0]
    const [isLoaded, setIsLoaded] = useState(false);
    const [answer, setAnswer] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(oneReview(reviewId))
        setAnswer(review.answer)
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
        if (rating.length < 1) error.push('Click on a Rating')
        if (answer.length < 1) error.push('Please Put a valid answer')

        setErrors(error);
    }, [answer, rating])



    return (

        <div className='editFormDiv'>
            <div className='title-business-review'>

                <h2 className='businessTitle-Review'>{businessName}</h2>
                <form
                    className='editForm'
                    onSubmit={handleSubmit}>
                    {errors.length > 0 ? <h3>Validation Errors</h3> : <h3>Post Your Review</h3>}
                    <ul className='errors-array'>{errors.length > 0 ? errors.map(error => {
                        return <span key={error}>{error}</span>
                    }) : null}
                    </ul>

                    <div className='star-widget'>
                        <input
                            type='radio'
                            name='rate'
                            id='rate-5'
                            value={5}
                            onChange={(e) => {
                                setRating(5);
                            }}
                        />
                        <label className='fas fa-star' for='rate-5'></label>

                        <input
                            type='radio'
                            name='rate'
                            id='rate-4'
                            value={4}
                            onChange={(e) => {
                                setRating(4);
                            }}
                        />
                        <label className='fas fa-star' for='rate-4'></label>

                        <input
                            type='radio'
                            name='rate'
                            id='rate-3'
                            value={3}
                            onChange={(e) => {
                                setRating(3);
                            }}
                        />
                        <label className='fas fa-star' for='rate-3'></label>

                        <input
                            type='radio'
                            name='rate'
                            id='rate-2'
                            value={2}
                            onChange={(e) => {
                                setRating(2);
                            }}
                        />
                        <label className='fas fa-star' for='rate-2'></label>

                        <input
                            type='radio'
                            name='rate'
                            id='rate-1'
                            value={1}
                            onChange={(e) => {
                                setRating(1);
                            }}
                        />
                        <label className='fas fa-star' for='rate-1'></label>
                    </div>
                    {/* <label className='custom-fieldEditReview'>
                    <input
                    className='inputValueReviews'
                    required
                    value={rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}
                    />
                    <span className='placeholder'>Rating</span>
                </label> */}

                    <label className='custom-fieldEditReview'>
                        <input
                            className='inputValueReviews'
                            required
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                            }}
                        />
                        <span className='placeholder'>Review</span>
                    </label>

                    <button
                        type='submit'
                        className='reviewSubmitEditButton'
                        disabled={errors.length ? true : false}
                    >Post Review</button>
                </form>
            </div>
        </div>

    )
}


export default EditFormPage;
