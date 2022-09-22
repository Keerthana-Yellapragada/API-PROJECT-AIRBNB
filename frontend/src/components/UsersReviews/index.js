import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadUserReviews } from '../../store/reviews';



const UserReviewsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    let { spotId } = useParams(); // use params
    spotId = parseInt(spotId)

    const allReviews = useSelector(state => {
        const allReviewsArray = Object.values(state.reviews)
        return allReviewsArray;
    });

    const userId = useSelector(state=>state.session.user.id)

   // console.log("THIS IS USER ID", userId)
   // console.log("THIS IS ALL REVIEWS", allReviews)

    useEffect(() => {
        dispatch(loadUserReviews()); // dispatch our invoked loadAllSpots thunkmiddleware which will invoke getAllSpots thunk
    }, [dispatch])

    if (!allReviews) { //if we don't have spots- don't display anything
        return null;
    }

    //GET REVIEWS OF CURRENT USER
    let userReviews = allReviews.filter(review => review.userId === userId )
    //console.log(userReviews)
    //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

    return (
        <>
            <div className="reviews-title"> <h1> MY REVIEWS</h1> </div>
            <div className="reviews-wrapper">
                {
                    userReviews.map(review => {
                        return (
                            <>
                                <NavLink key={review.id} to={`/reviews/${review.id}`}>
                                    <div >
                                        <div>
                                            {review.ReviewImages.map(reviewImage => <img src={reviewImage.url}></img>)}
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

export default UserReviewsBrowser;
