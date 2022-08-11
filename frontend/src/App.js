import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import BusinessesPage from "./components/BusinessesPage";
import BusinessPageForm from './components/BusinessFormPage';
import BusinessPageEditForm from "./components/BusinessEditPage/index";
import ReviewsPage from "./components/ReviewsPage";
import ReviewForm from "./components/ReviewFormPage";
import ReviewEditFormPage from './components/ReviewEditFormPage';
import SplashPage from './components/SplashPage';
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import OneBusiness from './components/OneBusiness'

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route exact path='/reviews/:reviewId'>
            <ReviewEditFormPage />
          </Route>
          <Route exact path='/businesses/:businessId'>
            {/* <ReviewForm /> */}
           <OneBusiness />
            <ReviewsPage />
          </Route>
          <Route exact path='/businesses/:businessId/edit'>
            <BusinessPageEditForm />
          </Route>
          <Route exact path='/businesses/:businessId/reviews'>
            <ReviewForm />
          </Route>
          <Route exact path='/form'>
            <BusinessPageForm />
          </Route>
          <Route exact path="/businesses">
            <BusinessesPage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
          <Route exact path={['/', '/signup', '/login']}>
      <Footer />
          </Route>
    </>
  );
}

export default App;
