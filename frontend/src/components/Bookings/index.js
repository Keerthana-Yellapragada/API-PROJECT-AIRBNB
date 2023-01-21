import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { createNewBooking, loadAllBookings, loadUserBookings } from "../../store/bookings"
import { loadOneSpot } from '../../store/spots';
import "./CreateBooking.css"


const CreateBookingForm = ({
    sessionUser,
    spot
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    spotId = parseInt(spotId)

    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = []

        const todayDate = new Date(Date.now())

        const startDateFormatted = new Date(startDate + "T00:00:00" )
        const endDateFormatted = new Date(endDate + "T00:00:00" )

        // error handling for invalid dates
        if (startDateFormatted < todayDate || endDateFormatted < todayDate){
            errors.push("Please select a date in the future as you must provide book atleast 24 hours in advance")
        }

        if (endDateFormatted < startDateFormatted){
            errors.push("Check in date must be prior to check out date")
        }

        setValidationErrors(errors)

    }, [startDate, endDate])

    const updateStartDate = (e) => setStartDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sessionUser) return alert("Please log in to create a booking")
        if (sessionUser.id === spot.ownerId) return alert("Cannot book your own property")

        const createBookingPayload = {
            startDate,
            endDate
        }

try{
            const createdBooking = await dispatch(createNewBooking(createBookingPayload, spotId))

            if (createdBooking){
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                // refresh state with latest bookings
                dispatch(loadAllBookings(spotId))

                // sends user to their bookings page
                history.push("/current/bookings")
            }
        } catch (res){

            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);


        }


    }


    return (
        <>
            <div className='create-bookings-main-container'>

                <div className='booking-top-container'>

                <div className='spot-price-container'>
                <div className="spot-price">${spot.price} </div>
                <div className='night'>night</div>
                </div>

                <div className='booking-top-right-container'><strong className='star-rating-booking'><i className="fa-sharp fa-solid fa-star fa-xs"></i> {spot.avgStarRating}</strong> · {spot.numReviews} reviews</div>
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
                            onChange={updateStartDate} />
                    </div>
                    <div className='check-out-container'>
                        <span id="booking-end-date-id">CHECK-OUT</span>
                        <input
                            className="end-date-input"
                            required
                            id="booking-end-date"
                            type="date"
                            value={endDate}
                            onChange={updateEndDate} />

                    </div>



                </div>


            {startDate && endDate ?

            (
                <div className='booking-price-calculator'>
                    <div className = "booking-price-container">
                        <div className = "booking-container-label">${spot.price} x {(Math.abs(new Date(endDate  + "T00:00:00") - new Date(startDate+ "T00:00:00"))/86400000)} nights = </div>
                        <div className='booking-price-details'> ${spot.price * (Math.abs(new Date(endDate  + "T00:00:00") - new Date(startDate  + "T00:00:00")))/86400000} </div>
                    </div>

                    <div className = "booking-price-container">
                        <div className = "booking-container-label">Cleaning fee: </div>
                        <div className='booking-price-details'> $110</div>
                    </div>

                     <div className = "booking-price-container">
                        <div className = "booking-container-label">Service fee: </div>
                         <div className='booking-price-details'> $70 </div>
                    </div>


                    <div className = "booking-price-container booking-total-price-container" >
                         <div className = "total-price-taxes">Total before taxes = </div>
                         <div className = "booking-price-details total-price-taxes">${110 + 70 + spot.price * (Math.abs(new Date(endDate + "T00:00:00") - new Date(startDate  + "T00:00:00")))/86400000} </div>

                     </div>


                        <div className = "wont-be-charged">You won't be charged yet</div>
                </div> ) : null }




                    <button className="submit-button" type="submit" disabled={validationErrors.length > 0}>Reserve</button>
                </form>
            </div>
        </>
    )

}

export default CreateBookingForm;
