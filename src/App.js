//react
import React from "react";

// components
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User";

// router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// bootstrap
import { Container } from "react-bootstrap";

// firebase
import { auth } from "./firebase";

function App() {

  function handleSignOut() {
    auth.signOut()
    .then(() => console.log("You have signed out successfully!"))
    .catch((error) => console.error("A problem occurred while logging out.", error))
  }

  return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "100vh"}}>
        <Router>
          <Link to="/">Home</Link>
          <button onClick={handleSignOut}>Sign Out</button>
          <Switch>
            <Route exact strict path="/">
              <h1>Landing Page!</h1>
              <p>
                If you don't have an account <Link to="/sign-up">Sign up!</Link>
              </p>
              <p>
                If you have an account <Link to="/sign-in">Sign in!</Link>
              </p>
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
