//react
import React, { useEffect } from "react";

// react-redux
import { useSelector, useDispatch } from "react-redux";

// action creator functions
import { listenForAuthChanges } from "./components/Users/User/userSlice";

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

function App() {
  
  const isSignedIn = useSelector(state => state.user.isSignedIn);
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(listenForAuthChanges())
  }, [dispatch])
  
  console.log(isSignedIn);

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

            <Route exact strict path="/profile/:uid">
              {isSignedIn && <ProfilePage />} 
              {!isSignedIn && <PleaseSignIn />}
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
