import { createSlice } from "@reduxjs/toolkit";

const contextSlice = createSlice({
  name: "context",
  initialState: {
    sideBar: false,
  },
  reducers: {
    showSideBar: (state) => {
      state.sideBar = true;
    },
    hideSideBar: (state) => {
      state.sideBar = false;
    },
    toggleSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
  },
});

export const { showSideBar, hideSideBar, toggleSideBar } = contextSlice.actions;
export default contextSlice.reducer;
