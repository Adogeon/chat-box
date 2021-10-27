import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getCurrentRoom } from "./room.actions";
import { logOut } from "../auth/auth.slices";

const roomsAdapter = createEntityAdapter({
  selectId: (room) => room._id,
  sortComparer: (a, b) =>
    a.latestMessage.date.localeCompare(b.latestMessage.date),
});

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    populated: false,
    allRooms: roomsAdapter.getInitialState(),
    fetchingCurrent: false,
    currentRoom: {},
    roomLog: [],
    roomMember: [],
  },
  reducers: {
    loadAllRoom: (state, action) => {
      state.populated = true;
      roomsAdapter.setAll(state.allRooms, action.payload);
    },
    updateRoom: (state, action) => {
      roomsAdapter.updateOne(state.allRooms, action.payload);
    },
    updateLog: (state, action) => {
      state.roomLog = [...state.roomLog, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentRoom.pending, (state, action) => {
        state.fetchingCurrent = true;
      })
      .addCase(getCurrentRoom.fulfilled, (state, action) => {
        state.fetchingCurrent = false;
        state.roomLog = action.payload.log;
        state.roomMember = action.payload.member;
        state.currentRoom = action.payload.boxDetail;
      })
      .addCase(logOut, (state, action) => {
        state.roomLog = [];
        state.roomMember = [];
        state.roomLog = [];
        state.allRooms = roomsAdapter.getInitialState();
        state.populated = false;
      });
  },
});

export const { loadAllRoom, updateRoom, updateLog } = roomSlice.actions;
export { getCurrentRoom };

export const roomSelector = roomsAdapter.getSelectors();

export default roomSlice.reducer;
