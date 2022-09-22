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
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState(false)

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
  const updateUrl = (e) => setUrl(e.target.value)
  const updatePreview = (e) => setPreview(!preview)
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

    const imagePayload = {
      url,
      preview
    }
    //CREATE THE NEW SPOT
    let newSpot = await dispatch(createNewSpot(imagePayload, spotInfoPayload)).then(() => history.push("/")) //dispatch to update our store


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

        <label htmlFor="Name">Name</label>
        <input
          id="Name"
          type="string"
          placeholder="Name of Your Spot"
          required
          value={name}
          onChange={updateName} />

        <label htmlFor = "Address"> Address </label>
        <input
          id="address"
          type="string"
          placeholder="address"
          required
          value={address}
          onChange={updateAddress} />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="string"
          placeholder="city"
          required
          value={city}
          onChange={updateCity} />

        <label htmlFor="state">State</label>
        <input
          id="state"
          type="string"
          placeholder="state"
          required
          value={state}
          onChange={updateState} />

        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="string"
          placeholder="country"
          required
          value={country}
          onChange={updateCountry} />


        <label htmlFor="latitude">Latitude</label>
        <input
          id="latitude"
          type="number"
          placeholder="Latitude"
          required
          value={lat}
          onChange={updateLat} />


        <label htmlFor="longitude">Longitude</label>
        <input
          id="longitude"
          type="number"
          placeholder="Longitude"
          required
          value={lng}
          onChange={updateLng} />


        <label htmlFor="price">Price/night</label>
        <input
          id="price"
          type="number"
          placeholder="Price per night"
          required
          min="1"
          value={price}
          onChange={updatePrice} />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="string"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />


        <label htmlFor="image">Picture</label>
        <input
          id="image"
          type="string"
          placeholder='Insert image URL here'
          value={url}
          onChange={updateUrl} />


        <label htmlFor="preview">Select the box below to set the above image as the preview image for your listing</label>
        <input
          id="preview"
          type="checkbox"
          value={preview}
          onChange={updatePreview} />


        <button type="submit" onClick={handleSubmit}>Create New Spot</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>

      </form>
    </section>
  )
}



export default CreateSpotForm;
