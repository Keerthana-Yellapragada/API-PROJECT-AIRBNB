import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';
import { loadAllSpots } from '../../store/spots'
import './ReviewsBrowser.css'

// REVIEWS FOR EACH SPOT

const ReviewsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    let { spotId } = useParams(); // use params
    spotId = parseInt(spotId)

    // const sessionUser = useSelector(state => state.session.user)
    // if (sessionUser){const userId = sessionUser.id}
    // //console.log("userid", userId)
 useEffect(() => {
        //console.log("THIS IS IN REVIEWS USEFFECT")
        dispatch(loadAllReviews(spotId));
        dispatch(loadAllSpots());
    }, [dispatch, spotId])

       const allSpotsArray = useSelector(state => Object.values(state.spots))
       // console.log("THIS IS ALLSPOTSARRAY ", allSpotsArray)

       const currentSpot = allSpotsArray.find(spot => spot.id == spotId)
       //console.log("THIS IS CURRENT SPOT", currentSpot)


    const sessionUser = useSelector(state => state.session.user)
    let userId;
    // if (sessionUser){const userId = sessionUser.id}
    // //console.log("userid", userId)

      if (sessionUser) {
          let userId = sessionUser.id
      }
      //console.log("userid", userId)


    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });
    const spotInfo = useSelector(state => state.spots.spotId)

    let filteredReviews = allReviews.filter(review => review.spotId === spotId)


    if (!filteredReviews) { //if we don't have spots- don't display anything
        // return (<h1>No Reviews Yet!</h1>);
        return null;
    }


    //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

    return (
        <>
            <div className="reviews-title">
                <i className="fa-solid fa-star"></i>
                {
                    `${currentSpot.avgRating === null? "NEW" : currentSpot.avgRating} · ${filteredReviews.length} reviews`
                }

            </div>

            <div className="reviews-wrapper">
                {
                    filteredReviews.map(review => {
                        return (
                            <>
                                <div className='review-card-flex-container'>
                                    <div >
                                        <div className='review-details-container'>
                                            {review.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}

                                            <div className="review-rating">{`${review.stars} stars`}</div>
                                            <div className='review-content'> {review.review} </div>
                                        </div>
                                        < div className = 'delete-review-button-container' >
                                            {userId === review.userId ? (<button className='delete-review-button'>
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
        </>
    )

}

export default ReviewsBrowser;
