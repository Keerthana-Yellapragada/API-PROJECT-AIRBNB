import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import updateSpot, { editSpot } from "../../store/spots";
import { loadAllSpots } from '../../store/spots';
import SpotInfo from '../Spots/SpotInfo';
import "./EditSpotForm.css"


const EditSpotForm = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = parseInt(spotId);
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    dispatch(loadAllSpots());
  },[dispatch, spotId]);


  //GET THIS SPOT
  const allSpotsArray = useSelector(state => Object.values(state.spots))

  const currentSpotDetails = allSpotsArray.find(spot => spot.id === +spotId)


  console.log("CURRENT SPOT DETAILS", currentSpotDetails)

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


  if (!currentSpotDetails) {
    return null
  }


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

    const editedSpot = await dispatch(editSpot(payload))

    dispatch(loadAllSpots());

    // console.log("THIS IS THE USER INPUT", editedSpot)

    if (editedSpot) {
      //  history.push(`/`)
      history.push(`/spots/${spotId}`)
      //  hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // hideForm();
    history.push(`/spots/${spotId}`)
  }

  // RETURN THE FORM COMPONENT
  return (
    <div className='edit-spot-flex-container'>

      <form className="edit-spot-form-container">

        <div className='title-container'>
          <h1 className="title">Update This Listing</h1>
        </div>

        <input
          type="string"
          placeholder="Name"
          required
          value={name}
          onChange={updateName} />

        <input
          type="string"
          placeholder="Address"
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

        <div className='edit-spot-button-container'>
          <button className="update-button" type="submit" onClick={handleSubmit}>Update Listing</button>
          <button className='cancel-button' type="button" onClick={handleCancelClick}>Cancel</button>
        </div>

      </form>
    </div>
  )



}


export default EditSpotForm;
