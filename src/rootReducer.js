// redux
import { combineReducers } from "redux";

import usersReducer from "./components/Users/usersSlice";

const rootReducer = combineReducers({
    users: usersReducer
});

export default rootReducer;