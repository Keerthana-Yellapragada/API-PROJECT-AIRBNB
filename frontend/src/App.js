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
          <Route path="/spots/:spotId">
            <SpotInfo />
            <EditSpotForm />
            <DeleteSpotForm />
          </Route>
          <Route  path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/">
            <SpotsBrowser />
          </Route>
          <Route exact path="/spots">
          <CreateSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
