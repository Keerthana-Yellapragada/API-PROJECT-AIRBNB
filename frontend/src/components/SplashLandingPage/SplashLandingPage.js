import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';

import './SplashLandingPage.css'



const SpotsBrowser = () => {
  const dispatch = useDispatch(); // invoke dispatch
  const { spotId } = useParams(); // use params

  const allSpots = useSelector(state => {
    const allSpotsArray = Object.values(state.spots)
    return allSpotsArray;
  });

  useEffect(() => {
    dispatch(loadAllSpots());
  },[])

  if (!allSpots) {
    return null;
  }



  //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:
  return (
    <>
      <div className="flex-container">
        {
          allSpots.map(spot => {


            return (
              <>
                <div className='spot-card-flex-container'>
                  <NavLink key={spot.id} to={`/spots/${spot.id}`}>

                    <div className='flex-spot-container'>

                        <div className='image-container'>
                          <img src={spot.previewImage} />
                        </div>


                        <div className="top-text-container">

                            <div className='top-address-container'>
                              {`${spot.city}, ${spot.state}`}
                            </div>

                            <div className='rating-container'>
                              <i className="splash-page-star fa-solid fa-star"></i>
                              {spot.avgRating}
                            </div>

                        </div>

                        <div className="bottom-text-container">
                           <div className='bottom-address-container'>
                              {`${spot.city}, ${spot.state}`}
                            </div>
                          <div className='price-container'>
                            {`$${spot.price} night`}
                          </div>
                        </div>

                      </div>

                  </NavLink>
                </div>

              </>
            )
          })
        }
      </div>
    </>
  )

}

export default SpotsBrowser;
