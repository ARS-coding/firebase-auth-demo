// react
import React from 'react'

// router
import { Link } from "react-router-dom";

// react-redux
import { useSelector } from "react-redux";

// bootstrap
import { Container } from "react-bootstrap";

function LandingPage() {

    const isSignedIn = useSelector(state => state.user.isSignedIn);

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            {isSignedIn && <h1>Landing Page!</h1>}
            {!isSignedIn && <h1>Please sign up or sign in.</h1>}
        </Container>
    )
}

export default LandingPage
