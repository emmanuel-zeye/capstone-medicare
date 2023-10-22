import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";

import storage from "redux-persist/lib/storage";
import {authApi} from "../api/authApi.js";
import {setupListeners} from "@reduxjs/toolkit/query";
import {loadState} from "./localStorage.js";
import rootReducer from "./rootReducer.js";
import {defaultApi} from "../api/defaultApi.js";

const persistedState = loadState();

const persistConfig = {
    key: "root",
    storage,
    // whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    preloadedState: persistedState,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware, defaultApi.middleware),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

setupListeners(store.dispatch);
export default store;
