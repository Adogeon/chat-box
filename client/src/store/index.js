import { configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/room.slices.js";

export default configureStore({
  reducer: {
    room: roomReducer,
  },
});
