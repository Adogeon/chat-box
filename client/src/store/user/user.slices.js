import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { loadCurrent, addContact } from "./user.actions.js";

const roomsAdapter = createEntityAdapter({
  selectId: (room) => room._id,
  sortComparer: (a, b) =>
    a.latestMessage.date.localCompare(b.latestMessage.date),
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
    rooms: roomsAdapter.getInitialState(),
  },
  reducers: {
    updateRoom: (state, action) => {
      roomsAdapter.updateOne(state.rooms, action.payload);
    },
    updateContact: (state, action) => {
      contactsAdapter.updateOne(state.contacts, action.payload);
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
        roomsAdapter.setAll(state.rooms, action.payload.box);
        action.payload.contact.map((contact) => {
          contactsAdapter.addOne(state.contacts, {
            status: "offline",
            ...contact,
          });
        });
        state.loading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        contactsAdapter.addOne(state.contacts, action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.payload;
        }
      );
  },
});

export const { updateRoom, updateContact } = userSlice.actions;
export const roomSelector = roomsAdapter.getSelectors();
export const contactSelector = contactsAdapter.getSelectors();
export { loadCurrent, addContact };

export default userSlice.reducer;
