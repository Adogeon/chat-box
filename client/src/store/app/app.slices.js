import { createSlice } from "@reduxjs/toolkit";

export const appSlices = createSlice({
  name: "app",
  initialState: {
    showModal: false,
    modalContent: "",
    mobileSideBarOpen: false,
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
    toggleMobileSideBar: (state) => {
      state.mobileSideBarOpen = !state.mobileSideBarOpen;
    },
  },
});

export const { openModal, closeModal, toggleMobileSideBar } = appSlices.actions;
export default appSlices.reducer;
