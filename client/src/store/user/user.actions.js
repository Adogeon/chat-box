import { createAsyncThunk } from "@reduxjs/toolkit";

import * as APIAdapter from "@services/APIAdapter";

export const loadCurrent = createAsyncThunk(
  "user/loadUser",
  async (_, thunkAPI) => {
    const userFetch = await APIAdapter.fetchWithAuth("/api/user/current");
    const userData = await userFetch.json();
    if (userFetch.error) {
      return thunkAPI.rejectWithValue(userData);
    } else {
      return thunkAPI.fulfillWithValue(userData);
    }
  }
);

export const loadContact = createAsyncThunk(
  "user/loadContact",
  async (_, thunkAPI) => {
    const contacts = await APIAdapter.getWithAuth("/api/user/current/contact");
    if (contacts.error) {
      return thunkAPI.rejectWithValue(contacts);
    } else {
      return thunkAPI.fulfillWithValue(contacts);
    }
  }
);

export const loadPending = createAsyncThunk(
  "user/loadPending",
  async (_, thunkAPI) => {
    const pendings = await APIAdapter.getWithAuth("/api/user/current/pending");
    if (pendings.error) {
      return thunkAPI.rejectWithValue(pendings);
    } else {
      return thunkAPI.fulfillWithValue(pendings);
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
