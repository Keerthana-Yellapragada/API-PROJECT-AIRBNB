import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom';
import createReview, { createNewReview, loadAllReviews } from "../../store/reviews"


const CreateReviewForm = ({closeProp}) => {

  const dispatch = useDispatch(); // invoke dispatch
  const history = useHistory();
  let {spotId} = useParams();
  spotId = parseInt(spotId)

   useEffect(() => {
     dispatch(loadAllReviews(spotId))
   }, [dispatch, spotId])

  const sessionUser = useSelector(state=>state.session.user)
  let userId;
  if (sessionUser){
    userId = sessionUser.id
  }

  const reviews = useSelector(state=> state.reviews)
  const currSpot = useSelector(state=>state.spots.spotId)

  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  // const [url, setUrl] = useState("")
  const [validationErrors, setValidationErrors] = useState([]);


  //update functions
  const updateStars = (e) => setStars(e.target.value);
  const updateReview = (e) => setReview(e.target.value);
  // const updateUrl = (e) => setUrl(e.target.value)


  useEffect(()=> {
    const errors= [];
    if (stars < 0 || stars > 5){errors.push("Must provide a rating between 0 to 5 stars")}
    if (review && review==="") {
      errors.push("Please provide a review")
    }
    if (!userId) {
      errors.push("Must be logged in to leave a review")
    }

    setValidationErrors(errors)
  },[stars, review, sessionUser])



  const handleSubmit = async (e) => {

    e.preventDefault();

    const reviewPayload = {
      stars,
      review,
      spotId,
      userId
    }
    // const reviewImagePayload = {
    //   url
    // }

    let newReview = await dispatch(createNewReview(reviewPayload)) //dispatch to update our store
    dispatch(loadAllReviews(spotId))

    .then((newReview) => {
      if (newReview) {
      dispatch(loadAllReviews(spotId))
        history.push(`/spots/${spotId}`)
        closeProp();
      }

  })
}

  //HANDLE CANCEL BUTTON CLICK EVENT
  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}`)
  };


  // RETURN THE FORM COMPONENT
  return (
    <div className='create-review-container'>

      <form onSubmit={handleSubmit}>
        <h1> Leave A Review! </h1>
        <h3>Tell us more about your experience!</h3>

         <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <div key={error}>{error}</div>)}
        </div>


        <input
          id="review-info"
          type="string"
          placeholder="Your Review Here"
          required
          value={review}
          onChange={updateReview} />

{/*
        <label htmlFor="stars-rating">Rating(0-5 stars)</label> */}
        <input
           id="stars-rating"
          type="number"
          placeholder="Rating: 0-5 stars"
          required
          value={stars}
          onChange={updateStars} />

        {/* <label htmlFor="url">Picture</label> */}
        {/* <input
          id="url"
          type="string"

          placeholder='Insert image URL here'
          value={url}
          onChange={updateUrl} /> */}

        <button disabled={validationErrors.length ? true :false} type="submit" >Post Your Review</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>

      </form>
    </div>
  )
}



export default CreateReviewForm;
