// firebase
import { auth, firestore } from "../../../firebase";

// router 
import { useHistory } from "react-router-dom";

export const checkIfUserSignedIn = () => { // it checks if the user is signed in or not for once, it doesn't listen it everytime
    return async (dispatch) => {
        await dispatch({ type: "user/checking" });
        dispatch({ type: "user/checked", paylaod: auth.currentUser }); 
    }
}

export const signInAndGetUserObjectFromFirestore = (formData, history) => { // sign in and assign the signed in user's object to user prop of state
    return async (dispatch) => {
        // let history = useHistory();

        dispatch({ type: "user/signingIn" });
        await auth.signInWithEmailAndPassword(formData.email, formData.password)
        .then(cred => {
            firestore.collection("users").where("email", "==", cred.user.email).get()
            .then(snapshot => snapshot.docs[0].data())
            .then(userObject => {dispatch({ type: "user/singedIn", payload: userObject }); return userObject})
            .then(userObject => history.push(`/user/${userObject.username}`))
        })
        .catch(error => console.error("A problem occurred while logging in.", error))
        
        // .then(() => history.push(`/user/${formData.username}`)) // go to the user page
    }
}

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
    user: null // user prop is gonna have a user object if a user is signed in
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "user/checking":
            return { ...state, status: "user/checking" }; // starting to check of a user is signed in at the time
        
        case "user/checked":
            if (action.payload) { // payload is gonna be the user's auth object or null
                return { ...state, status : "user/checked/signedIn" } // return this if a user is signed in
            } else {
                return { ...state, status: "user/checked/signedOut" } // return this if there's no user signed in
            }

        case "user/signingIn":
            return { ...state, status: "user/signingIn" };

        case "user/singedIn": // assign the found user object to the use property in state
            return { ...state, status: "user/signedIn", user: action.payload }; // payload is the user object in firestore users collection

        case "user/signingOut":
            return { ...state, status: "user/signingOut" };

        case "user/signedOut":
            return { ...state, status: "user/signedOut", user: null };

        default:
            return state;
    }
}

export default userReducer;