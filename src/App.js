//react
import React, { useEffect } from "react";

// react-redux
import { useSelector, useDispatch } from "react-redux";

// action creator functions
import { checkIfUserSignedIn } from "./components/Users/User/userSlice";

// components
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProfilePage from "./components/ProfilePage";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import PleaseSignIn from "./components/PleaseSignIn/PleaseSignIn";
import Users from "./components/Users/Users";
import SigningOutWarning from "./components/SigningOutWarning";

// bootstrap
import { Container } from "react-bootstrap";

// router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// firebase
import { auth } from "./firebase";

function App() {
  
  const userStatus = useSelector(state => state.user.status);
  console.log("user status: ", userStatus) // for tracking if user is signing in, signed in or signing out, signed out
  
  const isSignedIn = useSelector(state => state.user.isSignedIn);
  console.log("isSignedIn: ", isSignedIn);

  const dispatch = useDispatch(); 
  useEffect(() => {
    // isSignedIn ? 
    auth.onAuthStateChanged(user => {
      user ? console.log("a user is currently signed in!") : console.log("there's no user signed in.")
      user ? dispatch({ type: "signedIn" }) : dispatch({ type: "notSignedIn" });
      // dispatch(checkIfUserSignedIn(user));
    })
  }, [dispatch])
  

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

            <Route exact strict path="/users">
              <Users /> {/* add conditional rendering like the user/:username path */}
            </Route>

            <Route exact strict path="/profile/:username">
              {isSignedIn && <ProfilePage />} 
              {isSignedIn && <PleaseSignIn />}
            </Route>

            <Route exact strict path="/signing-out-warning">
              <SigningOutWarning />
            </Route>

            <Route exact strict path="/please-sign-in">
              <PleaseSignIn />
            </Route>
          </Switch>
        </Router>
      </Container>
  );
}

export default App;
