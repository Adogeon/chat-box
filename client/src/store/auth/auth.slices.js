import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./auth.actions.js";

const isAPendingAction = isPending(signUpUser, signUpUser);
const isAFulFilledAction = isFulfilled(signInUser, signUpUser);
const isARejectedAction = isRejected(signInUser, signUpUser);

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
        (action) => isAPendingAction(action),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => isAFulFilledAction(action),
        (state, action) => {
          console.log(action);
          state.loading = false;
          state.token = action.payload.token;
          state.isAuth = true;
        }
      )
      .addMatcher(
        (action) => isARejectedAction(action),
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
