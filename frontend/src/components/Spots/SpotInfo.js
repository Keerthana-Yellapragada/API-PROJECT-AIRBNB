import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSpotInfo from "../../store/spots";
import './SpotInfo.css'
const SpotInfo = () => {
    const { spotId } = useParams(); // get spotId from params
    const dispatch = useDispatch();

    const allSpotsArray = useSelector(state => Object.values(state.spots))
    //console.log("THIS IS ALLSPOTSARRAY ", allSpotsArray)
    const currentSpot = allSpotsArray.find(spot => spot.id === +spotId)
    //console.log(currentSpot)


    if (!currentSpot) { // if we don't have a matching spot, then display nothing
        return null
    }

    return (
        <div className="spot-details">
            <div className={`spot-detail-image-background`}>
                <div className='spot-detail-image'>
                    <img src={currentSpot.previewImage} />
                </div>
                <h1 className="spot-name">{currentSpot.name}</h1>
            </div>
            <div className='spot-details-wrapper'>
                <div className="spot-details">
                    {`${currentSpot.address}, ${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}
                </div>
                <div className= "spot-details">
                    {`Description: ${currentSpot.description}`}
                </div>
                <div className= "spot-details">
                    {`Latitude: ${currentSpot.lat}`}    {`Longitude: ${currentSpot.lng}`}
                </div>
                 <div className= "spot-details">
                    {`$${currentSpot.price}/night`}
                </div>
                <div className= "spot-details">
                    {`Rating: ${currentSpot.avgRating} stars`}
                </div>

            </div>
        </div>

    )


}


export default SpotInfo;
