import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';

// REVIEWS FOR EACH SPOT

const ReviewsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    let { spotId } = useParams(); // use params
    spotId = parseInt(spotId)

    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });

    let filteredReviews = allReviews.filter(review=> review.spotId === spotId)

    useEffect(() => {
        dispatch(loadAllReviews(spotId)); // dispatch our invoked loadAllSpots thunkmiddleware which will invoke getAllSpots thunk
    }, [dispatch, spotId])

    if (!filteredReviews) { //if we don't have spots- don't display anything
        return null;
    }


    //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

    return (
        <>
            <div className="reviews-title">

            <i class="fa-solid fa-star">{`${filteredReviews.length} reviews`}</i>

            </div>
            <div className="reviews-wrapper">
                {
                    filteredReviews.map(review => {
                        return (
                            <>
                            <div>
                                {/* <NavLink key={review.id} to={`/reviews/${review.id}`}> */}
                                    <div >
                                        <div>
                                            {review.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}

                                            <div className="primary-text-rating">{`${review.stars} stars`}</div>
                                            <div className='address'> {review.review} </div>
                                        </div>
                                    </div>
                                {/* </NavLink> */}
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
