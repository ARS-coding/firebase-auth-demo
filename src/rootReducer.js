// redux
import { combineReducers } from "redux";

import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
    users: usersReducer
});

export default rootReducer;