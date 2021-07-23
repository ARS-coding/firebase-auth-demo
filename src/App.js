//react
import React, { useState, useEffect } from "react";

// components
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import PleaseSignIn from "./components/PleaseSignIn/PleaseSignIn";

// bootstrap
import { Container } from "react-bootstrap";

// router
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// firebase
import { auth, firestore } from "./firebase";

// action creator functions
import { fetchUsers, fetchUpdatedUsers } from "./usersSlice";

// react-redux
import { useDispatch, useSelector } from "react-redux";


function App() {

  const dispatch = useDispatch();
  const usersArray = useSelector(state => state.users.usersArray); //  use this in the page that you are gonna show the registered users

  useEffect(() => {
    dispatch(fetchUpdatedUsers()); // add the listener to the server for future changes just for once.
    dispatch(fetchUsers());
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false);

  auth.onAuthStateChanged( user => user ? setIsSignedIn(true) : setIsSignedIn(false) );

  return (
      <Container style={{minHeight: "100vh"}}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact strict path="/">
              <LandingPage />
            </Route>

            <Route exact strict path="/sign-in">
              <SignIn />
            </Route>

            <Route exact strict path="/sign-up">
              <SignUp />
            </Route>
         
            <Route exact strict path="/user/:username">
              {isSignedIn ? <User /> : <PleaseSignIn />} 
            </Route>
          </Switch>
        </Router>
      </Container>
  );
}

export default App;
