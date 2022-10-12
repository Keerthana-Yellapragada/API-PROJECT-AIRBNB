import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserReviews } from '../../store/reviews';
import DeleteReviewForm from '../DeleteReview';
import './ReviewsBrowser.css'

const ReviewInfo = () => {
    const dispatch = useDispatch();
    let { reviewId } = useParams();
    reviewId = parseInt(reviewId)

    useEffect(() => {
        dispatch(loadUserReviews())
    }, [dispatch])


    const allReviewsArray = useSelector(state => Object.values(state.reviews))
    const currentReview = allReviewsArray.find(review => review.id === reviewId)

    console.log("current review is ", currentReview)

    if (!currentReview) {
        return (<h1>Sorry, no review was found.</h1>)
    }


    return (
        <>
            <div className='review-card-flex-container'>
            <div className='current-review-card'>
                <div className="review-title">
                    <i className="fa-solid fa-star"></i>
                    <div className='review-stars'>{currentReview.stars}</div>
                </div>
                      {currentReview.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}
                       <div className='current-review-content'> {currentReview.review} </div>
            </div>

              <DeleteReviewForm />
            </div>
        </>

    )

}


export default ReviewInfo;
