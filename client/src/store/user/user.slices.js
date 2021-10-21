import { createSlice } from "@reduxjs/toolkit";
import { loadCurrent, addContact } from "./user.actions.js";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    errorMessage: null,
    username: "",
    userId: "",
    contact: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadCurrent.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.userId = action.payload._id;
        state.contact = action.payload.contact;
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

export { loadCurrent, addContact };

export default userSlice.reducer;
