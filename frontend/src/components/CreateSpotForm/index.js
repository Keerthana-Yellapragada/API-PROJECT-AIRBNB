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
 // const [images, setImages] = useState([])

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
  //const updateImages = (e) => setImages(e.target.value)

  //HANDLE SUBMIT BUTTON CLICK EVENT
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default reloading of html form

    //console.log("I CLICKED SUBMIT")

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
      //,images
    }

    //console.log("THIS IS SPOT INFO PAYLOAD", spotInfoPayload)

    //CREATE THE NEW SPOT
    let newSpot = await dispatch(createNewSpot(spotInfoPayload)) //dispatch to update our store

    //console.log("THIS IS NEW SPOT", newSpot)

    if (newSpot) {
      setErrorMessages({});
      history.push(`/spots/${newSpot.id}`); //redirect to the new spot's details page
      // hideForm();
    }
  }


  //HANDLE CANCEL BUTTON CLICK EVENT
  const handleCancelClick = (e) => {
    e.preventDefault();
    //setErrorMessages({});
    // hideForm();
  };


  // RETURN THE FORM COMPONENT
  return (
    <section>

      <form>
        <h1> CREATE A NEW SPOT</h1>
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
{/*

        <input type="file"
          value={images}
          onChange={updateImages} /> */}


        <button type="submit" onClick={handleSubmit}>Create new Spot</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>

      </form>
    </section>
  )
}



export default CreateSpotForm;
