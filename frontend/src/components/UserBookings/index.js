import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { loadAllBookings, loadUserBookings } from '../../store/bookings';
import {loadAllSpots} from '../../store/spots'
import { format } from 'date-fns'
import "./UserBookings.css"

const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);
    console.log("USERID ON USER BOOKINGS PAGE IS", userId)

    // const allSpots = useSelector (state => state.session.spots)
    // console.log("ALL SPOTS IN USERBOOKINGS IS", allSpots)

    // /gets all of current user's bookings
    const userBookings = useSelector(state => Object.values(state.bookings));
    console.log("USERBOOKINGS IS", userBookings)

    const upcomingBookings = userBookings.filter(booking => (new Date(booking.startDate) > Date.now()))
    console.log("UPCOMING BOOKINGS IS", upcomingBookings)

    const pastBookings = userBookings.filter(booking => (new Date(booking.startDate) < Date.now()))
    console.log("PAST BOOKINGS IS", pastBookings)


    let startDate;
    let endDate;


    // load the most updated user bookings
    useEffect(() => {
        dispatch(loadUserBookings());
        dispatch(loadAllBookings());
        dispatch(loadAllSpots());
    }, [dispatch, userId])

    if (!userBookings){ return null};
    if (!upcomingBookings) {return null}
    if (!pastBookings) { return null}
    //  if (!allSpots){return null};

    let bookingSpot;


    return (
        <>
            <div className='user-bookings-page-main-container'>
                <div className='user-bookings-page-title'>Trips</div>
                {!userBookings.length ? (<h2 className='no-bookings-banner'>You don't have any trips yet!</h2>) :
                    (
                        <div className='user-trips-container'>
                            <div className='upcoming-trips-container'>
                                <div className="upcoming-trips-title">Upcoming Trips</div>
                                <div className='upcoming-trips-flex-container'>
                                    {upcomingBookings?.map(booking => {
                                        return (

                                                <div className='bookings-card'>
                                                <div className='booking-left-container'>
                                                    <div className="booking-spot-name">{booking.Spot.name}</div>
                                                    <img className="user-bookings-preview-image" src={booking.Spot.previewImage} alt="spot-preview-image"/>
                                                </div>

                                                <div className='booking-right-container'>
                                                    <div className='booking-details'>Booking Start Date: {booking.startDate}</div>
                                                    {/* <div>{booking.startDatedate.toLocaleDateString()}</div> */}
                                                    <div className='booking-details'>Booking End Date: {booking.endDate}</div>

                                                    <div className='booking-details'>Your Trip: {booking.endDate - booking.startDate} days</div>

                                                    <div className='booking-details'>{booking.Spot.description}</div>

                                                    <div className='booking-details'>Address: {booking.Spot.address}, {booking.Spot.city}, {booking.Spot.country}</div>
                                                     <div className='booking-details'>${booking.Spot.price} / night</div>

                                                    <div className='booking-details'>Your Trip: {booking.endDate - booking.startDate} days</div>
                                                    <div className='booking-details'>Trip Total: {(booking.endDate - booking.startDate) * booking.Spot.price} before taxes</div>
                                                </div>


                                                </div>

                                        )
                                    })}


                                </div>
                            </div>
                            <div className='completed-trips-container'>
                                <div>Where You've Been</div>
                            </div>

                        </div>

                    )}

            </div>

        </>
    )

}

export default UserBookings;
