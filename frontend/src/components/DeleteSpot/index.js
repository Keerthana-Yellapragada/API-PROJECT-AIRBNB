import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import removeSpot, { deleteSpot } from "../../store/spots"

const DeleteSpotForm = () => {
        const dispatch = useDispatch(); // invoke dispatch
        const history = useHistory();
        let {spotId} = useParams();
        const [errorMessages, setErrorMessages] = useState({});

        spotId = parseInt(spotId) // convert string to integer

        const handleSubmit = async(e) => {
            e.preventDefault();

            let deletedSpot = await dispatch(deleteSpot(spotId))
            history.push(`/`)
        }

        //HANDLE CANCEL BUTTON CLICK EVENT
        const handleCancelClick = (e) => {
            e.preventDefault();
            // setErrorMessages({});
            // hideForm();
            history.push(`/`)
        };

    return (
        <>
            <form>
                <div>
                <button type="submit" onClick={handleSubmit}>Delete Spot</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </div>

            </form>

        </>
    )
}

export default DeleteSpotForm;
