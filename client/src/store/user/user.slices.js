import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import {
  loadCurrent,
  loadContact,
  updateCurrentRoom,
  loadPending,
  approveFriendReq,
  deleteFriendReq,
} from "./user.actions.js";

const roomsAdapter = createEntityAdapter({
  selectId: (room) => room._id,
});

const contactsAdapter = createEntityAdapter({
  selectId: (contact) => contact._id,
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    errorMessage: null,
    username: "",
    userId: "",
    contacts: contactsAdapter.getInitialState(),
    pending: [],
    rooms: roomsAdapter.getInitialState(),
  },
  reducers: {
    updateContact: (state, action) => {
      contactsAdapter.updateOne(state.contacts, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrentRoom.fulfilled, (state, action) => {
        roomsAdapter.updateOne(state.rooms, action.payload);
      })
      .addCase(loadCurrent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadCurrent.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.userId = action.payload._id;
        roomsAdapter.setAll(state.rooms, action.payload.box);
        state.pending = action.payload.pending;
        action.payload.contact.map((contact) => {
          contactsAdapter.addOne(state.contacts, {
            status: "offline",
            ...contact,
          });
        });
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          loadPending.fulfilled,
          approveFriendReq.fulfilled,
          deleteFriendReq.fulfilled
        ),
        (state, action) => {
          console.log(action);
          state.pending = action.payload;
        }
      );
  },
});

export const { updateRoom, updateContact } = userSlice.actions;
export const roomSelector = roomsAdapter.getSelectors();
export const contactSelector = contactsAdapter.getSelectors();
export {
  loadCurrent,
  loadContact,
  updateCurrentRoom,
  loadPending,
  approveFriendReq,
  deleteFriendReq,
};

export default userSlice.reducer;
