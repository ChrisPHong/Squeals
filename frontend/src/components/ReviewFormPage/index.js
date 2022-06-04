import React, { useState, useEffect } from 'react';
import './ReviewFormPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { addReview } from '../../store/review'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function ReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const businessid = useParams();
    const businessId = businessid.businessId
    const reviews = useSelector((state) => Object.values(state.review));
    const user = useSelector((state) => Object.values(state.session.user));
    const userId = user[0]


    const [isLoaded, setIsLoaded] = useState(false);
    const [answer, setAnswer] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {
                userId,
                businessId,
                rating,
                answer
            }
            setAnswer('');
            setRating('');
            dispatch(addReview(payload));

        }
    }
    useEffect(() => {
        const error = [];
        if (answer.length < 10) error.push('Please Put a valid Answer with at least 10 characters')
        if (rating < 1 || rating > 5) error.push('Please give a rating within the range from 1 - 5')
        if (rating.length < 1) error.push('Please Put a valid Rating')

        setErrors(error);
    }, [answer, rating])

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <div>
                <form
                className='editForm'
                onSubmit={handleSubmit}>
                    {errors.length > 0 ? <h3 className='validationErrorsReviews'>Validation Errors</h3> : <h3>Post Your Review</h3>}
                    <ul className='errors array'>{errors.length > 0 ? errors.map(error => {
                        return <li key={error}>{error}</li>
                    }) : null}
                    </ul>
                    <label>Rating</label>
                    <input
                        placeholder='values 1 - 5'
                        value={rating}
                        onChange={(e) => {
                            console.log(rating)
                            setRating(e.target.value);
                        }}
                    ></input>
                    <label>Your Review</label>
                    <input
                        placeholder='Explain Your Experience'
                        value={answer}

                        onChange={(e) => {
                            setAnswer(e.target.value);
                        }}></input>
                    <button
                        className='submitButton'
                        disabled={errors.length > 0 ? true : false}
                        type='submit'
                    >{errors.length > 0 ? 'FIX YOUR ERRORS' : 'Post Review'}</button>
                </form>
            </div>
        </div>
    )
}


export default ReviewForm;
