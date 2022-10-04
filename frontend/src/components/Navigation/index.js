
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import UserReviewsBrowser from '../UsersReviews';
import UserReviewsButton from './UserReviewButton';

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
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
      <li>
        <NavLink exact to="/current/reviews">My Reviews</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
