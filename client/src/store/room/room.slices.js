import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const roomsAdapter = createEntityAdapter({
  selectId: (room) => room._id,
  sortComparer: (a, b) =>
    a.latestMessage.date.localeCompare(b.latestMessage.date),
});

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    allRooms: roomsAdapter.getInitialState(),
    currentRoom: {},
    roomLog: [],
    roomMember: [],
  },
  reducers: {
    loadAllRoom: (state, action) => {
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

export const { loadAll, updateRoom, updateLog } = roomSlice.actions;

export const roomSelector = roomsAdapter.getSelectors(
  (state) => state.allrooms
);

export default roomSlice.reducer;
