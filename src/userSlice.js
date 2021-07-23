export const signIn = (email) => {
    return {
        type: "user/signIn",
        payload: email
    }
}

export const signOut = () => {
    return {
        type: "user/signOut"
    }
}

const initialState = {
    email: ""
} // current user's info

function userReducer(state = initialState, action) {
    switch(action.type) {
        case "user/signIn":
            return { ...state, email: action.payload }; // payload is email of the user

        case "user/signOut":
            return { ...initialState };
        
        default:
            return state;
    }
}

export default userReducer;