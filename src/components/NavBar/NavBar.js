// react
import React from 'react'

// react-redux
import { useSelector, useDispatch } from "react-redux";

// bootstrap
import { Nav } from "react-bootstrap";

// router
import { Link } from "react-router-dom";

// firebase
import { auth } from "../../firebase"

// action creator functions
import { signOut } from "../Users/User/userSlice";

function NavBar() {

    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.user.status); // use it to dispay sign in or sign out button
    
    function handleSignOut() {
        dispatch(signOut())
    }

    return (
        <Nav className="navbar">
            <Nav.Item>
                <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
                {
                    userStatus === "user/checked/signedIn" | userStatus === "user/signedIn" 
                    ?
                    <span onClick={handleSignOut}><Link to="/signing-out-warning">Sign Out</Link></span>
                    :
                    null
                }
                {
                    userStatus === "user/checked/signedOut" | userStatus === "user/signedOut"
                    ?
                    <span onClick={handleSignOut}><Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link></span>
                    :
                    null
                }
                
            </Nav.Item>
        </Nav>
    )
}

export default NavBar;