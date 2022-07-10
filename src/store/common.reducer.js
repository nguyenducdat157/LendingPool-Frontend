import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    openModalDeposit: false,
    openModalBorrow: false,
    openModalConnect: false,
    connected: false,
    modalAction: "",
    loading: false,
  },
  reducers: {
    toggleModalDeposit: (state) => {
      state.openModalDeposit = !state.openModalDeposit;
    },
    toggleModalBorrow: (state) => {
      state.openModalBorrow = !state.openModalBorrow;
    },

    showModalConnect: (state) => {
      console.log(state);
      state.openModalConnect = true;
    },
    closeModalConnect: (state) => {
      state.openModalConnect = false;
    },
    toggleModalConnect: (state) => {
      state.openModalConnect = !state.openModalConnect;
    },
    connect: (state) => {
      state.connected = true;
    },
    disconnect: (state) => {
      state.connected = false;
    },
    setModalAction: (state, { payload }) => {
      state.modalAction = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    closeLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleModalBorrow,
  toggleModalDeposit,
  showModalConnect,
  closeModalConnect,
  toggleModalConnect,
  connect,
  disconnect,
  setModalAction,
  setLoading,
  closeLoading,
} = commonSlice.actions;

export default commonSlice.reducer;
