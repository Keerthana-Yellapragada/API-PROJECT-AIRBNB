import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import createReview, { createNewReview } from "../../store/reviews"


const CreateReviewForm = () => {

  const dispatch = useDispatch(); // invoke dispatch
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  let {spotId} = useParams();
  spotId = parseInt(spotId)
  const userId = useSelector(state=>state.session.user.id)

  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [url, setUrl] = useState("")

  //update functions
  const updateStars = (e) => setStars(e.target.value);
  const updateReview = (e) => setReview(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value)

  useEffect(()=>{},[dispatch, spotId])

  //HANDLE SUBMIT BUTTON CLICK EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewPayload = {
      stars,
      review,
      spotId,
      userId
    }
    const reviewImagePayload = {
      url
    }

    let newReview = await dispatch(createNewReview(reviewImagePayload, reviewPayload)) //dispatch to update our store

    .then((newReview) => {
      if (newReview) {
        history.push(`/spots/${newReview.spotId}`)
      }
    // })
    //   history.push(`/spots/${newReview.spotId}`); //redirect to the new spot's details page
  }) // NEED TO ADD A USEEFFECT!!!!
}

  //HANDLE CANCEL BUTTON CLICK EVENT
  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/")
  };


  // RETURN THE FORM COMPONENT
  return (
    <section>

      <form>
        <h1> LEAVE A REVIEW</h1>
        <h3>Tell us more about your experience!</h3>

        <input
          id="review-info"
          type="string"
          placeholder="Your Review Here"
          required
          value={review}
          onChange={updateReview} />


        <label htmlFor="stars-rating">Rating(0-5 stars)</label>
        <input
           id="stars-rating"
          type="number"
          placeholder="Rating: 0-5 stars"
          required
          value={stars}
          onChange={updateStars} />

        <label htmlFor="url">Picture</label>
        <input
          id="url"
          type="string"
          placeholder='Insert image URL here'
          value={url}
          onChange={updateUrl} />

        <button type="submit" onClick={handleSubmit}>Post Your Review</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>

      </form>
    </section>
  )
}



export default CreateReviewForm;