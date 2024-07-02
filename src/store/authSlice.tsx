// In your auth slice file
import { createSlice } from '@reduxjs/toolkit';
import { getJwt, setCredentials, getUser, removeCredentials, isAuth } from '@/helpers/credentials';
const initialState = {
    isAuthenticated: isAuth() || false,
    user: getUser() || null,
    jwt: getJwt() || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isAuthenticated = true;
            state.jwt = payload.jwt;
            setCredentials(payload.jwt);
            state.user = getUser();
        },
        logout: (state) => {
            state.isAuthenticated = false;
            // remove credentials
            removeCredentials();
            state.jwt = null;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
