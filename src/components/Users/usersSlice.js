// firestore
import { firestore } from "../../firebase";

export const fetchUsers = () => { // dipatched whenever users component mounts for once, gets the current users in the firestore
    return (dispatch) => {
        dispatch({ type: "users/loading" });    
        firestore.collection("users").get()
        .then(snapshot => {
            const arrayOfUserObjects = snapshot.docs.map(doc => doc.data());
            dispatch({ type: "users/loaded", payload: arrayOfUserObjects });
        });
    }
}

export const fetchUpdatedUsers = () => { // listen for the changes of the collection named "users" in firestore
    return (dispatch) => {
        dispatch({ type: "users/updating" });    
        firestore.collection("users").onSnapshot(querySnapshot => {
            const arrayOfUserObjects = querySnapshot.docs.map(doc => doc.data());
            dispatch({ type: "users/updated", payload: arrayOfUserObjects }); // update the redux state with the fetched updated users
        })
    }
}

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
            return { ...state, status: "users/updated", usersArray: action.payload }; // payload is gonna be an array of updated user objects

        default:
            return state;
        }
}

export default usersReducer;