import { combineReducers } from "redux";

import userReducer from "./user";
import roomReducer from "./room";

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

export default rootReducer;
