// react
import React from 'react'

// bootstrap
import { Nav } from "react-bootstrap";

// router
import { Link } from "react-router-dom";

// firebase
import { auth } from "../../firebase"

function NavBar() {
    
    function handleSignOut() {
        auth.signOut()
        .then(() => console.log("You have signed out successfully!"))
        .catch((error) => console.error("A problem occurred while logging out.", error))
    }

    console.log("ey", auth.currentUser)

    // console.log("auth", auth)
    // console.log("auth user", auth. user)
    return (
        <Nav className="navbar">
            <Nav.Item>
                <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
                <button onClick={handleSignOut}>Sign Out</button>
            </Nav.Item>
        </Nav>
    )
}

export default NavBar;