// react
import React from 'react'

// react-redux
import { useSelector } from "react-redux";

// bootstrap
import { Nav } from "react-bootstrap";

// router
import { Link } from "react-router-dom";

function NavBar() {

    const userObject = useSelector(state => state.user.userObject); // use it to display the current user's profile
    const isSignedIn = useSelector(state => state.user.isSignedIn);
    
    return (
        <Nav className="navbar" style={{ height: "20vh" }}>
            <Nav.Item>
                <Link to="/">Home</Link>
                {isSignedIn && <Link 
                        to={ 
                            userObject !== null 
                            ?
                            {pathname: `/profile/${userObject.username}`}
                            :
                            {pathname: "/please-sign-in"} 
                        }>Profile</Link>}
            </Nav.Item>
            <Nav.Item>
                {isSignedIn && <Link to="/signing-out-warning">Sign Out</Link>}
                {!isSignedIn && <><Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link></>}
            </Nav.Item>
        </Nav>
    )
}

export default NavBar;