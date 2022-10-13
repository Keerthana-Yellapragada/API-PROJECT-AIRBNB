import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSpotInfo from "../../store/spots";
import { loadAllSpots } from '../../store/spots';
import './SpotInfo.css'
import { loadAllReviews } from '../../store/reviews';
import EditSpotForm from "../EditSpotForm"
import DeleteSpotForm from "../DeleteSpot"
import ReviewsBrowser from "../Reviews"
import CreateReviewForm from "../CreateReviewForm"
import CreateReviewFormModal from '../CreateReviewForm/CreateReviewModal';
import EditSpotFormModal from '../EditSpotForm/EditSpotModal';
import DeleteSpotFormModal from '../DeleteSpot/DeleteSpotFormModal';

const SpotInfo = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)
            console.log("SPOT ID IS ", spotId)

  useEffect(() => {
      console.log("spotid useeffectis working")
      dispatch(loadAllSpots());
      dispatch(loadAllReviews(spotId))
  }, [dispatch, spotId])

    const allSpotsArray = useSelector(state => Object.values(state.spots))
    console.log("THIS IS ALLSPOTSARRAY ", allSpotsArray)

    const currentSpot = allSpotsArray.find(spot => spot.id == spotId)
    console.log("THIS IS CURRENT SPOT", currentSpot)

    const allReviewsArray = useSelector(state=> Object.values(state.reviews))
        console.log("THIS IS ALLREVIEWSARRAY ", allReviewsArray)

    const sessionUser = useSelector(state => state.session.user)
    let userId;
    if (sessionUser) {
        userId = sessionUser.id
    }
        console.log("userid", userId)

    if (!currentSpot) {
        return null
    }



return (
    <>
        <div className='spot-info-page-container'>
            <div className="spot-header-container">

                <div className="spot-header-name-container">
                    <h1>{currentSpot.name}</h1>
                </div>

                <div>
                    < i className = "fa-solid fa-star" > </i>
                    {
                        `${currentSpot.avgRating} · ${allReviewsArray.length} reviews · ${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`
                    }

                </div>

                {/* <div className='spot-header-info-container'>
                    <div className="spot-stars">
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className="spot-rating">
                       {` ${currentSpot.avgRating}`}
                    </div>

                    <div className="spot-address">
                        {
                            `${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`
                        }
                    </div>
                </div> */}


            </div>

            <div className='spot-image-container'>
                <img src={currentSpot.previewImage} alt="preview-image" />
            </div>


            <div className='spot-details-container'>
                <div className="hosted-by-container">
                    {`Entire place hosted by ${currentSpot.ownerId}`}

                </div>
                <div className="spot-bed-bath-container">
                      {" 4 guests · 2 bedrooms · 2 bed · 2 bath"}
                </div>
                <div className="spot-description-container">
                    {currentSpot.description}
                </div>

                <div className='price-rating-side-container'>
                    <div className="spot-description-price">
                        {`$${currentSpot.price} night`}
                    </div>

                    <div className="spot-description-rating">
                        <i class="fa-solid fa-star"></i>
                        {currentSpot.avgRating}
                    </div>
                </div>

            </div>


            <ReviewsBrowser />
            <CreateReviewFormModal />

            <div className='edit-delete-spot-buttons-container'>
{/*
                {
                    userId && userId !== currentSpot.ownerId ? <CreateReviewFormModal /> : null
                } */}
                {
                    userId && userId === currentSpot.ownerId ? < EditSpotFormModal /> : null
                }
                {
                    userId && userId === currentSpot.ownerId ? < DeleteSpotFormModal /> : null
                }

            </div>
        </div>
    </>
)
}


export default SpotInfo;
