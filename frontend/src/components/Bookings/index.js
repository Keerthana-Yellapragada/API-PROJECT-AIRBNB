import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { createNewBooking, loadAllBookings } from "../../store/bookings"
import { loadOneSpot } from '../../store/spots';

const CreateBookingForm = ({
    sessionUser,
    spot
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    spotId = parseInt(spotId)

    let [startDate, setStartDate] = useState("2023-01-15");
    let [endDate, setEndDate] = useState("2023-01-15");
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = []
        setValidationErrors(errors)
    }, [startDate, endDate])

    const updateStartDate = (e) => setStartDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();


        const createBookingPayload = {
            startDate,
            endDate
        }

        try {
            const newBooking = await dispatch(createNewBooking(createBookingPayload, spotId)).then(() => dispatch(loadAllBookings(spotId))).then(() => dispatch(loadOneSpot(spotId)))
            history.push("/current/bookings")
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
        <>
            <div className='bookings-main-container'>
                <div className="spot-price"><strong>${spot.price}</strong> night</div>
                {/* <div><strong><i className="fa-sharp fa-solid fa-star fa-xs"></i> {spot.avgStarRating}</strong> · {spot.numReviews} reviews</div> */}

                <form onSubmit={handleSubmit} className="bookings-form-container">
                    <div className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((error) =>
                                <div>{error}</div>
                            )}
                    </div>

                    <div className='date-input-container'>
                        <label htmlFor="booking-start-date">check in</label>
                        <input
                            className="start-date-input"
                            required
                            id="booking-start-date"
                            type="date"

                            value={startDate}
                            onChange={updateStartDate} />
                        <label htmlFor="booking-end-date">check out</label>
                        <input
                            className="end-date-input"
                            required
                            id="booking-end-date"
                            type="date"
                            value={endDate}
                            onChange={updateEndDate} />

                    </div>

                    <button className="submit-button" type="submit" disabled={validationErrors.length > 0}>Reserve</button>


                     <div className = "charge">You won't be charged yet</div>

                    <div className = "booking-price-container">
                        <div className = "booking-container-label">${spot.price} x {(Math.abs(new Date(endDate) - new Date(startDate)))/86400000} nights</div>
                        <div>${spot.price * (Math.abs(new Date(endDate) - new Date(startDate)))/86400000} </div>
                    </div>

                    <div className = "booking-price-container">
                        <div className = "booking-container-label">Cleaning fee</div>
                        <div>$110</div>
                    </div>

                     <div className = "booking-price-container">
                        <div className = "booking-container-label">Service fee</div>
                         <div>$70 </div>
                    </div>


                    <div className = "booking-total-price-container">
                         <div className = "total-price-taxes">Total before taxes</div>
                         <div className = "total-price-taxes">${110 + 70 + spot.price * (Math.abs(new Date(endDate) - new Date(startDate)))/86400000} </div>
                     </div>

                </form>
            </div>
        </>
    )

}

export default CreateBookingForm;
