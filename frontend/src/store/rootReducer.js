import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import {authApi,} from "../api/authApi.js";
import {defaultApi} from "../api/defaultApi.js";

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [defaultApi.reducerPath]: defaultApi.reducer,
});
export default rootReducer;
