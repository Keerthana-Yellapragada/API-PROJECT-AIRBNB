import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';
import { loadAllSpots, loadOneSpot } from '../../store/spots'
import './ReviewsBrowser.css'

// REVIEWS FOR EACH SPOT

const ReviewsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    let { spotId } = useParams(); // use params
    spotId = parseInt(spotId)

 useEffect(() => {
        dispatch(loadAllReviews(spotId));
        dispatch(loadOneSpot(spotId))
    }, [dispatch, spotId])

    const currentSpot = useSelector(state => state.spots)


    const sessionUser = useSelector(state => state.session.user)
    let userId;

      if (sessionUser) {
          let userId = sessionUser.id
      }


    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });


    let filteredReviews = allReviews.filter(review => review.spotId === spotId)


    if (!filteredReviews) { //if we don't have spots- don't display anything
        return (<h1>No Reviews Yet!</h1>);
        // return null;
    }


    //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

    return (
        <>
            <div className="reviews-title">
                <i className="review-browser-star fa-solid fa-star"></i>
                {
                    `${!currentSpot.avgStarRating? "NEW" : currentSpot.avgStarRating} · ${!currentSpot.numReviews? 0: currentSpot.numReviews} reviews`
                }

            </div>

     <div className='review-wrapper-container'>
            <div className="reviews-browser-wrapper">
                {
                    filteredReviews.map(review => {
                        return (
                            <>
                                <div className='review-card-flex-container'>
                                    <div >
                                        <div className='review-details-container'>
                                            {/* {review.ReviewImages.map(reviewImage => <img className ="review-image" src={reviewImage.url}></img>)} */}

                                            <div className="review-rating">
                                                <i className="user-review-profile-photo fa-solid fa-circle-user"></i>
                                                <div className='review-user-name'>{review.User.firstName}</div>
                                                <i className="review-user-star fa-solid fa-star"></i>
                                                <div>{review.stars}</div>
                                            </div>
                                            <div className='review-content'> {review.review} </div>
                                        </div>
                                        < div className = 'see-review-button-container' >
                                            {userId === review.userId ? (<button className='see-review-button'>
                                         <NavLink key={review.id} to={`/reviews/${review.id}`}> See Review</NavLink>
                                        </button>) : null}

                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
        </>
    )

}

export default ReviewsBrowser;
