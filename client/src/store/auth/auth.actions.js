import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAdapter from "../../adapters/authAdapter";

export const signInUser = createAsyncThunk(
  "auth/signInRequest",
  async (userData, thunkAPI) => {
    const response = await authAdapter.signInUser(userData);
    console.log(response);
    if (response.error) {
      return thunkAPI.rejectWithValue(response);
    } else {
      return thunkAPI.fulfillWithValue(response);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpRequest",
  async (userData, thunkAPI) => {
    const response = await authAdapter.signUpUser(userData);
    if (response.error) {
      return thunkAPI.rejectWithValue(response);
    } else {
      return thunkAPI.fulfillWithValue(response);
    }
  }
);
