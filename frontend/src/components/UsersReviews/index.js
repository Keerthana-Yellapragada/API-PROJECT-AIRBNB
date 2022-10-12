import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadUserReviews } from '../../store/reviews';

import './UserReviews.css'


const UserReviewsBrowser = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)
    const userId = useSelector(state => state.session.user.id)


    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });
    //GET REVIEWS OF CURRENT USER
    let userReviews = allReviews.filter(review => review.userId === userId)


    useEffect(() => {
        dispatch(loadUserReviews());
    }, [dispatch])

    if (!userReviews) {
        return (<h1>You don't haven't left reviews yet!</h1>);
    }


    return (
        <>
            <div className="user-reviews-title"> <h1> Your Reviews</h1> </div>
            <div className="reviews-wrapper">
                {userReviews.map(review => {
                    return (


                            <div className='user-review-card'>

                                    <div className="review-title">
                                        <i className="fa-solid fa-star"></i>
                                        <div>{review.stars}</div>
                                        {/* <div className="primary-text-rating">{`${review.stars} stars`}</div> */}
                                    </div>

                                    {review.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}

                                    <div className='review-content'> {review.review} </div>

                                    <button className='review-button'><NavLink className="go-to-review-link" to={`/reviews/${review.id}`}>Go To Review</NavLink></button>

                            </div>



                    )
                })
                }
            </div>
        </>
    )

}

export default UserReviewsBrowser;
