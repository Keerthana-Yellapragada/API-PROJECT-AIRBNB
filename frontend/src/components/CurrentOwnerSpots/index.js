import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots,  } from "../../store/spots";
import DeleteSpotFormModal from '../DeleteSpot/DeleteSpotFormModal';
import EditSpotFormModal from '../EditSpotForm/EditSpotModal';
import './CurrentOwnerSpots.css'

const OwnerSpotsBrowser = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch])


  const sessionUser = useSelector(state => state.session.user)
  let userId = sessionUser.id

  const allSpots = useSelector(state => Object.values(state.spots));
  let filteredSpots = allSpots.filter(spot => spot.ownerId === userId)

  if (!allSpots) {
    return null;
  }

  // if (!filteredSpots){
  //   return (
  //     <h2> You haven't created any listings yet!</h2>
  //   )
  // }
    return (
    <>
    <div className='title'>
      <h1 className='owner-spots-title'> {`${sessionUser.firstName}'s Listings`} </h1>
    </div>

      <div className="flex-container">
        {!filteredSpots.length ? (<h2 className='no-listings-yet-banner'>You haven't created any lisitings yet!</h2>):
          (filteredSpots.map(spot => {
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
                              <i className="fa-solid fa-star"></i>
                              {!spot.avgRating ? "NEW" : spot.avgRating}
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

              <div className="button-container">
               <button className='edit-spot-button'><NavLink to = {`/spots/${spot.id}`}>Update</NavLink></button>
                <button className='delete-spot-button'>< NavLink to = {`/spots/${spot.id}`} >Remove</NavLink></button>
              </div>

                </div>
              </>
            )
          })
        )}
      </div>

    </>
  )

  }


export default OwnerSpotsBrowser;
