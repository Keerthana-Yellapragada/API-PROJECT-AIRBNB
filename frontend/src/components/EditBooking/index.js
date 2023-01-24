import { editBooking, loadUserBookings, loadAllBookings } from "../../store/bookings";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import "./EditBooking.css"

const EditBookingForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    let { bookingId } = useParams()
    bookingId = parseInt(bookingId)

    useEffect(() => {
        dispatch(loadUserBookings())
    }, [dispatch])

    const userBookings = useSelector(state => Object.values(state.bookings))
    console.log("USERBOOKINGS IS", userBookings)
    const currentBooking = userBookings.filter(booking => booking.id == bookingId)

    console.log("CURRENT BOOKING IS", currentBooking)
    console.log("current booking start", currentBooking[0]?.startDate)
    //states
    const [startDate, updateStartDate] = useState("")
    const [endDate, updateEndDate] = useState("")
    const [validationErrors, setValidationErrors] = useState([]);




    useEffect(() => {
        const errors = []

        const todayDate = new Date(Date.now())

        const startDateFormatted = new Date(startDate + "T00:00:00")
        const endDateFormatted = new Date(endDate + "T00:00:00")

        // error handling for invalid dates
        if (startDateFormatted < todayDate || endDateFormatted < todayDate) {
            errors.push("Please select a date in the future as you must provide book atleast 24 hours in advance")
        }

        if (endDateFormatted < startDateFormatted) {
            errors.push("Check in date must be prior to check out date")
        }

        setValidationErrors(errors)

    }, [startDate, endDate])


    //update functions
    const editStartDate = (e) => updateStartDate(e.target.value);
    const editEndDate = (e) => updateEndDate(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!sessionUser) return alert("Please log in to edit your reservation")

        const editBookingPayload = {
            startDate,
            endDate
        }

        try {
            const editedBooking = await dispatch(editBooking(editBookingPayload, bookingId))

            if (editedBooking) {
                setValidationErrors([]);

                // refresh state with latest bookings
                await dispatch(loadAllBookings(editedBooking.spotId)).then(dispatch(loadUserBookings())).then(() => history.push("/current/bookings"))
            }
        } catch (res) {

            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);

        }

    }


    return (

        <div className="edit-reservation-page-container">
            <div className="edit-reservation-top">
                <div className="edit-reservation-title">Edit Your Reservation</div>

                    <div className="edit-current-reservation-dates-container">
                        <div className="check-in-out">Check-In: {new Date(currentBooking[0].startDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>
                        <div className="check-in-out">Check-Out: {new Date(currentBooking[0].endDate).toUTCString().split(' ').slice(1, 4).join(' ')}</div>
                    </div>

            </div>
            <div id="edit-booking-main-container" className='create-bookings-main-container'>

                <div className='booking-top-container'>

                    <div className='spot-price-container'>
                        <div className="spot-price">${currentBooking[0]?.Spot?.price} </div>
                        <div className='night'>night</div>
                    </div>

                    <div className='booking-top-right-container'><strong className='star-rating-booking'><i className="fa-sharp fa-solid fa-star fa-xs"></i> {currentBooking[0].Spot.avgStarRating}</strong> · {currentBooking[0].Spot.numReviews} reviews</div>
                </div>



                <form onSubmit={handleSubmit} className="bookings-form-container">
                    <div className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((error) =>
                                <div key={error}>{error}</div>
                            )}
                    </div>

                    <div className='date-input-container'>
                        <div className='check-in-container'>
                            <span id="booking-start-date-id">CHECK-IN</span>
                            <input
                                className="start-date-input"
                                required
                                id="booking-start-date"
                                type="date"
                                value={startDate}
                                onChange={editStartDate} />
                        </div>
                        <div className='check-out-container'>
                            <span id="booking-end-date-id">CHECK-OUT</span>
                            <input
                                className="end-date-input"
                                required
                                id="booking-end-date"
                                type="date"
                                value={endDate}
                                onChange={editEndDate} />

                        </div>



                    </div>

                    {/*
                    {startDate && endDate ?
                        (
                        <>
                            <div className='booking-price-calculator'>
                                <div className="booking-price-container">
                                    <div className="booking-container-label">${currentBooking[0].Spot.price} x {(Math.abs((new Date(endDate) - new Date(startDate)) / 86400000))} nights = </div>
                                    <div className='booking-price-details'> ${currentBooking[0].Spot}.price * Math.abs((new Date(endDate) - new Date(startDate)) / 86400000)} </div>
                                </div>

                                <div className="booking-price-container">
                                    <div className="booking-container-label">Cleaning fee: </div>
                                    <div className='booking-price-details'> $110</div>
                                </div>

                                <div className="booking-price-container">
                                    <div className="booking-container-label">Service fee: </div>
                                    <div className='booking-price-details'> $70 </div>
                                </div>


                                <div className="booking-price-container booking-total-price-container" >
                                    <div className="total-price-taxes">Total before taxes = </div>
                                    <div className="booking-price-details total-price-taxes">${110 + 70 + currentBooking[0].Spot.price * (Math.abs(new Date(endDate + "T00:00:00") - new Date(startDate + "T00:00:00"))) / 86400000} </div>

                                </div>


                                <div className="wont-be-charged">You won't be charged yet</div>
                            </div>
                            </>
                            ) : null} */}




                    <button className="submit-button" type="submit" disabled={validationErrors.length > 0}>Reserve</button>
                </form>
            </div>
        </div>
    )

}

export default EditBookingForm
