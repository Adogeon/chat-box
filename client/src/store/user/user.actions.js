import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewContact, getCurrentUser } from "../../adapters/userAdapter";
import * as APIAdapter from "../../adapters/APIAdapter";

export const loadCurrent = createAsyncThunk(
  "user/loadUser",
  async (_, thunkAPI) => {
    console.log("Blimey");
    const userFetch = await APIAdapter.fetchWithAuth("/api/user/current");
    console.log(userFetch);
    const userData = await userFetch.json();
    console.log(userData);
    if (userFetch.error) {
      return thunkAPI.rejectWithValue(userData);
    } else {
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
