import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import SignupFormModal from "../SignupFormPage";
import LoginFormModal from "../LoginFormModal";
import DemoUserLoginButton from "../DemoUser";
import SignupFormPage from "../SignupFormPage/SignupForm";
import LoginForm from "../LoginFormModal/LoginForm";
import { Modal } from "../../context/Modal";
import SignupForm from "../SignupFormPage/SignupForm"


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();


  const sessionUser = useSelector(state => state.session.user);


  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  //************************************************************************* */
  // OPENS THE DROPDOWN MENU

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  //************************************************************************* */
// MANAGES THE OPENING/CLOSING OF THE MENU WHEN DOCUMENT IS CLICKED

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  //************************************************************************* */

  // SET ALL STATES TO FALSE WHEN USER LOGS OUT

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowLoginModal(false)
    setShowSignupModal(false)
    history.push("/")
  };


  //************************************************************************* */

  // IF THE USER IF LOGGED IN : RENDER LINKS TO USER'S PAGES AND INFO

  if (sessionUser) {

    return (

      <>
        <button className="userProfileButton" onClick={openMenu}>

          <div className="userProfileIcons">
            <i className="fa-solid fa-bars fa-lg"></i>
            <i className="navbar-user-circle fas fa-user-circle fa-2x" > </i>
          </div>

        </button>


        {showMenu && (

          <ul className="profile-dropdown-list">
            <li className='user-info'>{`Logged in as: ${user.username}`}</li>
            <li className="user-info">{user.email}</li>
            <li>
              <NavLink exact to="/current/reviews">Manage Reviews</NavLink>
            </li>
            <li>
              <NavLink exact to="/current/spots">Manage Listings </NavLink>
            </li>
             <li>
              <NavLink exact to="/current/bookings">Trips </NavLink>
            </li>
            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </>
    );
  }

    //************************************************************************* */

    // IF USER IS NOT LOGGED IN: RENDER SIGN UP AND LOGIN MODALS IN THE DROPDOWN MENU

  else {
    return (
      <>
      {/* // USER PROFILE BUTTON */}
        <button className="userProfileButton" onClick={openMenu}>

         <div className="userProfileIcons">
            <i className="fa-solid fa-bars fa-lg"></i>
            <i className="navbar-user-circle fas fa-user-circle fa-2x" > </i>
          </div>

        </button>

        {showMenu && (

      // WHEN CLICKED, SET STATE TO TRUE SO THAT MODALS ARE OPENED
          <ul className="profile-dropdown-list">
            <li className="session-dropdown" onClick={() => setShowSignupModal(true)}><SignupFormModal /></li>
            <li className="session-dropdown" onClick={() => setShowLoginModal(true)}><LoginFormModal /></li>
          </ul>
        )}


        {showLoginModal && (

          // WHEN MODAL IS CLOSED-- SET STATE TO FALSE AGAIN
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginForm />
            <DemoUserLoginButton />
          </Modal>

        )}

        {showSignupModal && (
          // WHEN MODAL IS CLOSED-- SET STATE TO FALSE AGAIN
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignupForm />
          </Modal>

        )}

      </>
  //************************************************************************* */
    )
  }

}



export default ProfileButton;
