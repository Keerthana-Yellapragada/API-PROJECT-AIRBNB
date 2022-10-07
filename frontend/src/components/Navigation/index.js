
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
      <ProfileButton className='profile-dropdown-button' user={sessionUser} />
    );
  } else { // or else, show login and signup
    sessionLinks = (
      <>
        <div className='profile-dropdown-content'>
            <LoginFormModal />
            <SignupFormModal />
        </div>
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (

    <header>
      <div className='main-navbar-flex-container'>

        <div className="logo-flex-container">
          <i className="fa-brands fa-airbnb"></i>
          <NavLink className="logo-name" exact to="/">ayrbnb</NavLink>
          {/* {isLoaded && sessionLinks} */}
        </div>


        <div className="create-spot-container">
          <CreateSpotFormModal />
        </div>

        <div className='user-profile-container'>
          <div></div>
          <div className='profile-dropdown-content'>
              {isLoaded && sessionLinks}
          </div>
        </div>


      </div>
    </header>

  );
}

export default Navigation;
