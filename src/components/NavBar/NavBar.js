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
    const userObject = useSelector(state => state.user.userObject); // use it to display the current user's profile
    
    return (
        <Nav className="navbar" style={{ height: "20vh" }}>
            <Nav.Item>
                <Link to="/">Home</Link>
                {
                    userStatus === "user/checked/signedIn" | userStatus === "user/signedIn" 
                    ? // if the user is signed in the userObject is not gonna be null
                    <Link 
                        to={ 
                            userObject !== null 
                            ?
                            {pathname: `/profile/${userObject.username}`}
                            :
                            {pathname: "/please-sign-in"} 
                        }
                    >
                        Profile
                    </Link>
                    :
                    null
                }
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