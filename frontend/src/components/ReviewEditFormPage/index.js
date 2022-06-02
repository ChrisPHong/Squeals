import React, { useState, useEffect } from 'react';
import './ReviewEditFormPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { addReview } from '../../store/review'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { editReview, oneReview} from '../../store/review';


function EditFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();


    const reviewid = useParams();
    const reviewId = reviewid.reviewId
    const reviews = useSelector((state) => Object.values(state.review));
    const review = reviews.filter(review => review.id == reviewId);
    const businessId = review.businessId



    const user = useSelector((state) => Object.values(state.session.user));
    const userId = user[0]
    const [isLoaded, setIsLoaded] = useState(false);
    const [answer, setAnswer] = useState(review[0].answer);
    const [rating, setRating] = useState(review[0].rating);
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
            dispatch(editReview(reviewId, payload));
            history.push(`/`)

        }
    }

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
        dispatch(oneReview(reviewId))
    }, [dispatch]);

    useEffect(() => {
        const error = [];
        if (answer.length < 1) error.push('Please Put a valid Answer')
        if (rating.length < 1) error.push('Please Put a valid Rating')

        setErrors(error);
    }, [answer, rating])



    return (
        // <h1>HELLO</h1>
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
                        setAnswer(e.target.value);
                    }}></input>
                <button
                    type='submit'
                    disabled={errors.length ? true : false}
                >Post Review</button>
            </form>
        </div>
        </div>
    )
}


export default EditFormPage;
