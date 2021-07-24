// firebase
import { auth } from "../../../firebase";

export const checkIfUserSignedIn = () => {
    return (dispatch) => {
        dispatch({ type: "user/checking" })
        // auth.onAuthStateChanged(user => {
        //     return user ? dispatch({ type: "user/checked/loggedIn" }) : dispatch({ type: "user/checked/loggedOut" }); 
        // })

    }
}

export const getCurrentUserFromFirestore = () => {
    return (dispatch) => {
        dispatch({ type: "user/loading" });
    }
}

const initialState = { 
    status: "", // checking or checked, loading or loaded
    user: null // user prop is gonna have a user object if a user is signed in
}

const userSlice = (state = initialState, action) => {
    switch(action.type) {
        case "user/checking":
            return { ...state, status: "checking" };
        
        case "user/checked": 
            if (action.payload) { // payload is gonna be the user's auth object or null
                return { ...state, status : "checked/loggedIn" } 
            } else {
                return { ...state, status: "checked/loggedOut" }
            }

        case "user/loading": // fetching the signed in user's data from firestore
            return { ...state, status: "loading" };

        case "user/loaded": 
            return { ...state, status: "loaded", user: action.payload } // payload is the user object that lives in the users collection of firestore
        
        default:
            return state;
    } // also do sing in and out here
}

export default userSlice;