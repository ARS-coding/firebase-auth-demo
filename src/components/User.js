// react
import React from 'react'

// router
import { useParams } from "react-router-dom";

// firebase
import { auth } from "../firebase";

function User({ match }) {

    const userName = useParams().username;

    function handleClick() {
        auth.signOut()
            .then(() => console.log("You have successfully signed out!"))
            .catch((error) => console.error("A problem occured while signing out.", error))
    }

    return (
        <>
            <h1>Welcome {userName}!</h1>
            <button onClick={handleClick}>Sign Out!</button>
        </>
    )
}

export default User