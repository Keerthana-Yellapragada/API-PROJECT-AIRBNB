import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSpotInfo from "../../store/spots";


const SpotInfo = () => {
    const {spotId} = useParams(); // get spotId from params
    const dispatch = useDispatch();


    const allSpotsArray = useSelector(state => Object.values(state.spots))
     console.log("THIS IS ALLSPOTSARRAY ", allSpotsArray)

     const currentSpot = allSpotsArray.find(spot => spot.id === +spotId)
     console.log(currentSpot)




    // dispatch our action creator with the spotId


if (!currentSpot){ // if we don't have a matching spot, then display nothing
    return null
}

return (
    <div className="spot-details">
        <div className={`spot-detail-image-background`}>
            <div
            className='spot-detail-image'
            // style={{backgroundImage: `${currentSpot.previewImage}`}}
            >
           <img src={currentSpot.previewImage}/>
            </div>
            <h1 className="spot-name">{currentSpot.name}</h1>
        </div>
        <div>
           {` ${currentSpot.address}, ${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}
            {`Description: ${currentSpot.description}`} {`$${currentSpot.price}/night`} {`Rating: ${currentSpot.avgRating} stars`}
            {`Latitude: ${currentSpot.lat}`}    {`Longitude: ${currentSpot.lng}`}
        </div>
    </div>

)


}


export default SpotInfo;
