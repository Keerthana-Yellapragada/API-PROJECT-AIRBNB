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

  //update functions
  const updateStars = (e) => setStars(e.target.value);
  const updateReview = (e) => setReview(e.target.value);

  //HANDLE SUBMIT BUTTON CLICK EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      stars,
      review,
      spotId,
      userId
    }

    let newReview = await dispatch(createNewReview(payload)) //dispatch to update our store

    if (newReview) {
      history.push(`/spots/${newReview.spotId}/reviews`); //redirect to the new spot's details page

    }

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
        <h1> POST A REVIEW</h1>
        <h3>Tell us more about your experience!</h3>
        <input
          type="string"
          placeholder="Review"
          required
          value={review}
          onChange={updateReview} />

        <input
          type="number"
          placeholder="rating 0-5 stars"
          required
          value={stars}
          onChange={updateStars} />

        <button type="submit" onClick={handleSubmit}>Post Your Review</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>

      </form>
    </section>
  )
}



export default CreateReviewForm;
