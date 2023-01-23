import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { deleteBooking, loadAllBookings, loadUserBookings } from '../../store/bookings';
import { loadAllSpots } from '../../store/spots'
import { format } from 'date-fns'
import "./UserBookings.css"
import CancelBookingFormModal from "../CancelBooking"

const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);

    const userBookings = useSelector(state => Object.values(state.bookings));

    const upcomingBookings = userBookings.filter(booking => (new Date(booking.startDate) > Date.now()))

    const pastBookings = userBookings.filter(booking => (new Date(booking.startDate) < Date.now()))

    useEffect(() => {
        dispatch(loadAllBookings());
        dispatch(loadUserBookings());
        dispatch(loadAllSpots());
    }, [dispatch])

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
                                                    <div className="booking-spot-name">{booking.Spot.name}</div>
                                                    <img className="user-bookings-preview-image" src={booking.Spot.previewImage} alt="spot-preview-image" />
                                                </div>

                                                <div className='booking-right-container'>
                                                    <div className='booking-details'>Check-In: {booking.startDate}</div>

                                                    <div className='booking-details'>Check Out: {booking.endDate}</div>

                                                    {/* <div className='booking-details'>Your Trip: {booking.endDate - booking.startDate} days</div> */}

                                                    <div className='booking-details'>{booking.Spot.description}</div>

                                                    <div className='booking-details'>Address: {booking.Spot.address}, {booking.Spot.city}, {booking.Spot.country}</div>
                                                    <div className='booking-details'>${booking.Spot.price} per night</div>

                                                    {/* <div className='booking-details'>Your Trip: {booking.endDate - booking.startDate} days</div> */}
                                                    {/* <div className='booking-details'>Trip Total: {(booking.endDate - booking.startDate) * booking.Spot.price} before taxes</div> */}


                                                    <div className='edit-delete-bookings-buttons-container'>

                                                        <CancelBookingFormModal bookingId={booking.id} />


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
                                                    <div className="booking-spot-name">{booking.Spot.name}</div>
                                                    <img className="user-bookings-preview-image" src={booking.Spot.previewImage} alt="spot-preview-image" />
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

                                                    {/* <CancelBookingFormModal bookingId={booking.id} /> */}

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
