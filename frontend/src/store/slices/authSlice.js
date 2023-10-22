import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        token: "",
        refreshToken: "",
        tokenValidity: "",
        refreshTokenValidity: "",
    },

    reducers: {
        setCredentials: (
            state,
            {
                payload: {
                    user,
                    token,
                    refreshToken,
                    tokenValidity,
                    refreshTokenValidity,
                },
            }
        ) => {
            state.user = user;
            state.token = token;
            state.tokenValidity = tokenValidity;
            state.refreshToken = refreshToken;
            state.refreshTokenValidity = refreshTokenValidity;
        },
        logout: (state) => {
            state.token = "";
            state.user = {};
            state.refreshToken = "";
        },
    },
});

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user?.user;