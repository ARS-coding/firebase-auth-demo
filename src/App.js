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

  auth.onAuthStateChanged(user => {
    user ? console.log("a user is currently signed in!") : console.log("there's no user signed in.")
  })

  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(checkIfUserSignedIn());
  }, [dispatch]);

  const userStatus = useSelector(state => state.user.status);
  console.log(userStatus) // for tracking if user is signing in, signed in or signing out, signed out

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
              {userStatus === "user/signingIn" ? <h1 className="text-center">Signing In...</h1> : null}
              {userStatus === "user/checked/signedIn" | userStatus === "user/signedIn" ? <ProfilePage /> : null}

              {userStatus === "user/signingOut" ? <h1 className="text-center">Signing Out...</h1> : null}
              {userStatus === "user/checked/signedOut" | userStatus === "user/signedOut" ? <PleaseSignIn /> : null}
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
