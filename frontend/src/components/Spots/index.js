import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSpotInfo from "../../store/spots";

const SpotInfo = () => {
    const {spotId} = useParams(); // get spotId from params

    //get the SPOT by spotId
    const spot= useSelector(state => state.spots[spotId]) // find the slice of state that has the same spotId info from the normalized spots that we have

    const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getSpotInfo(spotId)) // dispatch our action creator with the spotId

},[dispatch, spotId])

if (!spot){ // if we don't have a matching spot, then display nothing
    return null
}

return (
    <div className="spot-details">
        <div className={`spot-detail-image-background`}>
            <div
            className='spot-detail-image'
            // style={{backgroundImage: `url('${spot.previewImage}')`}}
            ></div>
            <h1 className="spot-name">{spot.name}</h1>
        </div>
    </div>

)


}


export default SpotInfo;
