import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from "../../store/spots";


const OwnerSpotsBrowser = () => {
  const dispatch = useDispatch(); // invoke dispatch

  //console.log("BEGINNING OF COMPONENT")

const allSpots = useSelector(state => Object.values(state.spots));
const userId = useSelector(state => state.session.user.id)
console.log("THIS IS USERID", userId)


  useEffect(() => {
    dispatch(loadAllSpots()); // dispatch our invoked loadAllSpots thunkmiddleware which will invoke getAllSpots thunk
  }, [dispatch])

  if (!allSpots) { //if we don't have spots- don't display anything
    return null;
  }

  let filteredSpots = allSpots.filter(spot => spot.ownerId === userId)
  console.log("THESE ARE FILTERED SPOTS", filteredSpots)

  //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:

  return (

    <>
      <div className="owner-spots-title"> <h1> MY LISTINGS </h1> </div>
      <div className="owner-spots-wrapper">
        {
          filteredSpots.map(spot => {
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




export default OwnerSpotsBrowser;
