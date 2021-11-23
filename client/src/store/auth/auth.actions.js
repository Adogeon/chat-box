import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
  "auth/signInRequest",
  async (userData, thunkAPI) => {
    const fetchResponse = await fetch("/api/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username.value,
        password: userData.password.value,
      }),
    });
    const data = await fetchResponse.json();
    console.log(data);
    if (data.error) {
      return thunkAPI.rejectWithValue(data);
    } else {
      localStorage.setItem("authToken", data.token);
      return thunkAPI.fulfillWithValue(data);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpRequest",
  async (userData, thunkAPI) => {
    const fetchResponse = await fetch("/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username.value,
        email: userData.username.value,
        password: userData.password.value,
      }),
    });
    const data = await fetchResponse.json();
    console.log(data);
    if (data.error) {
      return thunkAPI.rejectWithValue(data);
    } else {
      localStorage.setItem("authToken", data.token);
      return thunkAPI.fulfillWithValue(data);
    }
  }
);

export const verifyStorageToken = createAsyncThunk(
  "auth/verifyStorageToken",
  async (_, thunkAPI) => {
    const storageToken = localStorage.getItem("authToken");
    if (storageToken === null) {
      return thunkAPI.rejectWithValue({ error: "No store token" });
    } else {
      //has token in storage, send verify
      const fetchResponse = await fetch("/api/verify", {
        headers: {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: storageToken,
          }),
        },
      });
      const data = await fetchResponse.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data);
      } else {
        localStorage.setItem("authToken", data.token);
        return thunkAPI.fulfillWithValue(data);
      }
    }
  }
);
