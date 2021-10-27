import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { loadCurrent, addContact } from "./user.actions.js";

const roomsAdapter = createEntityAdapter({
  selectId: (room) => room._id,
  sortComparer: (a, b) =>
    a.latestMessage.date.localCompare(b.latestMessage.date),
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    errorMessage: null,
    username: "",
    userId: "",
    contact: [],
    rooms: roomsAdapter.getInitialState(),
  },
  reducers: {
    updateRoom: (state, action) => {
      roomsAdapter.updateOne(state.allRooms, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadCurrent.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.userId = action.payload._id;
        state.contact = action.payload.contact;
        roomsAdapter.setAll(state.rooms, action.payload.box);
        state.loading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contact.push(action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          console.log(action);
          state.loading = false;
          state.errorMessage = action.payload;
        }
      );
  },
});

export const { updateroom } = roomSlice.actions;
export const roomSelector = roomsAdapter.getSelectors();
export { loadCurrent, addContact };

export default userSlice.reducer;
