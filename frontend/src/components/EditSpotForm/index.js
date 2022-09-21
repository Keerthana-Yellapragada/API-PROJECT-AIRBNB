import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import  updateSpot, {editSpot} from "../../store/spots";
import { loadAllSpots } from '../../store/spots';
import SpotInfo from '../Spots/SpotInfo';
import "./EditSpotForm.css"


const EditSpotForm = () => {
    const dispatch = useDispatch();
    let {spotId} = useParams();
    const history = useHistory();
    const [errorMessages, setErrorMessages] = useState({});

  //GET THIS SPOT
       const allSpotsArray = useSelector(state => Object.values(state.spots))
       //console.log("THIS IS ALL SPOTS ARRAY", allSpotsArray)

       const currentSpotDetails = allSpotsArray.find(spot => spot.id === +spotId)
       //console.log("THIS IS CURRENT SPOT DETAILS ID", currentSpotDetails.id)

       spotId = parseInt(spotId);

       // console.log("THIS IS NAME", currentSpotDetails.name)
//states
const [name, setName] = useState(currentSpotDetails.name);
const [address, setAddress] = useState(currentSpotDetails.address);
const [city, setCity] = useState(currentSpotDetails.city);
const [state, setState] = useState(currentSpotDetails.state);
const [country, setCountry] = useState(currentSpotDetails.country);
const [lat, setLat] = useState(currentSpotDetails.lat);
const [lng, setLng] = useState(currentSpotDetails.lng);
const [description, setDescription] = useState(currentSpotDetails.description);
const [price, setPrice] = useState(currentSpotDetails.price);


//update functions
const updateName = (e) => setName(e.target.value);
const updateAddress = (e) => setAddress(e.target.value);
const updateCity = (e) => setCity(e.target.value);
const updateState = (e) => setState(e.target.value);
const updateCountry = (e) => setCountry(e.target.value);
const updateLat = (e) => setLat(e.target.value);
const updateLng = (e) => setLng(e.target.value);
const updateDescription = (e) => setDescription(e.target.value);
const updatePrice = (e) => setPrice(e.target.value);

 useEffect(() => { // need this so spot info gets laoded each time
     dispatch(loadAllSpots());
 }, [dispatch, spotId]);

 const handleSubmit = async (e) => {
     e.preventDefault();

     const payload = {
        ...currentSpotDetails, // TO MAKE SURE WE INCLUDE ITS ID
         name,
         address,
         city,
         state,
         country,
         lat,
         lng,
         description,
         price
     };

     //console.log("THISSSSS IS EDITED PAYLOAD BEFORE DISPATCH ",payload)

     const editedSpot = await dispatch(editSpot(payload));

    // console.log("THIS IS THE USER INPUT", editedSpot)

     if (editedSpot) {
       history.push(`/`)
         history.push(`/spots/${spotId}`)
        //  hideForm();
     }
 };

 const handleCancelClick = (e) => {
    e.preventDefault();
    // hideForm();
      history.push(`/`) // DOESNT WORK-=-WHY!?!?!!?
 }

// RETURN THE FORM COMPONENT
    return (
      <section>

        <form className="edit-spot-form">
         <h1 className="edit-spot-title">EDIT SPOT INFORMATION</h1>
          <input
            type="string"
            placeholder="Name"
            required
            value={name}
            onChange={updateName} />

          <input
            type="string"
            placeholder = "Address"
            required
            value={address}
            onChange={updateAddress} />

          <input
            type="string"
            placeholder="City"
            required
            value={city}
            onChange={updateCity} />

          <input
            type="string"
            placeholder="State"
            required
            value={state}
            onChange={updateState} />

          <input
            type="string"
            placeholder="Country"
            required
            value={country}
            onChange={updateCountry} />

          <input
            type="number"
            placeholder="Latitude"
            required
            value={lat}
            onChange={updateLat} />

          <input
            type="number"
            placeholder="Longitude"
            required
            value={lng}
            onChange={updateLng} />


          <input
            type="number"
            placeholder="Price per night"
            required
            min="1"
            value={price}
            onChange={updatePrice} />

          <input
            type="string"
            placeholder="Description of your spot"
            required
            value={description}
            onChange={updateDescription} />

          <button className="update-spot-button" type="submit" onClick={handleSubmit}>Update Spot Information</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>

        </form>
      </section>
    )



}


export default EditSpotForm;
