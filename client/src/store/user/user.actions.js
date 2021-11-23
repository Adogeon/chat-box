import { createAsyncThunk } from "@reduxjs/toolkit";

import * as APIAdapter from "@services/APIAdapter";
import socket from "@services/socket";

export const loadCurrent = createAsyncThunk(
  "user/loadUser",
  async (_, thunkAPI) => {
    const userFetch = await APIAdapter.fetchWithAuth("/api/user/current");
    const userData = await userFetch.json();
    if (userFetch.error) {
      return thunkAPI.rejectWithValue(userData);
    } else {
      socket.auth = { token: localStorage.getItem("authToken") };
      socket.connect();
      return thunkAPI.fulfillWithValue(userData);
    }
  }
);

export const updateCurrentRoom = createAsyncThunk(
  "user/updateCurrentRoom",
  async (update, thunkAPI) => {
    const roomId = thunkAPI.getState().room.currentRoom._id;
    const updatePayload = {
      id: roomId,
      changes: { [update.key]: update.value },
    };
    console.log(updatePayload);
    return thunkAPI.fulfillWithValue(updatePayload);
  }
);

export const approveFriendReq = createAsyncThunk(
  "user/approveFriendReq",
  async (requestId, thunkAPI) => {
    console.log(requestId);
  }
);

export const deleteFriendReq = createAsyncThunk(
  "user/deleteFriendReq",
  async (requestId, thunkAPI) => {
    console.log(requestId);
  }
);
