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
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(errors.length > 0){
            setShow(true)
            return;
        }
        if (errors.length === 0) {
            const payload = {
                userId,
                businessId,
                rating,
                answer
            }
            setAnswer('');
            setRating('');
            await dispatch(addReview(payload));
            await history.push(`/businesses/${businessId}`)

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
                    {errors.length > 0 ? <h3 className='validationErrorsReviews'>Add Your Review</h3> : <h3>Post Your Review</h3>}
                    <ul className='errors array'>{show && errors.length > 0 ? errors.map(error => {
                        return <li className='errorLi'
                        key={error}>{error}</li>
                    }) : null}
                    </ul>
                    <label>Rating</label>
                    <input
                        placeholder='Values 1 - 5...'
                        value={rating}
                        onChange={(e) => {
                            console.log(rating)
                            setRating(e.target.value);
                        }}
                    ></input>
                    <label>Your Review</label>
                    {/* <input
                        placeholder='Explain Your Experience...'
                        value={answer}

                        onChange={(e) => {
                            setAnswer(e.target.value);
                        }}></input> */}
                    <textarea
                        placeholder="I can't believe this place hasn't been visited and reviewed enough! It was my first time and will NOT BE MY LAST! The atmosphere is a vibe. The service is a vibe!  everything here is just a great vibe..."
                        value={answer}
                        rows='10'
                        col='50'
                        className=''

                        onChange={(e) => {
                            setAnswer(e.target.value);
                        }}></textarea>
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
