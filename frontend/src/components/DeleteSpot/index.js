import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import removeSpot, { deleteSpot, loadOneSpot } from "../../store/spots"
import { loadAllSpots}from '../../store/spots';

import './DeleteSpot.css'
import {closeModal} from "../../context/Modal"

const DeleteSpotForm = ({closeModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    spotId = parseInt(spotId)


    useEffect(() => {
        dispatch(loadOneSpot(spotId));
    }, [dispatch, spotId]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal();
        await dispatch(deleteSpot(spotId))
        await dispatch(loadAllSpots())
        history.push("/current/spots")
    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push("/current/spots")
    };



    return (
        <>
            <form onSubmit={handleSubmit} className='delete-spot-flex-container'>
                <h1>Are you sure you want to remove this listing?</h1>
               <div className='delete-spot-button-container'>
                    <button type="submit" >Yes, Remove Listing</button>
                    <button type="button" onClick={handleCancelClick}>No, Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteSpotForm;
