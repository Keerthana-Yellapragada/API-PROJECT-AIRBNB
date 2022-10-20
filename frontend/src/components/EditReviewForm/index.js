import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import { editReview, getReviewInfo } from '../../store/reviews';

function EditReviewForm({closeModal}) {
    let { reviewId } = useParams()
    reviewId = parseInt(reviewId)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getReviewInfo(reviewId)
    }, [dispatch])


    const reviews = useSelector(state => Object.values(state.reviews))
    const currentReview = reviews.find(review => review.id === reviewId)


    //states
    const [stars, setStars] = useState(currentReview.stars);
    const [review, setReview] = useState(currentReview.review);
    const [validationErrors, setValidationErrors] = useState([]);


    //update functions
    const updateStars = (e) => setStars(e.target.value);
    const updateReview = (e) => setReview(e.target.value);



    useEffect(() => {
        const errors = [];
        if (stars < 0 || stars > 5) { errors.push("Must provide a rating between 0 to 5 stars") }
        if (review && review === "") {
            errors.push("Please provide a review")
        }

        setValidationErrors(errors)
    }, [stars, review])



    const handleSubmit = async (e) => {

        e.preventDefault();

        const reviewPayload = {
            stars,
            review
        }

        let newReview = await dispatch(editReview(reviewPayload)) //dispatch to update our store

        dispatch(getReviewInfo(reviewId))
        closeModal();
        history.push(`/reviews/${reviewId}`)

    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push(`/reviews/${reviewId}`)
    };


    dispatch(getReviewInfo(reviewId))

    // RETURN THE FORM COMPONENT
    return (
        <div className='edit-review-container'>

            <form onSubmit={handleSubmit}>
                <h1> Edit Your Review! </h1>
                <h3>Tell us more about your experience!</h3>

                <div className="errors">
                    {validationErrors.length > 0 &&
                        validationErrors.map((error) => <div key={error}>{error}</div>)}
                </div>


                <input
                    id="review-info"
                    type="string"
                    placeholder="Your Review Here"
                    required
                    value={review}
                    onChange={updateReview} />


                <input
                    id="stars-rating"
                    type="number"
                    placeholder="Rating: 0-5 stars"
                    required
                    value={stars}
                    onChange={updateStars} />

                <button disabled={validationErrors.length ? true : false} type="submit" >Save Changes</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>

            </form>
        </div>
    )
}



export default EditReviewForm;
