import React, { useState, useEffect } from 'react';
import './ReviewFormPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { addReview } from '../../store/review'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import emptyStar from './EmptyStar.png'
import fullStar from './FullStar.png'
import halfStar from './HalfStar.png'


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
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return;
        }
        if (errors.length === 0) {
            const payload = {
                userId,
                businessId,
                rating,
                answer,
                image
            }
            await dispatch(addReview(payload));
            setAnswer('');
            setRating('');
            await history.push(`/businesses/${businessId}`)

        }
    }
    useEffect(() => {
        const error = [];
        const numbers = '12345'
        if (answer.length < 10) error.push('Please Put a valid Answer with at least 10 characters')
        if (!numbers.includes(rating)) error.push('You need to put only 1 - 5 values')
        if (rating.length < 1) error.push('Click on a Rating')
        if (answer.length > 5000) error.push('Your review exceeds the 5,000 character limit. Shorten your response please')
        if (answer.length < 1) error.push('Please Put a valid answer')

        setErrors(error);
    }, [answer, rating])

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    console.log(rating, "THIS IS  THE RATTING")

    return (
        <div>
            <div>

                <form
                    className='review-form'
                    onSubmit={handleSubmit}>
                    {errors.length > 0 ? <h3 className='validationErrorsReviews'>Add Your Review</h3> : <h3>Post Your Review</h3>}
                    <ul className='errors-array'>{show && errors.length > 0 ? errors.map(error => {
                        return <span className='errorLi'
                            key={error}>{error}</span>
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

                    <label className='custom-fieldReview'>
                        <input
                            required
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                            }}
                        />
                        <span className='placeholder'>Review</span>
                    </label>

                    <input type='file'
                        required
                        className='inputBox'
                        onChange={updateFile}
                    />
                    <button
                        className='submitButton'
                        type='submit'
                    >Post Review</button>
                </form>
            </div>
        </div>
    )
}


export default ReviewForm;
