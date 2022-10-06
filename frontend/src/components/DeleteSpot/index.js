import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory, useParams } from 'react-router-dom';
import removeSpot, { deleteSpot } from "../../store/spots"
import { loadAllSpots } from '../../store/spots';

const DeleteSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    const [errorMessages, setErrorMessages] = useState({});

    spotId = parseInt(spotId)


    useEffect(() => {
        dispatch(loadAllSpots());
    }, [dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
         history.push("/")


    }

    //HANDLE CANCEL BUTTON CLICK EVENT
    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    };




    return (
        <>
            <form>
               <div>
                    <button type="submit" onClick={handleSubmit}>Delete Listing</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>

            </form>

        </>
    )
}

export default DeleteSpotForm;
