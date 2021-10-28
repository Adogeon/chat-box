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
