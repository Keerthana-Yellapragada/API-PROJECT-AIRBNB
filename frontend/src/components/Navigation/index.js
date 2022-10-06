
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
          {isLoaded && sessionLinks}
        </div>


      </div>
    </header>

  );
}

export default Navigation;
