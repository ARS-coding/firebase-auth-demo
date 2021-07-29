// firebase
import { auth, firestore } from "../../../firebase";

export const listenForAuthChanges = () => {
    return (dispatch) => {
        auth.onAuthStateChanged(user => {
            if(user) {
                firestore.collection("users").doc(user.uid).get()
                .then(doc => {
                    const userReduxState = {
                        isSignedIn: true,
                        firestoreDoc: doc.data(),
                        authCred: user,
                        uid: doc.data().uid
                    };
                    dispatch({ type: "signedIn", payload: userReduxState });
                })
            } 
            else {
                dispatch({ type: "notSignedIn" }); // set the state to it's initial values
            }
        })
    }
};

const initialState = { 
    isSignedIn: false,
    firestoreDoc: null, // user prop is gonna have a user object if a user is signed in
    authCred: null, // whenever use signs in, we are gonna be setting the credential object to this prop
    uid: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "signedIn":
            return { ...action.payload } // payload is the obj that has every data that we want from the user

        case "notSignedIn":
            return { ...initialState }

        default:
            return state;
    }
}

export default userReducer;