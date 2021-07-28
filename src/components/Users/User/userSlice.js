// firebase
import { auth, firestore } from "../../../firebase";

export const listenForAuthChanges = () => {
    return (dispatch) => {
        auth.onAuthStateChanged(user => {
            if (user) {
              dispatch({ type: "signedIn" });
            } else {
              dispatch({ type: "notSignedIn" });
            }
        })
    }
};

export const signIn = (formData, history) => { // sign in and assign the signed in user's object to user prop of state
    return async (dispatch) => {
        await dispatch({ type: "user/signingIn" });
        auth.signInWithEmailAndPassword(formData.email, formData.password)
        .then(cred => {
            console.log(cred)
            // history.push(`/profile/${userObject.username}`) // pass history that has useHistory() inside instad of tyring to use the useHistory hook inside this slice file because hooks only can be used in components
        })
        .catch(error => console.error("A problem occurred while logging in.", error))
    }
};

export const getTheSignedInUserData = (uid) => {
    return (dispatch) => {
        firestore.collection("users").where("email", "==", uid).get()
        .then(snapshot => snapshot.docs[0].data())
        .then(userObject => dispatch({ type: "getTheSignedInUserData", payload: userObject }))
        // .then(userObject => history.push(`/profile/${UID}`)) // pass history that has useHistory() inside instad of tyring to use the useHistory hook inside this slice file because hooks only can be used in components
    }
}


export const signOut = () => {
    return (dispatch) => {
        auth.signOut()
        .then(() => dispatch({ type: "user/signedOut" })) // change status, empty the user object
        .catch((error) => console.error("A problem occurred while logging out.", error))
    }
}

const initialState = { 
    isSignedIn: false,
    firestoreDoc: null, // user prop is gonna have a user object if a user is signed in
    authCred: null, // whenever use signs in, we are gonna be setting the credential object to this prop
    uid: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "signedIn":
            return { ...state, isSignedIn: true }

        case "notSignedIn":
            return { ...state, isSignedIn: false }

        default:
            return state;
    }
}

export default userReducer;