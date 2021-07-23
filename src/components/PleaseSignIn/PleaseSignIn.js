// react
import React from 'react';

// react-bootstrap
import { Container } from "react-bootstrap";

// router
import { Link } from "react-router-dom";

// styling
import "./PleaseSignIn.css"

function PleaseSignIn() {
    return (
        <Container className="call-to-action">
            <h3>Please <Link to={{pathname: "/sign-in"}}>Sign In</Link> To See This Page</h3>
            <p>If you don't have an account <Link to={{pathname: "/sign-up"}}>sign up</Link>!</p>
        </Container>
    )
}

export default PleaseSignIn
