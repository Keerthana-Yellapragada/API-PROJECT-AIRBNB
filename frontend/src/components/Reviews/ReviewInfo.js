import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserReviews } from '../../store/reviews';
import DeleteReviewForm from '../DeleteReview';
import './ReviewInfo.css'
import { loadAllSpots } from '../../store/spots';

const ReviewInfo = () => {
    const dispatch = useDispatch();
    let { reviewId } = useParams();
    reviewId = parseInt(reviewId)

    useEffect(() => {
        dispatch(loadUserReviews())
        // dispatch(loadAllSpots())
    }, [dispatch])


    const allReviewsArray = useSelector(state => Object.values(state.reviews))
    const currentReview = allReviewsArray.find(review => review.id === reviewId)
    // console.log("current review", currentReview)
    // console.log("current review spot : ", allReviewsArray[reviewId].Spot.name)

    //get the spot that this review is for
    // const  allSpots = useSelector(state=>Object.values(state.spots))
    // let reviewSpot = allSpots.find(spot => spot.id === currentReview.spotId)
    // console.log("REVIEW SPOT", reviewSpot)


    if (!currentReview) {
        return (<h1>Sorry, no review was found.</h1>)
    }


    return (
        <>
         <div className='current-review-card-flex-container'>
            <div className='current-review-card'>

                <div className="current-review-title">
                    <i className="current-review-page-star fa-solid fa-star"></i>
                    <div className='current-review-rating'>{currentReview.stars}</div>
                      {/* <div className='review-spot-name'>{currentReview.Spot.name}</div> */}
                </div>
                {/* <div  className="current-review-images-container">
                      {currentReview.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}
                </div> */}
                       <div className='current-review-content'> {currentReview.review} </div>
            </div>

              <DeleteReviewForm />
            </div>
        </>

    )

}


export default ReviewInfo;
