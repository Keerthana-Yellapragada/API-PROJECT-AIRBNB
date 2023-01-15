import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom'
import { loadUserBookings } from '../../store/bookings';


const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);

    // /gets all of current user's bookings
    const userBookings = useSelector(state => Object.values(state.bookings));

    // load the most updated user bookings
    useEffect(() => {
        dispatch(loadUserBookings());
    }, [dispatch, userId])



    return (
        <>
            <div className='user-bookings-page-main-container'>
                <div className='user-bookings-page-title'>Your Trips</div>
                {!userBookings.length ? (<h2 className='no-bookings-banner'>You don't have any trips yet!</h2>) :
                    (
                        <div className='user-trips-container'>
                            <div className='upcoming-trips-container'> Your Upcoming Trips</div>
                            <div className='completed-trips-container'>Your Completed Trips</div>
                        </div>

                    )}

            </div>

        </>
    )

}

export default UserBookings;
