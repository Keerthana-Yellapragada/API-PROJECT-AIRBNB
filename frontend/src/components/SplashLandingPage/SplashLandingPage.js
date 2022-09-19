import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';


const SpotsBrowser = () => {
    const dispatch = useDispatch(); // invoke dispatch
    const {spotId} = useParams(); // use params

    const allSpots = useSelector(state => {
        const allSpotsArray = Object.values(state.spots)
        return allSpotsArray;
    });

    useEffect(()=> {
        dispatch(loadAllSpots()); // dispatch our invoked loadAllSpots thunkmiddleware which will invoke getAllSpots thunk
    }, [dispatch])

    if(!allSpots) { //if we don't have spots- don't display anything
        return null;
    }


    //RETURN THE JSX/HTML COMPONENT WE WANT TO RENDER:
    return (
    <main>
      <nav>
        {allSpots.map((spot) => {
          return (
            <NavLink key={spot.name} to={`/spots/${spot.id}`}>
              <div
                className={
                  Number.parseInt(spotId) === spot.id // compare with the spotId that we deconstructed from params above
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div
                  className="nav-entry-image"
                  style={{ backgroundImage: `url('${spot.url}')` }}
                ></div>
                <div>
                  <div className="primary-text">{spot.name}</div>
                  <div className="secondary-text">
                     {spot.name}
                     {spot.address}
                     {spot.city}
                     {spot.state}
                     {spot.country}
                     {spot.description}
                     {spot.price}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </main>
    )

}

export default SpotsBrowser;
