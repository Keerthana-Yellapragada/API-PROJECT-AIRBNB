import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
//import removeSpot, { deleteSpot } from "../../store/spots"
import { loadAllReviews, deleteReview} from '../../store/reviews';

const DeleteReviewForm = () => {
    const dispatch = useDispatch(); // invoke dispatch
    const history = useHistory();
    let { reviewId } = useParams();
    reviewId = parseInt(reviewId) // convert string to integer

    // const allSpots = useSelector(state => Object.values(state.spots));
    //let currReview = useSelector(state => state.reviews.reviewId);
    //console.log("this is curr review", currReview)
    // let thisSpot = allSpots.find(spot => currReview.spotId === spot.id)
    // let spotId = thisSpot.id


    const handleSubmit = async (e) => {
        e.preventDefault();
        let deletedReview = await dispatch(deleteReview(reviewId))
        //.then(() => history.push(`/current/reviews`))
        history.push(`/current/reviews`)

    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/current/reviews`)
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <button type="submit">Delete review</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteReviewForm;
