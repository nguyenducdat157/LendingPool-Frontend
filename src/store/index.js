import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import common from "./common.reducer";

const reducer = combineReducers({
  // here we will be adding reducers
  common,
});
const store = configureStore({
  reducer,
});
export default store;
