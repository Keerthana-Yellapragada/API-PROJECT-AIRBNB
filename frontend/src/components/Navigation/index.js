
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import CreateSpotFormModal from '../CreateSpotFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) { // if user is logged in, then show profile button
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else { // or else, show login and signup
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />

        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <>
    <div className='navbar-container'>

       <div className="logo">
          <h1>
            <i className="fa-brands fa-airbnb"></i>
            ayrbnb
          </h1>
          </div>


      <div className="create-spot-container">
        <CreateSpotFormModal />
      </div>

        <div className="navbar">
          <ul>
              <li>
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
              </li>
              <li>
                <NavLink exact to="/current/reviews">My Reviews</NavLink>
              </li>

          </ul>
        </div>

      </div>

    </>
  );
}

export default Navigation;
