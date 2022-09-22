import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import removeSpot, { deleteSpot } from "../../store/spots"
import { loadAllSpots } from '../../store/spots';

const DeleteSpotForm = () => {
    const dispatch = useDispatch(); // invoke dispatch
    const history = useHistory();
    let { spotId } = useParams();
    const [errorMessages, setErrorMessages] = useState({});

    spotId = parseInt(spotId) // convert string to integer


    useEffect(() => { // need this so spot info gets laoded each time
        dispatch(loadAllSpots());
    }, [dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // let deletedSpot =
        await dispatch(deleteSpot(spotId)).then(() => history.push("/")) // WHY ISNT THIS WORKING!??!


    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/`) // WHY ISNT THIS WORKING!??!
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
