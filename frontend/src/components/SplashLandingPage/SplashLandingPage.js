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
    dispatch(loadAllSpots()); // dispatch our invoked loadAllSpots thunkmiddleware which will invoke getAllSpots thunk
  }, [dispatch])

  if (!allSpots) { //if we don't have spots- don't display anything
    return null;
  }


  //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

  return (
    <>
      <div className="homepage-title"> <h1> WELCOME TO AYRBNB </h1> </div>
      <div className="homepage-grid-container">
        {
          allSpots.map(spot => {
            return (
              <>
                <div className='homepage-spot-card'>
                  <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                    <div >
                      <div>
                        <div className='previewImage'>
                          <img src={spot.previewImage} />
                        </div>
                        <div className="primary-text">{spot.name}</div>
                        <div className="secondary-text">

                          <div className='rating'>
                            {spot.avgRating}
                          </div>

                          <div className='price'>
                            {`$${spot.price}`}
                          </div>

                          <div className='address'>
                            {`${spot.city}, ${spot.state}`}
                          </div>
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
