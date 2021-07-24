//react
import React, { useState } from "react";

// components
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import PleaseSignIn from "./components/PleaseSignIn/PleaseSignIn";
import Users from "./components/Users/Users";

// bootstrap
import { Container } from "react-bootstrap";

// router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// firebase
import { auth } from "./firebase";

function App() {

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

            <Route exact strict path="/users">
              <Users />
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
