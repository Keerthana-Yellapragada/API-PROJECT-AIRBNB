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
import CreateBookingForm from '../Bookings'
import MapContainer from '../Maps';

const SpotInfo = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)

    useEffect(() => {
        dispatch(loadOneSpot(spotId))
        dispatch(loadAllReviews(spotId))
    }, [dispatch, spotId])


    const allSpots = useSelector(state => Object.values(state.spots))
    const currentSpot = allSpots.find(spot => spot.id === spotId)



    const sessionUser = useSelector(state => state.session.user)
    let userId;


    const allReviewsArray = useSelector(state => Object.values(state.reviews))


    if (!allReviewsArray) {
        return null;
    }


    let spotReviews = allReviewsArray.filter(review => review.spotId === spotId)



    if (sessionUser) {
        userId = sessionUser.id
    }


    if (!currentSpot) {
        return (<h1 className='spot-not-found'>Sorry, no listing was found.</h1>)
    }
    if (!currentSpot.SpotImages) {
        return null;
    }



    return (
        <>
            <div className='spot-info-page-container'>
                <div className="spot-header-container">
                    <div className="spot-header-name-container">
                        <h1>{currentSpot.name}</h1>
                    </div>

                    <div className="spot-sub-header-info-container">
                        <i className="fa-solid fa-star" > </i>
                        <div >{`${!currentSpot.avgStarRating ? "NEW" : currentSpot.avgStarRating} `}</div>
                        <div className='dots'> · </div>
                        <div className='spot-sub-header-details'> {`${!spotReviews.length ? 0 : spotReviews.length} `} reviews  </div>
                        < div className='dots'> · </div>
                        <div className='spot-sub-header-details'> {`${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country} `} </div>


                    </div>

                    {
    /* ********************************************************************************** */}

                </div>

                <div className='spot-image-container'>

                    <img className="spot-image" src={currentSpot.SpotImages[0].url} alt="preview-image" />

                </div>

                <div className='hosted-by-main-container'>

                    <div className="hosted-by-container">
                        {`Entire place hosted by ${currentSpot.Owner.firstName}`}
                        <div className="owner-pic"><i className="fa-solid fa-circle-user"></i></div>
                    </div>

                    <div className="spot-bed-bath-container">
                        {" 4 guests · 2 bedrooms · 2 bed · 2 bath"}
                    </div>
                </div>

                {
    /* ********************************************************************************** */}
                <div className='spot-page-details-flex-container'>
                    <div className='spot-details-container'>

                        {/* <div className="hosted-by-container">
                        {`Entire place hosted by ${currentSpot.Owner.firstName}`}
                        <div className="owner-pic"><i className="fa-solid fa-circle-user"></i></div>
                    </div>

                    <div className="spot-bed-bath-container">
                        {" 4 guests · 2 bedrooms · 2 bed · 2 bath"}
                    </div> */}




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
                            <div className='check-in-door-image'><i className="fa-solid fa-door-open"></i></div>
                            < div className='check-in-door-info' >
                                < div className='check-in-door-title' >
                                    {"Self check-in"}
                                </div>
                                < div className='check-in-door-info-description' >
                                    {"Check yourself in with the smartlock"}
                                </div>
                            </div>
                        </div>

                        <div className="free-cancellation-container" >
                            < div className='free-cancellation-image' ><i className="fa-regular fa-calendar-xmark"></i></div >
                            < div className='free-cancellation-info' >
                                < div className='free-cancellation-title' >
                                    {"Free Cancellation for 48 hours"}
                                </div>
                                < div className='free-cancellation-info-description' >
                                    {"50% refund on cancellations after 48 hours"}
                                </div>
                            </div>
                        </div>


                        {/* ********************************************************************************** */}

                        <div className="spot-description-container">
                            {currentSpot.description}
                        </div>

                        {/* ********************************************************************************** */}


                        {/* ********************************************************************************** */}

                        {/* <CreateBookingForm spot={currentSpot} sessionUser={sessionUser} /> */}
                    </div>
                    <div className='booking-container-spot-page'><CreateBookingForm spot={currentSpot} sessionUser={sessionUser} /></div>
                </div>


                {
    /* ********************************************************************************** */}
                {<ReviewsBrowser />}


                {userId && userId === currentSpot.ownerId ? null : (
                    <div className='create-review-container'>
                        <CreateReviewFormModal />
                    </div>
                )}


                <div className='edit-delete-spot-buttons-container'>

                    {
                        userId && userId === currentSpot.ownerId ? < EditSpotFormModal /> : null
                    }
                    {
                        userId && userId === currentSpot.ownerId ? < DeleteSpotFormModal /> : null
                    }

                </div>
                <div className='maps-container-spot-page'>
                    <div className='maps-title'>Where You'll Be: </div>
                    <div className='where-youll-be-address'>{currentSpot.city}, {currentSpot.state}, {currentSpot.country}</div>
                    <MapContainer currentSpot={currentSpot} className="map-container" />
                </div>


                <div className='spot-know-main-container'>

                    <div className='spot-know-title'>Things To Know</div>
                    <div className='spot-know-category-container'>

                    <div className='spot-know-individual'>
                        <div className='spot-know-category-title'>House Rules</div>
                        <div className="spot-know-details">
                            <div>Check-in after 3:00 PM</div>
                            <div>Checkout before 12:00 PM</div>
                        </div>
                    </div>

                     <div className='spot-know-individual'>
                        <div className='spot-know-category-title'> Safety & Property</div>
                        <div className="spot-know-details">
                            <div>House rules</div>
                            <div>Carbon monoxide alarm</div>
                            <div>Smoke alarm</div>
                        </div>
                    </div>

                      <div className='spot-know-individual'>
                        <div className='spot-know-category-title'> Cancellation policy</div>
                        <div className="spot-know-items">
                            <div>Free cancellation for 48 hours.</div>
                        </div>
                        </div>
                    </div>

                </div>




            </div>



        </>
    )
}


export default SpotInfo;
