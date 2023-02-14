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
           dispatch(loadAllSpots())
           dispatch(loadUserBookings());
       }, [dispatch])

    const userId = useSelector(state => state.session.user.id);

    const userBookings = useSelector(state => Object.values(state.bookings));


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
                {userBookings.length < 0 ? (<h2 className='no-bookings-banner'>No trips booked...yet!</h2>) :
                    (
                        <div className='user-trips-container'>
                            <div className='upcoming-trips-container'>
                                <div className="upcoming-trips-title">Upcoming Trips</div>
                                <div className='upcoming-trips-flex-container'>
                                    {upcomingBookings.length > 0 ? (upcomingBookings?.map(booking => {
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
                                        : (
                                        <div className='no-upcoming-trips-container'>
                                            <div className='no-upcoming-trips'>
                                            <div > No trips booked...yet!</div>
                                            <div className='no-trips-description'>Time to dust off your bags and start planning your next adventure
                                            </div>
                                            </div>
                                        <div>
                                            <img className="family-pic" alt="family-pic" src="data:image/jpeg;base64,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"/>
                                        </div>
                                        </div>)}


                                </div>
                            </div>
                            <div className='completed-trips-container'>
                                <div className='completed-trips-title'>Where You've Been</div>
                                <div className='upcoming-trips-flex-container'>
                                    {pastBookings?.map(booking => {
                                        return (
                                            <NavLink className="bookings-spot-info-link" to={`/spots/${booking.Spot.id}`}>

                                            <div className='bookings-card'>
                                                <div className='booking-left-container'>
                                                    <div className="booking-spot-name">{booking?.Spot?.name}</div>
                                                    <div className='preview-image-booking-spot-container'>
                                                    <img className="user-bookings-preview-image" src={booking?.Spot?.previewImage} alt="spot-preview-image" /></div>
                                                </div>


                                                <div className='booking-right-container'>

                                                    <div className='booking-details-dates-container'>
                                                    <div className='booking-details-title'>Check-In  |  Check-Out: </div>
                                                    <div className='booking-details'>{new Date(booking?.startDate).toUTCString().split(' ').slice(1, 4).join(' ')} - {new Date(booking?.endDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>

                                                    </div>



                                                    <div className='booking-details'>{booking?.Spot?.description}</div>

                                                    {/* <div className='booking-details-title'>Address: </div> */}
                                                    <div className='booking-details'>{booking?.Spot?.address}, {booking?.Spot?.city}, {booking?.Spot?.country}</div>


                                                    <div className='booking-details-price'>${booking?.Spot?.price} per night</div>



                                                </div>

                                            </div>
                                                </NavLink>
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
