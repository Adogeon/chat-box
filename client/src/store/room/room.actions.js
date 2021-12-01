import { createAsyncThunk } from "@reduxjs/toolkit";
import * as APIAdapter from "@services/APIAdapter";

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async (boxId, thunkAPI) => {
    const currentBoxFetch = await APIAdapter.fetchWithAuth(`/api/box/${boxId}`);
    const boxData = await currentBoxFetch.json();
    return boxData;
  }
);



export const addNewRoom = createAsyncThunk(
  "addNewRoom",
  async (room, thunkAPI) => {
    const newBoxData = await APIAdapter.postWithAuth("/api/box/new", room);
    return newBoxData;
  }
);
