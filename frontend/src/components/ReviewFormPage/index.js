import React, { useState, useEffect } from "react";
import "./ReviewFormPage.css";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { addReview } from "../../store/review";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const businessid = useParams();
  const businessId = businessid.businessId;
  const reviews = useSelector((state) => Object.values(state.review));
  const businessName = useSelector(
    (state) => state?.business?.one[businessId]?.title
  );
  const user = useSelector((state) => Object.values(state.session.user));
  const userId = user[0];

  const [isLoaded, setIsLoaded] = useState(false);
  const [answer, setAnswer] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [reveal, setReveal] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1582545075804-1ed041a959cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1585336671611-84c832187eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length > 0) {
      setShow(true);
      return;
    }
    if (errors.length === 0) {
      const payload = {
        userId,
        businessId,
        rating,
        answer,
        image,
      };
      await dispatch(addReview(payload));
      setAnswer("");
      setRating("");
      await history.push(`/businesses/${businessId}`);
    }
  };
  useEffect(() => {
    const error = [];
    const numbers = "12345";
    if (answer.length < 10)
      error.push("Please Put a valid Answer with at least 10 characters");
    if (!numbers.includes(rating))
      error.push("You need to put only 1 - 5 values");
    if (rating.length < 1) error.push("Click on a Rating");
    if (answer.length > 5000)
      error.push(
        "Your review exceeds the 5,000 character limit. Shorten your response please"
      );
    if (answer.length < 1) error.push("Please Put a valid answer");

    setErrors(error);
  }, [answer, rating]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const updateFile = (e) => {
  //     const file = e.target.files[0];
  //     if (file) setImage(file);
  // };

  return (
    <div>
      <div className="review-container-entire">
        <div className="title-business-review">
          <h2 className="businessTitle-Review">{businessName}</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            {errors.length > 0 ? (
              <h3 className="validationErrorsReviews">Add Your Review</h3>
            ) : (
              <h3>Post Your Review</h3>
            )}
            <ul className="errors-array">
              {show && errors.length > 0
                ? errors.map((error) => {
                    return (
                      <span className="errorLi" key={error}>
                        {error}
                      </span>
                    );
                  })
                : null}
            </ul>

            <div className="star-widget">
              <input
                type="radio"
                name="rate"
                id="rate-5"
                value={5}
                onChange={(e) => {
                  setRating(5);
                }}
              />
              <label className="fas fa-star" for="rate-5"></label>

              <input
                type="radio"
                name="rate"
                id="rate-4"
                value={4}
                onChange={(e) => {
                  setRating(4);
                }}
              />
              <label className="fas fa-star" for="rate-4"></label>

              <input
                type="radio"
                name="rate"
                id="rate-3"
                value={3}
                onChange={(e) => {
                  setRating(3);
                }}
              />
              <label className="fas fa-star" for="rate-3"></label>

              <input
                type="radio"
                name="rate"
                id="rate-2"
                value={2}
                onChange={(e) => {
                  setRating(2);
                }}
              />
              <label className="fas fa-star" for="rate-2"></label>

              <input
                type="radio"
                name="rate"
                id="rate-1"
                value={1}
                onChange={(e) => {
                  setRating(1);
                }}
              />
              <label className="fas fa-star" for="rate-1"></label>
            </div>

            <label className="custom-fieldReview">
              <input
                required
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
              <span className="placeholder">Review</span>
            </label>

            <label className="custom-fieldReview">
              <span
                className="placeholder-upload"
                onClick={() => {
                  setReveal(!reveal);
                }}
              >
                Select Picture
              </span>
              {reveal ? (
                <div className="chosenImages-review-container">
                  {images.map((item) => {
                    return (
                      <img
                        className={`${
                          image === item ? "selected-Image" : "none"
                        } chosenImages`}
                        src={item}
                        alt="review_picture"
                        onClick={() => {
                          setImage(item);
                        }}
                      />
                    );
                  })}
                </div>
              ) : null}
            </label>

            <button className="submitButton" type="submit">
              Post Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
