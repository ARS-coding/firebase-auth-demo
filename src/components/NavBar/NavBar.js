// react
import React from 'react'

// react-redux
import { useSelector } from "react-redux";

// bootstrap
import { Nav } from "react-bootstrap";

// router
import { Link } from "react-router-dom";

function NavBar() {

    const userStatus = useSelector(state => state.user.status); // use it to dispay sign in or sign out button
    
    return (
        <Nav className="navbar">
            <Nav.Item>
                <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
                {
                    userStatus === "user/checked/signedIn" | userStatus === "user/signedIn" 
                    ?
                    <Link to="/signing-out-warning">Sign Out</Link>
                    :
                    null
                }
                {
                    userStatus === "user/checked/signedOut" | userStatus === "user/signedOut"
                    ?
                    <>
                    <Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link>
                    </>
                    :
                    null
                }
            </Nav.Item>
        </Nav>
    )
}

export default NavBar;