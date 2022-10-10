import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadUserReviews } from '../../store/reviews';



const UserReviewsBrowser = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)

    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });

    const userId = useSelector(state=>state.session.user.id)



    useEffect(() => {
        dispatch(loadUserReviews());
    }, [dispatch])

    if (!allReviews) {
        return null;
    }

    //GET REVIEWS OF CURRENT USER
    let userReviews = allReviews.filter(review => review.userId === userId )

    return (
        <>
            <div className="reviews-title"> <h1> MY REVIEWS</h1> </div>
            <div className="reviews-wrapper">
                {
                    userReviews.map(review => {
                        return (
                            <>
                                {/* <NavLink key={review.id} to={`/reviews/${review.id}`}> */}
                                    <div >
                                        <div>
                                            {review.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}
                                            <div className="primary-text-rating">{`${review.stars} stars`}</div>
                                            <div className='address'> {review.review} </div>
                                            <button><NavLink to={`/reviews/${review.id}`}>Delete this Review</NavLink></button>
                                        </div>
                                    </div>
                                {/* </NavLink> */}


                            </>
                        )
                    })
                }
            </div>
        </>
    )

}

export default UserReviewsBrowser;
