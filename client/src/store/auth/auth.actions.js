import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "../../adapters/authAdapter";

export const signInUser = createAsyncThunk(
  "auth/signInRequest",
  async (userData, thunkAPI) => {
    const response = await signInUser(userData);
    if (response.error) {
      thunkAPI.rejectWithValue(response);
    } else {
      thunkAPI.rejectWithValue(response);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpRequest",
  async (userData, thunkAPI) => {
    const response = await signUpUser(userData);
    if (response.error) {
      thunkAPI.rejectWithValue(response);
    } else {
      thunkAPI.rejectWithValue(response);
    }
  }
);
