// firebase
import { auth, firestore } from "../../../firebase";

export const signInAndGetUserObjectFromFirestore = (formData, history, setFormDataPointer, initialFormData) => { // sign in and assign the signed in user's object to user prop of state
    return async (dispatch) => {
        await dispatch({ type: "user/signingIn" });
        auth.signInWithEmailAndPassword(formData.email, formData.password)
        .then(cred => {
            firestore.collection("users").where("email", "==", cred.user.email).get()
            .then(snapshot => snapshot.docs[0].data())
            .then(userObject => {dispatch({ type: "user/singedIn", payload: userObject }); return userObject})
            .then(userObject => {setFormDataPointer(initialFormData); return userObject}) // empty the form fields only when user successfully signs in before unmounting the SignIn page and goin to the user's profile path
            .then(userObject => history.push(`/profile/${userObject.username}`)) // pass history that has useHistory() inside instad of tyring to use the useHistory hook inside this slice file because hooks only can be used in components
        })
        .catch(error => console.error("A problem occurred while logging in.", error))
    }
}

// we also need signing u

export const signOut = () => {
    return (dispatch) => {
        dispatch({ type: "user/signingOut" }) // change the status
        auth.signOut()
        .then(() => dispatch({ type: "user/signedOut" })) // change status, empty the user object
        .catch((error) => console.error("A problem occurred while logging out.", error))
    }
}

const initialState = { 
    status: "", // user/checking | user/checked/signedOut or user/checked/signedIn | user/signingOut or user/signedOut | user/signingOut or user/signedOut
    isSignedIn: false,
    userObject: null, // user prop is gonna have a user object if a user is signed in
    userCredentialsObject: null // whenever use signs in, we are gonna be setting the credential object to this prop
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "user/signingIn":
            return { ...state, status: "user/signingIn" };

        case "user/singedIn": // assign the found user object to the use property in state
            return { ...state, user: action.payload }; // payload is the user object in firestore users collection
            // return { ...state, status: "user/signedIn", user: action.payload }; // payload is the user object in firestore users collection

        // case "user/signingOut":
        //     return { ...state, status: "user/signingOut" };

        case "user/signedOut":
            return { ...state, status: "user/signedOut", user: null };

        // add the cases for user "user/signingUp" and "user/signedUp"

        case "signedIn":
            return { ...state, isSignedIn: true }
        case "notSignedIn":
            return { ...state, isSignedIn: false }


        default:
            return state;
    }
}

export default userReducer;