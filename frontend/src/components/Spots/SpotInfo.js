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

const SpotInfo = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams(); // get spotId from params

    spotId = parseInt(spotId)
    //console.log("SPOT ID", spotId)

    const userId = useSelector(state => state.session.user.id)


    useEffect(() => {
        console.log("this is working")
        dispatch(loadAllSpots());
        dispatch(loadAllReviews(spotId))
    }, [dispatch, spotId])



    const allSpotsArray = useSelector(state => Object.values(state.spots))
    //console.log("THIS IS ALLSPOTSARRAY ", allSpotsArray)

    const currentSpot = allSpotsArray.find(spot => spot.id === +spotId)
    //console.log("THIS IS CURRENT SPOT", currentSpot)

    if (!currentSpot) { // if we don't have a matching spot, then display nothing
        return null
    }



    return (
        <>
            <div className="spot-header-container">

                <div className="spot-header-name-container">
                    <h1>{currentSpot.name}</h1>
                </div>

                <div className='spot-header-info-container'>
                    <div className="spot-stars">
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className="spot-rating">
                        {currentSpot.avgRating}
                    </div>

                    <div className="spot-address">
                        {`${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}
                    </div>
                </div>

            </div>

            <div className='spot-image-container'>
                <img src={currentSpot.previewImage} alt="preview-image" />
            </div>


            <div className='spot-details-container'>

                <div className="spot-description">
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

            {/* {
              ((userId && userId === currentSpot.ownerId) ? <EditSpotFormModal/> : null)

            }
            {
                ((userId && userId === currentSpot.ownerId) ? <DeleteSpotForm /> : null)
            } */}

            {/* {
                (userId && userId === currentSpot.userId ? < CreateReviewForm /> : null)
            } */}

             < ReviewsBrowser />
             < CreateReviewFormModal />

            {
                (userId && !userId === currentSpot.userId ? <CreateReviewForm /> : null)
            }
        </>
    )
}


export default SpotInfo;
