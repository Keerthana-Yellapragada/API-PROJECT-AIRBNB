import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from "../../store/spots";
import DeleteSpotFormModal from '../DeleteSpot/DeleteSpotFormModal';
import EditSpotFormModal from '../EditSpotForm/EditSpotModal';
import './CurrentOwnerSpots.css'

const OwnerSpotsBrowser = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector(state => Object.values(state.spots));
  const userId = useSelector(state => state.session.user.id)
  let filteredSpots = allSpots.filter(spot => spot.ownerId === userId)



  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch])

  if (!allSpots) {
    return null;
  }

  dispatch(loadAllSpots()); //rehydrate state


    return (
    <>
    <div className='title'>
      <h1> My Listings </h1>
    </div>

      <div className="flex-container">
        {
          filteredSpots.map(spot => {
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

              <div className="edit-delete-spot-navlinks">
               <NavLink to = {`/spots/${spot.id}`} >Update</NavLink>
                < NavLink to = {`/spots/${spot.id}`} >Remove</NavLink>
              </div>


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
