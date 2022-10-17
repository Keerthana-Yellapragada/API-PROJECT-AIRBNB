import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import SignupFormModal from "../SignupFormPage";
import LoginFormModal from "../LoginFormModal";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return ( // USER ICON SHOWS UP ONLY WHEN WE ARE LOGGED IN ALONG WITH LOGOUT BUTTON
      <>
        <button className="userProfileButton" onClick={openMenu}>

          <div className="userProfileIcons">
            <i className="fa-solid fa-bars fa-lg"></i>
            <i className="navbar-user-circle fas fa-user-circle fa-2x" > </i>
          </div>

        </button>
        {showMenu && (

          <ul className="profile-dropdown-list">
            <li>{`Logged in as: ${user.username}`}</li>
            <li>{user.email}</li>
            <li>
              <NavLink exact to="/current/reviews">My Reviews</NavLink>
            </li>
            <li>
              <NavLink exact to="/current/spots">My Listings </NavLink>
            </li>
            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </>
    );
  }
  else {
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
              <li>
                <SignupFormModal />
              </li >
              <li><LoginFormModal /></li>
            </ul>
          )}
        </>

        )
      }

  }



        export default ProfileButton;
