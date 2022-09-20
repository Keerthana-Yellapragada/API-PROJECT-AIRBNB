import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import createSpot, { createNewSpot } from "../../store/spots"


const CreateSpotForm = () => {
  const dispatch = useDispatch(); // invoke dispatch
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


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



  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default reloading of html form


    const spotInfoPayload = {
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      description,
      price
    }



    //CREATE THE NEW SPOT
    let newSpot = await dispatch(createNewSpot(spotInfoPayload))

    // if (!newSpot) throw new Error("There was an issue with your submission")


    if (newSpot) {
      setErrorMessages({});
      history.push(`/spots/${newSpot.id}`);
      // hideForm();
    }

    const handleCancelClick = (e) => {
      e.preventDefault();

      setErrorMessages({});

      // hideForm();
    };

    return (

      <section>

        <form>
        // CREATE JSX HTML FORM TO CREATE SPOT
          <input
            type="string"
            placeholder="Name of Your Spot"
            required
            value={name}
            onChange={updateName} />

          <input
            type="string"
            placeholder="address"
            required
            value={address}
            onChange={updateAddress} />

          <input
            type="string"
            placeholder="city"
            required
            value={city}
            onChange={updateCity} />

          <input
            type="string"
            placeholder="state"
            required
            value={state}
            onChange={updateState} />

          <input
            type="string"
            placeholder="country"
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
            placeholder="100"
            required
            min="1"
            value={price}
            onChange={updatePrice} />

          <input
            type="string"
            placeholder="Description"
            required
            value={description}
            onChange={updateDescription} />

          <button type="submit">Create new Spot</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>

        </form>
      </section>
    )
  }
}


export default CreateSpotForm;
