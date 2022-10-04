import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import removeSpot, { deleteSpot } from "../../store/spots"
import { deleteReview, loadUserReviews } from '../../store/reviews';

const DeleteReviewForm = () => {
    const dispatch = useDispatch(); // invoke dispatch
    const history = useHistory();
    let { reviewId } = useParams();

    reviewId = parseInt(reviewId) // convert string to integer


    useEffect(() => { // need this so spot info gets laoded each time
        dispatch(loadUserReviews());
    }, [dispatch]);

    // const allSpots = useSelector(state => Object.values(state.spots));
    // const thisReview = useSelector(state => state.reviews.reviewId);

    // let thisSpot = allSpots.find(spot => thisReview.spotId === spot.id)
    // let spotId = thisSpot.id



    const handleSubmit = async (e) => {
        e.preventDefault();
        let deletedReview = await dispatch(deleteReview(reviewId)).then(() => history.push("/current/reviews"))

    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/`) // WHY ISNT THIS WORKING!??!
    };



    return (
        <>
            <form>
                <div>
                    <h2>Are you sure you want to delete your review?</h2>
                    <button type="submit" onClick={handleSubmit}>Yes, delete my review</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteReviewForm;
