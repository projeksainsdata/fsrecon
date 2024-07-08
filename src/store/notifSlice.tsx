import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toast : {
        show: false,
        message: '',
        type: 'success',
    },
    loading: false,
};

const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        showNotif: (state, { payload }) => {
            state.toast = {
                show: true,
                message: payload.message,
                type: payload.type,
            };
        },
        hideNotif: (state) => {
            state.toast = {
                show: false,
                message: '',
                type: 'success',
            };
        },
    },
});

export const { showNotif, hideNotif } = notifSlice.actions;
export default notifSlice.reducer;
