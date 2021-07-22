// react
import React from 'react'

// router
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <h1>Landing Page!</h1>
            <p>
            If you don't have an account <Link to="/sign-up">Sign up!</Link>
            </p>
            <p>
            If you have an account <Link to="/sign-in">Sign in!</Link>
            </p>
        </div>
    )
}

export default LandingPage
