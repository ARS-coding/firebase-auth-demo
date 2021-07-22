// react
import React from 'react'

// router
import { Link } from "react-router-dom";

// bootstrap
import { Container } from "react-bootstrap";

function LandingPage() {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            <h1>Landing Page!</h1>
            <p>
            If you don't have an account <Link to="/sign-up">Sign up!</Link>
            </p>
            <p>
            If you have an account <Link to="/sign-in">Sign in!</Link>
            </p>
        </Container>
    )
}

export default LandingPage
