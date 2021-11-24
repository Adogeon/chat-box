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

export const loadContact = createAsyncThunk(
  "user/loadContact",
  async (_, thunkAPI) => {
    const contactFetch = await APIAdapter.fetchWithAuth(
      "/api/user/current/contact"
    );
    const contactData = await contactFetch.json();
    if (userFetch.error) {
      return thunkAPI.rejectWithValue(contactData);
    } else {
      socket.auth = { token: localStorage.getItem("authToken") };
      socket.connect();
      return thunkAPI.fulfillWithValue(contactData);
    }
  }
);

export const loadPending = createAsyncThunk(
  "user/loadPending",
  async (_, thunkAPI) => {
    const pendingFetch = await APIAdapter.fetchWithAuth(
      "/api/user/current/pending"
    );
    const pendingData = await pendingFetch.json();
    if (pendingFetch.error) {
      return thunkAPI.rejectWithValue(pendingData);
    } else {
      socket.auth = { token: localStorage.getItem("authToken") };
      socket.connect();
      return thunkAPI.fulfillWithValue(pendingData);
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
  "user/approvePendingReq",
  async (requestId, thunkAPI) => {
    const acceptReq = await APIAdapter.postWithAuth(
      "/api/user/request/accept",
      { pendingId: requestId }
    );
    if (!acceptReq.error) {
      return thunkAPI.fulfillWithValue(acceptReq.pending);
    } else {
      return thunkAPI.rejectWithValue({ error: "Something is wrong" });
    }
  }
);

export const deleteFriendReq = createAsyncThunk(
  "user/deletePendingReq",
  async (requestId, thunkAPI) => {
    const deleteReq = await APIAdapter.postWithAuth(
      "/api/user/request/delete",
      { pendingId: requestId }
    );
    if (!deleteReq.error) {
      return thunkAPI.fulfillWithValue(deleteReq.pending);
    } else {
      return thunkAPI.rejectWithValue({ error: "Something is wrong" });
    }
  }
);
