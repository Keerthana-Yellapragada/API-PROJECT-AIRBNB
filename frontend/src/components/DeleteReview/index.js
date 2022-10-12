import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
//import removeSpot, { deleteSpot } from "../../store/spots"
import { loadAllReviews, deleteReview} from '../../store/reviews';
import '../Reviews/ReviewsBrowser.css'

const DeleteReviewForm = () => {
    const dispatch = useDispatch(); // invoke dispatch
    const history = useHistory();
    let { reviewId } = useParams();
    reviewId = parseInt(reviewId) // convert string to integer


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
            <form className="delete-review-form" onSubmit={handleSubmit}>
                <div className='delete-review-button-container'>
                    <button type="submit">Delete review</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteReviewForm;
