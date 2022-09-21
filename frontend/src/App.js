import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SplashLandingPage/SplashLandingPage";
import SpotInfo from "./components/Spots/SpotInfo";
import CreateSpotForm from "./components/CreateSpotForm/"
import EditSpotForm from "./components/EditSpotForm";
import DeleteSpotForm from "./components/DeleteSpot";
import CreateSpotButton from "./components/Navigation/CreateSpotButton";
import CurrentOwnerSpots from "./components/CurrentOwnerSpots";
import ReviewsBrowser from "./components/Reviews";
import CreateReviewForm from "./components/CreateReviewForm";
import UserReviewsBrowser from "./components/UsersReviews"
import DeleteReviewForm from "./components/DeleteReview";
import AddReviewButton from "./components/CreateReviewForm/AddReviewButton";

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
          {/* <Route path="/spots/:spotId/images">

          </Route> */}

          <Route exact path="/current/reviews">
            <UserReviewsBrowser />
          </Route>

          <Route exact path="/reviews/:reviewId">
            // add a page for review details
              <DeleteReviewForm />
          </Route>

          <Route exact path="/spots/:spotId/reviews">
            <ReviewsBrowser />
            <CreateReviewForm />
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotInfo />
            <EditSpotForm />
            <DeleteSpotForm />
            {/* <AddReviewButton /> */}

          </Route>

           <Route exact path="/spots">
            <CreateSpotForm />
          </Route>

          <Route exact path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/">
            <CreateSpotButton />
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
