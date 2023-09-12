import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import {
  authApi,
} from "../api/authApi.js";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});
export default rootReducer;
