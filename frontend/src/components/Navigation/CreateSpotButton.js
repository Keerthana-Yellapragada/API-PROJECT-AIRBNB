import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './Navigation.css'
function CreateSpotButton() {
  const dispatch = useDispatch();
const history = useHistory();


  const handleSubmit = (e) => {
    history.push("/spots")
  }

  return ( // USER ICON SHOWS UP ONLY WHEN WE ARE LOGGED IN ALONG WITH LOGOUT BUTTON
    <>
    <div className="create-spot-button-container">
            <button className='create-spot-button' onClick={handleSubmit}>Become a Host</button>
    </div>

    </>
  );
}

export default CreateSpotButton;
