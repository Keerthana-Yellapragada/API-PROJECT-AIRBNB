import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { deleteBooking, loadAllBookings, loadUserBookings } from '../../store/bookings';
import { loadAllSpots } from '../../store/spots'
import { format } from 'date-fns'
import "./UserBookings.css"
import CancelBookingFormModal from "../CancelBooking"

const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

       useEffect(() => {
           dispatch(loadUserBookings());
           dispatch(loadAllSpots())
       }, [dispatch])

    const userId = useSelector(state => state.session.user.id);

    const userBookings = useSelector(state => Object.values(state.bookings));
    console.log("USERBOOKINGS", userBookings)

    const upcomingBookings = userBookings.filter(booking => (new Date(booking.startDate) > Date.now()))

    const pastBookings = userBookings.filter(booking => (new Date(booking.startDate) < Date.now()))



    let startDate;
    let endDate;
    let bookingSpot;
    let startDateFormatted;
    let endDateFormatted;


    if (!userBookings) { return null };
    if (!upcomingBookings) { return null }
    if (!pastBookings) { return null }


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
                                    {upcomingBookings.length ? (upcomingBookings?.map(booking => {
                                        return (

                                            <div className='bookings-card'>
                                                <div className='booking-left-container'>
                                                    <div className="booking-spot-name">{booking?.Spot?.name}</div>
                                                    <img className="user-bookings-preview-image" src={booking?.Spot?.previewImage} alt="spot-preview-image" />
                                                </div>

                                                <div className='booking-right-container'>
                                                    <div className='booking-details'>Check-In: {new Date(booking?.startDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>

                                                    <div className='booking-details'>Check Out: {new Date(booking?.endDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>

                                                    <div className='booking-details'>{booking?.Spot?.description}</div>

                                                    <div className='booking-details'>Address: {booking?.Spot?.address}, {booking?.Spot?.city}, {booking?.Spot?.country}</div>
                                                    <div className='booking-details'>${booking?.Spot?.price} per night</div>

                                                    <div className='edit-delete-bookings-buttons-container'>

                                                        <CancelBookingFormModal className="cancel-bookings-button" bookingId={booking?.id} />

                                                        <button className='edit-bookings-button'><NavLink className="edit-bookings-link" to={`/current/bookings/${booking.id}/edit`}>Edit Reservation</NavLink></button>


                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    }))
                                        : <div className='no-upcoming-trips'>None!</div>}


                                </div>
                            </div>
                            <div className='completed-trips-container'>
                                <div className='completed-trips-title'>Where You've Been</div>
                                <div className='upcoming-trips-flex-container'>
                                    {pastBookings?.map(booking => {
                                        return (

                                            <div className='bookings-card'>
                                                <div className='booking-left-container'>
                                                    <div className="booking-spot-name">{booking?.Spot?.name}</div>
                                                    <img className="user-bookings-preview-image" src={booking?.Spot?.previewImage} alt="spot-preview-image" />
                                                </div>

                                                <div className='booking-right-container'>
                                                    <div className='booking-details'>Check-In: {new Date(booking?.startDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>

                                                    <div className='booking-details'>Check-Out: {new Date(booking?.endDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>
                                                    <div className='booking-details'>{booking?.Spot?.description}</div>

                                                    <div className='booking-details'>Address: {booking?.Spot?.address}, {booking?.Spot?.city}, {booking?.Spot?.country}</div>
                                                    <div className='booking-details'>${booking?.Spot?.price} per night</div>



                                                </div>

                                            </div>

                                        )
                                    })}

                                </div>
                            </div>

                        </div>

                    )}

            </div>

        </>
    )

}

export default UserBookings;
