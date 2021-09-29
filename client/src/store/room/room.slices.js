import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getCurrentRoom } from "./room.actions";

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
});

export const { loadAllRoom, updateRoom, updateLog } = roomSlice.actions;
export { getCurrentRoom };

export const roomSelector = roomsAdapter.getSelectors();

export default roomSlice.reducer;
