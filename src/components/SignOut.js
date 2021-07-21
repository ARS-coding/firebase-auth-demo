import React from 'react'
import { auth } from "../firebase";

function SignOut({ setIsSignedIn }) {

    function handleClick() {
        auth.signOut()
            .then(() => setIsSignedIn(false))
            .then(() => console.log("You have successfully signed out!"))
            .catch((error) => console.error("A problem occured while signing out.", error))
    }

    return (
        <>
            <button onClick={handleClick}>Sign Out!</button>
        </>
    )
}

export default SignOut
