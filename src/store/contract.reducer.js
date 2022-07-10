import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    totalDeposit: -1,
    yourDeposit: -1,
    yourBorrow: -1,
    yourCollateral: -1,
    LTV: -1,
    HF: -1,
  },
  reducers: {
    setTotalDeposit: (state, action) => {
      state.totalDeposit = action.payload;
    },
    setYourDeposit: (state, action) => {
      state.yourDeposit = action.payload;
    },
    setYourBorrow: (state, action) => {
      state.yourBorrow = action.payload;
    },
    setYourColateral: (state, action) => {
      state.yourCollateral = action.payload;
    },
    setLVT: (state, action) => {
      state.LTV = action.payload;
    },
    setHF: (state, action) => {
      state.HF = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTotalDeposit,
  setYourBorrow,
  setYourColateral,
  setLVT,
  setHF,
} = contractSlice.actions;

export default contractSlice.reducer;
