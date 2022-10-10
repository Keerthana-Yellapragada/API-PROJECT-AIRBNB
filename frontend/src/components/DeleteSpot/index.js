import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import removeSpot, { deleteSpot } from "../../store/spots"
import { loadAllSpots } from '../../store/spots';
import './DeleteSpot.css'
import {closeProp} from "../../context/Modal"

const DeleteSpotForm = ({closeProp}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    spotId = parseInt(spotId)


    useEffect(() => {
        dispatch(loadAllSpots());
    }, [dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
         closeProp();
         history.push("/")



    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        closeProp();
        history.push("/current/spots")

    };




    return (
        <>
            <form className='delete-spot-flex-container'>
                <h1>Are you sure you want to remove this listing?</h1>
               <div className='delete-spot-button-container'>
                    <button type="submit" onClick={handleSubmit}>Yes, Remove Listing</button>
                    <button type="button" onClick={handleCancelClick}>No, Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteSpotForm;
