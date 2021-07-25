// react
import React from 'react'

// react-bootstrap
import { Container } from "react-bootstrap";

// react-redux
import { useDispatch } from "react-redux";

// action creator functions
import { signOut } from "./Users/User/userSlice";


function SigningOutWarning() {

    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(signOut())
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80vh"}}>
            <h1>Are you <span className="text-decoration-underline">sure</span> that you wanna sign out?</h1>
            <div className="d-flex justify-content-around w-100">
                <button onClick={handleSignOut}>Yes</button>
                <button>No</button>
            </div>
        </Container>
    )
}

export default SigningOutWarning;