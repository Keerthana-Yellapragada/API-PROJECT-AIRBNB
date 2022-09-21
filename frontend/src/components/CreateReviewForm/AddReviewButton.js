import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function AddReviewButton() { // WHY ISNT THIS WORKING AND REDIRECTING PROPERLY!?!
    const dispatch = useDispatch();
    const history = useHistory();
    let {spotId} = useParams();
    spotId = parseInt(spotId)


    const handleSubmit = (e) => {
        history.push(`/spot/${spotId}/reviews`)
    }

    return (
        <>
            <div>
                <button onClick={handleSubmit}>Add A Review</button>
            </div>

        </>
    );
}

export default AddReviewButton;
