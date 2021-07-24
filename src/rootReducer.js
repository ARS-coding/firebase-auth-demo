// redux
import { combineReducers } from "redux";

// reducers
import usersReducer from "./components/Users/usersSlice";
import userReducer from "./components/Users/User/userSlice";

const rootReducer = combineReducers({
    users: usersReducer,
    user :userReducer
});

export default rootReducer;