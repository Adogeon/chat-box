import { createAsyncThunk } from "@reduxjs/toolkit";
import * as APIAdapter from "../../adapters/APIAdapter";

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
    const newRoomFetch = await APIAdapter.fetchWithAuth("/api/user/");
    const newRoomData = await newRoomFetch.json();
    return boxData;
  }
);
