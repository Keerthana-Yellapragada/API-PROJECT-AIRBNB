import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSpotInfo from "../../store/spots";
import { loadAllSpots, loadOneSpot } from '../../store/spots';
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

    //console.log("SPOT ID in spotinfo IS ", spotId)

    useEffect(() => {
        console.log("spotid useeffectis working")
       //dispatch(loadAllSpots());
        dispatch(loadOneSpot(spotId))
        dispatch(loadAllReviews(spotId))
    }, [dispatch, spotId])

//     const allSpotsArray = useSelector(state => Object.values(state.spots))
//    // console.log("THIS IS ALLSPOTSARRAY ", allSpotsArray)

//     const currentSpot = allSpotsArray.find(spot => spot.id == spotId)
//     //console.log("THIS IS CURRENT SPOT", currentSpot)

const currentSpot = useSelector(state=>state.spots)
//console.log("THIS IS CURRENT SPOT IN SPOTINFO", currentSpot)

//console.log("SPOTIMAGEs array", currentSpot.SpotImages)

    const allReviewsArray = useSelector(state => Object.values(state.reviews))
    //console.log("THIS IS ALLREVIEWSARRAY ", allReviewsArray)

    const sessionUser = useSelector(state => state.session.user)
    let userId;
    if (sessionUser) {
        userId = sessionUser.id
    }
    //console.log("userid", userId)

    if (!currentSpot) {
        return null
    }
    if(!currentSpot.SpotImages){
        return null;
    }

    dispatch(loadOneSpot(spotId))
    dispatch(loadAllReviews(spotId))


    return (
        <>
            <div className='spot-info-page-container'>
                <div className="spot-header-container">
                    <div className="spot-header-name-container">
                        <h1>{currentSpot.name}</h1>
                    </div>

                    <div>
                        < i className="fa-solid fa-star" > </i>
                        {
                            `${currentSpot.avgStarRating} · ${allReviewsArray.length} reviews · ${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`
                        }

                    </div>

                    {
    /* ********************************************************************************** */}

                </div>

                <div className='spot-image-container'>

                    <img className="spot-image" src={currentSpot.SpotImages[0].url} alt="preview-image" />

                </div>

                {
    /* ********************************************************************************** */}

                <div className='spot-details-container'>

                    <div className="hosted-by-container">
                        {`Entire place hosted by ${currentSpot.Owner.firstName}`}
                        <div className="owner-pic"><i className="fa-solid fa-circle-user"></i></div>
                    </div>

                    <div className="spot-bed-bath-container">
                        {" 4 guests · 2 bedrooms · 2 bed · 2 bath"}
                    </div>

                    {
    /* ********************************************************************************** */}

                    <div className="aircover-title-image">
                        < img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" />
                    </div>

                    <div className='aircover-info'>
                        {
                            "Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in."
                        }
                    </div>


{/* ********************************************************************************** */}

                    <div className="location-container">
                        <div className='location-pin-image'><i className="fa-solid fa-location-dot"></i></div>
                        <div className='location-info'>
                            <div className='location-info-title'>
                                {"Great Location"}
                            </div>
                            <div className='location-info-description'>
                                {"95% of recent guests gave the location a 5-star rating"}
                            </div>
                        </div>
                    </div>


                    <div className="check-in-door-container" >
                        <div className='check-in-door-image'><i class="fa-solid fa-door-open"></i></div>
                        < div className='check-in-door-info' >
                            < div className='check-in-door-title' >
                                {"Self check-in"}
                            </div>
                            < div className='check-in-door-info-description' >
                                {"Check yourself in with the smartlock"}
                            </div>
                        </div>
                    </div>

                 {/* ********************************************************************************** */}

                    <div className="spot-description-container">
                        {currentSpot.description}
                    </div>

                {/* ********************************************************************************** */}


                {/* ********************************************************************************** */}
                    <div className='price-rating-side-container'>
                        <div className="spot-description-price">
                            {`$${currentSpot.price} night`}
                        </div>

                        <div className="spot-description-rating">
                            <i class="fa-solid fa-star"></i>
                            {currentSpot.avgStarRating}
                        </div>
                    </div>

                </div>

                {
    /* ********************************************************************************** */}
                <ReviewsBrowser />
                <CreateReviewFormModal />

                <div className='edit-delete-spot-buttons-container'>

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
