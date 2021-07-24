// firebase
import { auth } from "../../../firebase";



export const checkIfUserSignedIn = () => {
    return async (dispatch) => {
        await dispatch({ type: "user/checking" });
        dispatch({ type: "user/checked", paylaod: auth.currentUser }); 
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

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "user/checking":
            return { ...state, status: "user/checking" };
        
        case "user/checked":
            if (action.payload) { // payload is gonna be the user's auth object or null
                return { ...state, status : "user/checked/loggedIn" } 
            } else {
                return { ...state, status: "user/checked/loggedOut" }
            }

        case "user/loading": // fetching the signed in user's data from firestore
            return { ...state, status: "user/loading" };

        case "user/loaded": 
            return { ...state, status: "user/loaded", user: action.payload } // payload is the user object that lives in the users collection of firestore
        
        default:
            return state;
    } // also do sing in and out here
}

export default userReducer;