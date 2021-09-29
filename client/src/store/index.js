import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/user.slices";
import roomReducer from "./room/room.slices";
import authReducer from "./auth/auth.slices";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    auth: authReducer,
  },
});
