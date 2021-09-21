import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewContact, getCurrentUser } from "../../adapters/userAdapter";

export const loadCurrent = createAsyncThunk(
  "loadUser",
  async (token, thunkAPI) => {
    const userFetch = await getCurrentUser(token);
    if (getFetch.error) {
      thunkAPI.rejectWithValue(userFetch);
    } else {
      thunkAPI.fulfillWithValue(userFetch);
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
