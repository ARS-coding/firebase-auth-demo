// react
import React from 'react'

// react-bootstrap
import { Container } from "react-bootstrap";

// router
import { Link, useHistory } from "react-router-dom";

// firebase
import { auth } from "../firebase";

function SigningOutWarning() {

    const history = useHistory();

    function handleSignOut() {
        auth.signOut()
        .catch((error) => console.error("A problem occurred while logging out.", error))
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            <h1>Are you <span className="text-decoration-underline">sure</span> that you wanna sign out?</h1>
            <div className="d-flex justify-content-around w-100">
                <Link onClick={handleSignOut} to="/">Yes</Link>
                <Link to="/">No</Link> 
            </div>
        </Container> // whenever they select no, redirect them to the previous page with useHistory
    )
}

export default SigningOutWarning;