import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBox } from "../../adapters/boxAdapter";

export const getCurrentBox = createAsyncThunk(
  "getCurrentBox",
  async (boxId, thunkAPI) => {
    const currentBoxData = await getBox(boxId, token);
    return currentBoxData;
  }
);

