import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./auth.actions.js";

export const authSlices = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: "",
    loading: false,
    errorMessage: null,
  },
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
      state.token = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.ednsWith("/pending"),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.ednsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.isAuth = true;
        }
      )
      .addMatcher(
        (action) => action.type.ednsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.isAuth = false;
          state.errorMessage = action.payload.error;
        }
      );
  },
});

export const { logOut } = authSlices.actions;
export { signInUser, signUpUser };
export default authSlices.reducer;
