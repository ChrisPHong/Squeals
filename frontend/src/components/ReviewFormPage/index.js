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
            dispatch(addReview(payload));
            // history.push('/businessId')

        }
    }
    useEffect(() => {
        const error = [];
        if (answer.length < 1) error.push('Please Put a valid Answer')
        if (rating.length < 1) error.push('Please Put a valid Rating')

        setErrors(error);
    }, [answer, rating])

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <ul className='errors array'>{errors.length > 0 ? errors.map(error => {
                        return <li key={error}>{error}</li>
                    }) : null}
                    </ul>
                    <label>Rating</label>
                    <input
                        placeholder='values 1 - 5'
                        value={rating}
                        onChange={(e) => {
                            setRating(e.target.value);
                        }}
                    ></input>
                    <label>Your Review</label>
                    <input
                        placeholder='Explain Your Experience'
                        value={answer}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setAnswer(e.target.value);
                        }}></input>
                    <button
                        type='submit'
                    >Post Review</button>
                </form>
            </div>
        </div>
    )
}


export default ReviewForm;
