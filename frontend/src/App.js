import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SplashLandingPage/SplashLandingPage";
import SpotInfo from "./components/Spots/SpotInfo";
import CreateSpotFormModal from "./components/CreateSpotFormModal/"
import EditSpotForm from "./components/EditSpotForm";
import DeleteSpotForm from "./components/DeleteSpot";
import CreateSpotButton from "./components/Navigation/CreateSpotButton";
import CurrentOwnerSpots from "./components/CurrentOwnerSpots";
import ReviewsBrowser from "./components/Reviews";
import CreateReviewForm from "./components/CreateReviewForm";
import UserReviewsBrowser from "./components/UsersReviews"
import DeleteReviewForm from "./components/DeleteReview";
import { useSelector } from "react-redux";
import ReviewInfo from "./components/Reviews/ReviewInfo";
import Footer from "./components/Footer";
import PageNotFound from "./components/404PageNotFound";
import UserBookings from "./components/UserBookings";
import EditBookingForm from "./components/EditBooking";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <div className="root">
        <Navigation isLoaded={isLoaded} />

        {isLoaded && (
          <Switch>

            <Route exact path="/current/reviews">
              <UserReviewsBrowser />
            </Route>

            <Route exact path="/reviews/:reviewId">
              <ReviewInfo />
            </Route>

            <Route exact path="/spots/:spotId">
              <SpotInfo />
            </Route>

            <Route exact path="/signup">
              <SignupFormPage />
            </Route>

            <Route exact path="/">
              <SpotsBrowser />
            </Route>

            <Route exact path="/current/spots">
              <CurrentOwnerSpots />
            </Route>

            <Route exact path="/current/bookings">
              <UserBookings />
            </Route>

            <Route path="/current/bookings/:bookingId/edit">
              <EditBookingForm />
            </Route>

          <Route> <PageNotFound /></Route>


          </Switch>

        )}

        <Footer />
      </div>
    </>
  );
}

export default App;
