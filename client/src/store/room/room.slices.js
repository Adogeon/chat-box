import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getRoom, addNewRoom } from "./room.actions";
import { logOut } from "../auth/auth.slices";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    populated: false,
    fetchingCurrent: false,
    currentRoom: {},
    roomLog: [],
    roomMember: [],
  },
  reducers: {
    updateLog: (state, action) => {
      state.roomLog = [...state.roomLog, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoom.fulfilled, (state, action) => {
        state.fetchingCurrent = false;
        state.roomLog = action.payload.log ?? [];
        state.roomMember = action.payload.member;
        state.currentRoom = action.payload.boxDetail;
      })
      .addCase(logOut, (state, action) => {
        state.roomLog = [];
        state.roomMember = [];
        state.roomLog = [];
        state.populated = false;
      })
      .addCase(addNewRoom.fulfilled, (state, action) => {
        state.fetchingCurrent = false;
        state.roomLog = [];
        state.roomMember = action.payload.member;
        state.currentRoom = action.payload.boxDetail;
      })
      .addMatcher(
        isAnyOf(getRoom.pending, addNewRoom.pending),
        (state, action) => {
          state.fetchingCurrent = true;
        }
      );
  },
});

export const { updateLog } = roomSlice.actions;
export { getRoom };
export default roomSlice.reducer;
