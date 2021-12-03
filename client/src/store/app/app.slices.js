import { createSlice } from "@reduxjs/toolkit";
import { loadCurrent, loadContact, loadPending } from "../user/user.slices";

export const appSlices = createSlice({
  name: "app",
  initialState: {
    showModal: false,
    modalContent: "",
    mobileSideBarOpen: false,
    userLoaded: false,
    contactLoaded: false,
    roomsLoaded: false,
    pendingLoaded: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalContent = "";
    },
    toggleMobileSideBar: (state, action) => {
      if (typeof action.payload === "undefined") {
        state.mobileSideBarOpen = !state.mobileSideBarOpen;
      } else {
        state.mobileSideBarOpen = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrent.fulfilled, (state) => {
        state.userLoaded = true;
        state.roomsLoaded = true;
      })
      .addCase(loadContact.fulfilled, (state) => {
        state.contactLoaded = true;
      })
      .addCase(loadPending.fulfilled, (state) => {
        state.pendingLoaded = true;
      });
  },
});

export const { openModal, closeModal, toggleMobileSideBar } = appSlices.actions;
export default appSlices.reducer;
