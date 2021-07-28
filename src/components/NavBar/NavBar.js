// react
import React from 'react'

// react-redux
import { useSelector } from "react-redux";

// bootstrap
import { Nav } from "react-bootstrap";

// router
import { Link } from "react-router-dom";

function NavBar() {

    const uid = useSelector(state => state.user.uid); // use it to display the current user's profile
    const isSignedIn = useSelector(state => state.user.isSignedIn);
    
    return (
        <Nav className="navbar" style={{ height: "20vh" }}>
            <Nav.Item>
                <Link to="/">Home</Link>
                <Link 
                    to={ 
                        isSignedIn 
                        ? 
                        {pathname: `/profile/${uid}`} 
                        : 
                        {pathname: "/please-sign-in"}
                    }
                >Profile</Link>
            </Nav.Item>
            <Nav.Item>
                {isSignedIn && <Link to="/signing-out-warning">Sign Out</Link>}
                {!isSignedIn && <><Link to="/sign-in">Sign In</Link> or <Link to="/sign-up">Sign Up</Link></>}
            </Nav.Item>
        </Nav>
    )
}

export default NavBar;