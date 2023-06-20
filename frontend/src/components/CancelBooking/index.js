import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import { deleteBooking, loadAllBookings, loadUserBookings } from "../../store/bookings"
import { loadAllSpots}from '../../store/spots';
import './CancelBooking.css'
import {closeModal} from "../../context/Modal"

const CancelBookingForm = ({closeModal, bookingId}) => {
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(loadAllBookings());
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // closeModal();
        await dispatch(deleteBooking(bookingId)).then(dispatch(loadAllBookings())).then(()=> history.push("/current/bookings"))
    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push("/current/bookings")
    };



    return (
        <>
            <form onSubmit={handleSubmit} className='delete-spot-flex-container'>

                {/* <h1>Are you sure you want to cancel your reservation?</h1> */}
               <div className='delete-spot-button-container'>
                <button type="submit" >Cancel Reservation</button>
                    {/* <button type="submit" >Yes, I want to cancel my reservation</button> */}
                    {/* <button type="button" onClick={handleCancelClick}>No, take me back</button> */}
                </div>

            </form>

        </>
    )
}

export default CancelBookingForm;
