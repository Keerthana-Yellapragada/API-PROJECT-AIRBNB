
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import createSpot, { createNewSpot } from "../../store/spots"


const CreateSpotForm = ({closeModal}) => {
  const dispatch = useDispatch(); // invoke dispatch
  const history = useHistory();

 const sessionUser = useSelector(state => state.session.user)



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
  const [validationErrors, setValidationErrors] = useState([]);

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


  useEffect(()=> {
    const errors=[];

    if (lat < 0 || lat > 90) {errors.push("Please enter a valid latitude")}
    if (lng < -180 || lng > 180) {errors.push("Please enter a valid longitude")}
    if (price < 0) {errors.push("You can host for free if you really wish to, but please specify $0 in the price field.")}
    if (url && !url.split(":").includes('https')){errors.push("Please enter a valid URL")}
    if (!sessionUser) {errors.push("Must be logged in to continue")}
    if (description.length > 254){errors.push("Description must be less than 254 characters")}
    setValidationErrors(errors)

  },[lat,lng,price,url,description])



  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const imagePayload = {
      url,
      preview
    }


    let newSpot = await dispatch(createNewSpot(imagePayload, spotInfoPayload))
    history.push(`/spots/${newSpot.id}`)
    closeModal();
  }


  const handleCancelClick = (e) => {
    e.preventDefault();
    closeModal();
  };




  // RETURN THE FORM COMPONENT
  return (
    <section>

      <form onSubmit = {handleSubmit}>
        <h1> Create A New Listing</h1>
        <div >
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <div className="errors" key={error}>{error}</div>)}
        </div>

{/*
        <label htmlFor="Name">Name</label> */}
        <input
          id="Name"
          type="string"
          placeholder="Name of Your Spot"
          required
          value={name}
          onChange={updateName} />
{/*
        <label htmlFor = "Address"> Address </label> */}
        <input
          id="address"
          type="string"
          placeholder="Address"
          required
          value={address}
          onChange={updateAddress} />
{/*
        <label htmlFor="city">City</label> */}
        <input
          id="city"
          type="string"
          placeholder="City"
          required
          value={city}
          onChange={updateCity} />
{/*
        <label htmlFor="state">State</label> */}
        <input
          id="state"
          type="string"
          placeholder="State"
          required
          value={state}
          onChange={updateState} />

        {/* <label htmlFor="country">Country</label> */}
        <input
          id="country"
          type="string"
          placeholder="Country"
          required
          value={country}
          onChange={updateCountry} />

{/*
        <label htmlFor="latitude">Latitude</label> */}
        <input
          id="latitude"
          type="number"
          placeholder="Latitude"
          required
          value={lat}
          onChange={updateLat} />

{/*
        <label htmlFor="longitude">Longitude</label> */}
        <input
          id="longitude"
          type="number"
          placeholder="Longitude"
          required
          value={lng}
          onChange={updateLng} />

{/*
        <label htmlFor="price">Price/night</label> */}
        <input
          id="price"
          type="number"
          placeholder="Price per night"
          required
          min="1"
          value={price}
          onChange={updatePrice} />
{/*
        <label htmlFor="description">Description</label> */}
        <input
          id="description"
          type="string"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />

{/*
        <label htmlFor="image">Add A Picture</label> */}
        <input
          id="image"
          required
          type="string"
          placeholder='Insert image URL here'
          value={url}
          onChange={updateUrl} />


        <label className="add-preview-image" htmlFor="preview">Select the box below to set the above image as the preview image for your listing</label>
        <input
          className='checkbox'
          id="preview"
          type="checkbox"
          value={preview}
          onChange={updatePreview} />


        <button type = "submit"
        disabled = {validationErrors.length > 0 ? true : false}  > Create New Spot </button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>

      </form>
    </section>
  )
}



export default CreateSpotForm;
