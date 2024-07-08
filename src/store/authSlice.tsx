// In your auth slice file
import { createSlice } from '@reduxjs/toolkit';
import { getJwt, setCredentials, getUser } from '../helpers/credentials';
const initialState = {
    isAuthenticated: !!getJwt(),
    user: getUser() || null,
    jwt: getJwt(),
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
            state.user = null;
            state.jwt = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
