export const signIn = () => {
    return {
        type: "user/signIn"
    }
}

export const signOut = () => {
    return {
        type: "user/signOut"
    }
}

const initialState = {
    isSignedIn: false
}

function userRedducer(state = intialState, action) {
    switch(action.type) {
        case "user/signIn":
            return { ...state, isSignedIn: true };

        case "user/signOut":
            return { ...state, isSignedIn: false };
    }
}

export default userRedducer;