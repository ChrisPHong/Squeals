import React, { useState, useEffect } from 'react';
import './ReviewsPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { deleteReview, loadReviews, oneReview, reactionReviews } from '../../store/review';
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom'


function ReviewsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const businessId = Number(useParams()?.businessId);
    const reviews = useSelector((state) => Object.values(state.review.entries));
    const user = useSelector((state) => Object.values(state?.session?.user));

    const userId = user[0]
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadReviews(businessId))
    }, [dispatch])

    const reviewLikes = (likesArr) => {
        const results = {
            'funny': [],
            'cool': [],
            'useful': []
        }
        for (let i = 0; i < likesArr.length; i++) {
            if (likesArr[i].label === 'funny') results.funny.push(likesArr[i])
            else if (likesArr[i].label === 'cool') results.cool.push(likesArr[i])
            else if (likesArr[i].label === 'useful') results.useful.push(likesArr[i])
        }
        return results

    }

    const userReacted = (likesArr, label) => {
        const results = reviewLikes(likesArr)
        if (label === 'funny') {
            for (let i = 0; i < results.funny.length; i++) {
                let reaction = results.funny[i]
                if (reaction.userId === userId) {
                    return reaction.id
                }
            }
        }
        else if (label === 'cool') {
            for (let i = 0; i < results.cool.length; i++) {
                let reaction = results.cool[i]
                if (reaction.userId === userId) {
                    return reaction.id
                }
            }
        }
        else if (label === 'useful') {
            for (let i = 0; i < results.useful.length; i++) {
                let reaction = results.useful[i]
                if (reaction.userId === userId) {
                    return reaction.id
                }
            }
        }
        return 0

    }


    return (
        <div className='outer-div-container-Reviews'>
            <div className='Reviews-title-container'>
                <h1 className='businessesTitle'>Reviews</h1>
            </div>
            <div className='ReviewDiv'>
                {reviews.length > 0 ? reviews.map(review => {
                    return (
                        <div
                            className='reviewForm'
                            key={`outerDiv${review.id}`}>
                            {(review.userId === userId) ?
                                <div className='edit-delete-button-container'>

                                    <button
                                        className='editReviewButton'
                                        onClick={async () => {
                                            await dispatch(oneReview(review.id))
                                            await history.push(`/reviews/${review.id}`)
                                        }}

                                    >Edit</button>
                                    <button className='deleteReviewButton'
                                        onClick={() => {
                                            dispatch(deleteReview(businessId, review.id))
                                        }}
                                    >Delete</button>

                                </div>
                                : null}
                            <div className='review-container-likes'>
                                <div className='each-review-container'>
                                    <div
                                        onClick={() => {
                                            history.push(`/users/${review.userId}`)
                                        }}
                                        className='review-username-image-container'>
                                        <figure className='review-profilepicture' style={{ backgroundImage: `url(${review.User.image})` }} />
                                        {/* <img className='review-profilepicture' src={review.User.image} /> */}
                                        <p className='review-username-p-tag'>{review.User.username}</p>
                                    </div>
                                    <div className='review-rating-answer-picture-container'>

                                        <div key={`rating${review.id}`}>Rating: {review.rating}</div>
                                        <div key={`answer${review.id}`}>"{review.answer}"</div>
                                        <img className='review-picture' src={review.image} />
                                    </div>


                                </div>
                                <div className='review-reaction-container'>
                                    <button
                                        onClick={async () => {
                                            let reactionId = userReacted(review?.Likes, 'funny')

                                            const payload = {
                                                userId,
                                                reviewId: review.id,
                                                label: 'funny',
                                                reactionId: reactionId

                                            }
                                            await dispatch(reactionReviews(payload))
                                            await dispatch(loadReviews(businessId))


                                        }}
                                        className={userReacted(review?.Likes, 'funny') > 0 ? 'reacted-button' :'reaction-button'}
                                    > {`Funny
                                    ${reviewLikes(review?.Likes).funny.length}`}
                                    </button>
                                    <button
                                        onClick={async () => {
                                            let reactionId = userReacted(review?.Likes, 'cool')

                                            const payload = {
                                                userId,
                                                reviewId: review.id,
                                                label: 'cool',
                                                reactionId: reactionId

                                            }
                                            await dispatch(reactionReviews(payload))
                                            await dispatch(loadReviews(businessId))


                                        }}

                                        className={userReacted(review?.Likes, 'cool') > 0 ? 'reacted-button' :'reaction-button'}
                                    > {`Cool
                                    ${reviewLikes(review?.Likes).cool.length}`}
                                    </button>
                                    <button
                                        onClick={async () => {
                                            let reactionId = userReacted(review?.Likes, 'useful')

                                            const payload = {
                                                userId,
                                                reviewId: review.id,
                                                label: 'useful',
                                                reactionId: reactionId

                                            }
                                            await dispatch(reactionReviews(payload))
                                            await dispatch(loadReviews(businessId))

                                        }}
                                        className={userReacted(review?.Likes, 'useful') > 0 ? 'reacted-button' :'reaction-button'}
                                    > {`Useful
                                    ${reviewLikes(review?.Likes).useful.length}`}
                                    </button>
                                </div>
                            </div>




                            {/* <div className='deleteDiv'>
                                {(review.userId === userId) ?
                                    <button className='deleteReviewButton'
                                    onClick={() => {
                                        dispatch(deleteReview(businessId, review.id))
                                    }}
                                    >Delete</button>
                                    : null}
                                </div> */}
                        </div>
                    )
                }) : <div className='no-review-div'>
                    <p>This Business Has No Reviews</p>
                    <p>Be the First to Review!</p>
                </div>}

            </div>
        </div>
    )
}


export default ReviewsPage;
