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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
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

        </Switch>
      )}
    </>
  );
}

export default App;
