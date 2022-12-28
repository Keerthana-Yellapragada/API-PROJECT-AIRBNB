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
    const { spotId } = useParams()
    let [startDate, setStartDate] = useState("2023-02-03");
    let [endDate, setEndDate] = useState("2023-02-09");
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


                </form>
            </div>
        </>
    )

}

export default CreateBookingForm;
