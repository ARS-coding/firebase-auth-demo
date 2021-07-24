// firestore
import { firestore } from "../../firebase";

export const fetchUsers = () => { // being dispatched whenever app component mounts
    return (dispatch) => {
        dispatch({ type: "users/loading" });    
        firestore.collection("users").get()
        .then(snapshot => {
            const arrayOfUserObjects = snapshot.docs.map(doc => doc.data());
            dispatch({ type: "users/loading", payload: arrayOfUserObjects });
        });
    }
}

export const fetchUpdatedUsers = () => {
    return (dispatch) => {
        dispatch({ type: "users/updating" });    
        firestore.collection("users").onSnapshot(querySnapshot => {
            const arrayOfUserObjects = querySnapshot.docs.map(doc => doc.data());
            dispatch({ type: "users/updated", payload: arrayOfUserObjects }); // update the redux state with the fetched updated users
        })
    }
}

// export const signIn = (email) => {
//     return {
//         type: "user/signIn",
//         payload: email
//     }
// }

// export const signOut = () => {
//     return {
//         type: "user/signOut"
//     }
// }

const initialState = {
    status: "", // users/loading or users/loaded, users/updating or users/updated
    usersArray: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case "users/loading": 
            return { ...state, status: "users/loading"};
 
        case "users/loaded":
            return { ...state, usersArray: action.payload }; // payload is gonna be an array of user objects

        case "users/updating":
            return { ...state, status: "users/updating" };
        
        case "users/updated":
            return { ...state, usersArray: action.payload }; // payload is gonna be an array of updated user objects

        default:
            return state;
        }
        // case "user/signIn":
        //     return { ...state, email: action.payload }; // payload is email of the user

        // case "user/signOut":
        //     return { ...initialState };
}

export default usersReducer;