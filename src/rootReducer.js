// redux
import { combineReducers } from "redux";

import userRedducer from "./userSlice";

const rootReducer = combineReducers({
    user: userRedducer
});

export default rootReducer;