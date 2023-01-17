import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { loadAllBookings, loadUserBookings } from '../../store/bookings';
import {loadAllSpots} from '../../store/spots'

const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);
    console.log("USERID ON USER BOOKINGS PAGE IS", userId)

    const allSpots = useSelector (state => state.session.spots)
    console.log("ALL SPOTS IN USERBOOKINGS IS", allSpots)

    // /gets all of current user's bookings
    const userBookings = useSelector(state => Object.values(state.bookings));
    console.log("USERBOOKINGS IS", userBookings)

    const upcomingBookings = userBookings.filter(booking => (new Date(booking.startDate) > Date.now()))
    console.log("UPCOMING BOOKINGS IS", upcomingBookings)

    const pastBookings = userBookings.filter(booking => (new Date(booking.startDate) < Date.now()))
    console.log("PAST BOOKINGS IS", pastBookings)




    // load the most updated user bookings
    useEffect(() => {
        dispatch(loadUserBookings());
        dispatch(loadAllBookings());
        dispatch(loadAllSpots());
    }, [dispatch, userId])

    if (!userBookings){ return null};
    if (!upcomingBookings) {return null}
    if (!pastBookings) { return null}
     if (!allSpots){return null};

    let bookingSpot;


    return (
        <>
            <div className='user-bookings-page-main-container'>
                <div className='user-bookings-page-title'>Your Trips</div>
                {!userBookings.length ? (<h2 className='no-bookings-banner'>You don't have any trips yet!</h2>) :
                    (
                        <div className='user-trips-container'>
                            <div className='upcoming-trips-container'>
                                <div>Your Upcoming Trips</div>
                                <div className='upcoming-trips-flex-container'>
                                    {upcomingBookings?.map(booking => {
                                        return (
                                            <>
                                                <div className='bookings-card'>
                                                    <div>booking.startDate</div>'
                                                    <div>booking.endDate</div>'
                                                    <div>{parseInt(booking.spotId)}</div>

                                                    {/* find the spot that matches */}
                                                    {bookingSpot = allSpots?.filter(spot => spot.id === booking.spotId)}
                                                    <div>{bookingSpot.name}</div>
                                                    <div>{bookingSpot.address}</div>
                                                    <div>{bookingSpot.city}</div>
                                                    <div>{bookingSpot.description}</div>
                                                    <div>{bookingSpot.price} per night</div>
                                                    <div>Your Trip: {booking.endDate - booking.startDate} days</div>
                                                    <div>Trip Total: {(booking.endDate - booking.startDate) * bookingSpot.price} before taxes</div>

                                                </div>
                                            </>
                                        )
                                    })}


                                </div>
                            </div>
                            <div className='completed-trips-container'>
                                <div>Your Completed Trips</div>
                            </div>

                        </div>

                    )}

            </div>

        </>
    )

}

export default UserBookings;
