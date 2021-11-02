import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewContact, getCurrentUser } from "../../adapters/userAdapter";
import * as APIAdapter from "../../adapters/APIAdapter";
import socket from "../../adapters/socket";

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

export const addContact = createAsyncThunk(
  "addContact",
  async (token, thunkAPI) => {
    const addContactData = await addNewContact(userId, token);
    return addContactData;
  }
);

