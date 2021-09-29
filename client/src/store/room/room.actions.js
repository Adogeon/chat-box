import { createAsyncThunk } from "@reduxjs/toolkit";
import * as APIAdapter from "../../adapters/APIAdapter";

export const getCurrentRoom = createAsyncThunk(
  "room/getCurrentRoom",
  async (boxId, thunkAPI) => {
    const currentBoxFetch = await APIAdapter.fetchWithToken(
      `/api/box/${boxId}`
    );
    const boxData = await currentBoxFetch.json();
    return boxData;
  }
);
