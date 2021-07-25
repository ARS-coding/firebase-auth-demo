//react
import React, { useEffect } from "react";

// react-redux
import { useSelector, useDispatch } from "react-redux";

// action creator functions
import { checkIfUserSignedIn } from "./components/Users/User/userSlice";

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

  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(checkIfUserSignedIn());
  }, [dispatch]);

  const userStatus = useSelector(state => state.user.status);
  console.log(userStatus)
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

            <Route exact strict path="/user/:username">
              {userStatus === "user/signingIn" && <h1 className="text-center">Signing In...</h1>}
              {userStatus === "user/checked/signedIn" | userStatus === "user/signedIn" && <User />}

              {userStatus === "user/signingOut" && <h1 className="text-center">Signing Out...</h1>}
              {userStatus === "user/checked/signedOut" | userStatus === "user/signedOut" && <PleaseSignIn />}
            </Route>
          </Switch>
        </Router>
      </Container>
  );
}

export default App;
