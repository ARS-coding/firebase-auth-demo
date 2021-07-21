//react
import React, { useState } from "react";

// router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";

// bootstrap
import { Container } from "react-bootstrap";


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  
  return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "100vh"}}>
        <Router>
          <Switch>
            <Route exact path="/">
              <h1>Landing Page!</h1>
              <Link to="sign-up">Sign Up!</Link>
            </Route>
            <Route exact path="/sign-out">
              <SignOut setIsSignedIn={setIsSignedIn} />
            </Route>
            <Route exact path="/sign-up">
              <SignUp setIsSignedIn={setIsSignedIn} />
            </Route>
          </Switch>
        </Router>
        {/* {isSignedIn && <SignOut />} */}
        {/* {!isSignedIn && <SignUp setIsSignedIn={setIsSignedIn} />} */}
      </Container>
  );
}

export default App;
