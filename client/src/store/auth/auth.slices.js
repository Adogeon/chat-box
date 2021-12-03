import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { signInUser, signUpUser, verifyStorageToken } from "./auth.actions.js";

const isAPendingAction = isPending(signUpUser, signUpUser, verifyStorageToken);
const isAFulFilledAction = isFulfilled(
  signInUser,
  signUpUser,
  verifyStorageToken
);
const isARejectedAction = isRejected(
  signInUser,
  signUpUser,
  verifyStorageToken
);

export const authSlices = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    step: "init",
    token: "",
    loading: false,
    errorMessage: null,
  },
  reducers: {
    setToken: (state) => {
      state.token = "";
    },
    logOut: (state) => {
      state.isAuth = false;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => isAPendingAction(action),
        (state, action) => {
          state.loading = true;
          state.step = "loading";
        }
      )
      .addMatcher(
        (action) => isAFulFilledAction(action),
        (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.step = "loading";
          state.isAuth = true;
        }
      )
      .addMatcher(
        (action) => isARejectedAction(action),
        (state, action) => {
          state.loading = false;
          state.isAuth = false;
          state.step = "loading";
          state.errorMessage = action.payload.error;
        }
      );
  },
});

export const { logOut } = authSlices.actions;
export { signInUser, signUpUser, verifyStorageToken };
export default authSlices.reducer;
