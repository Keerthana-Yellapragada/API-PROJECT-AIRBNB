import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';





const ReviewsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    let { spotId } = useParams(); // use params
    spotId = parseInt(spotId)

    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });

    useEffect(() => {
        dispatch(loadAllReviews(spotId)); // dispatch our invoked loadAllSpots thunkmiddleware which will invoke getAllSpots thunk
    }, [dispatch])

    if (!allReviews) { //if we don't have spots- don't display anything
        return null;
    }


    //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

    return (
        <>
            <div className="reviews-title">
            <h1> REVIEWS FOR THIS SPOT</h1>
            </div>
            <div className="reviews-wrapper">
                {
                    allReviews.map(review => {
                        return (
                            <>
                                <NavLink key={review.id} to={`/reviews/${review.id}`}>
                                    <div >
                                        <div>
                                            <div className="primary-text-rating">{`${review.stars} stars`}</div>
                                            <div className='address'> {review.review} </div>
                                        </div>
                                    </div>
                                </NavLink>

                            </>
                        )
                    })
                }
            </div>
        </>
    )

}

export default ReviewsBrowser;
