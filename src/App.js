//react
import React from "react";

// components
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar/NavBar";

// bootstrap
import { Container } from "react-bootstrap";

// router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// firebase
import { auth } from "./firebase";

function App() {
  return (
      <Container style={{minHeight: "100vh"}}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact strict path="/">
              <LandingPage />
            </Route>

            <Route exact strict path="/user/:username">
              <User />
            </Route>

            <Route exact strict path="/sign-in">
              <SignIn />
            </Route>

            <Route exact strict path="/sign-up">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </Container>
  );
}

export default App;
