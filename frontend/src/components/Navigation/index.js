
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import CreateSpotFormModal from '../CreateSpotFormModal';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  // SESSION LINKS WILL BE RENDER WITH THE PROFILE BUTTON(WHICH RENDERS DIFF LINKS ACCORDING TO WHETHER OR NOT USER IS LOGGED IN)
  let sessionLinks = (<ProfileButton className='profile-dropdown-button' user={sessionUser} />);

  const url = useLocation().pathname;

  return (

    <div id='header' className={
      url === "/" ? 'full-nav' : "partial-nav"}>
      <div className='main-navbar-flex-container'>

        <div className="logo-flex-container">
          <div className='logo-name-text'>
            <NavLink className="logo-name" exact to="/">
              <i class="fa-solid fa-kiwi-bird logo-name"></i>
              <div className='logo-name-main'>keerbnb</div>
            </NavLink>
          </div>
          {/* {isLoaded && sessionLinks} */}
        </div>

        <div className='welcome-banner-container'>

          {sessionUser ? (` Welcome, ${sessionUser.firstName}!`) : ("Welcome To keerbnb!")}

        </div>
        <div className='navbar-right'>
          <div className="create-spot-container">
            {/* {sessionUser ? <CreateSpotFormModal /> : null} */}
            <CreateSpotFormModal />
          </div>

          <div className='user-profile-container'>

            <div className='profile-dropdown-content'>
              {isLoaded && sessionLinks}
            </div>
          </div>
        </div>

      </div>
    </div>


  );
}

export default Navigation;
