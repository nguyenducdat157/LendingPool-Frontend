import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    openModalDeposit: false,
    openModalBorrow: false,
  },
  reducers: {
    toggleModalDeposit: (state) => {
      console.log(state);
      state.openModalDeposit = !state.openModalDeposit;
    },
    toggleModalBorrow: (state) => {
      state.openModalBorrow = !state.openModalBorrow;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleModalBorrow, toggleModalDeposit } = commonSlice.actions;

export default commonSlice.reducer;
