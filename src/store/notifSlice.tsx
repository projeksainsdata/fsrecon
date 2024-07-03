import { createSlice } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    message: string;
    type: string;
    title: string;
    isRead: boolean;
    action: string;
}

export interface NotifState {
    toast: {
        show: boolean;
        message: string;
        type: string;
    };
    notifications: Notification[];
}

export interface NotifPayload {
    message: string;
    type: string;
}

export interface Toast {
    show: boolean;
    message: string;
    type: string;
}

const initialState = {
    toast: {
        show: false,
        message: '',
        type: 'success',
    } as Toast,
    notifications: [] as Notification[],
};

const notifSlice = createSlice({
    name: 'notif',
    initialState: initialState as NotifState,
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
        fetchNotifications: (state, { payload }) => {
            state.notifications = payload;
        },

        addNotification: (state, { payload }) => {
            state.notifications.push(payload);
        },
        removeNotification: (state, { payload }) => {
            state.notifications = state.notifications.filter((notif) => notif.id !== payload.id);
        },

        markAsRead: (state, { payload }) => {
            state.notifications = state.notifications.map((notif) => {
                if (notif.id === payload.id) {
                    notif.isRead = true;
                }
                return notif;
            });
        },

        markAllAsRead: (state) => {
            state.notifications = state.notifications.map((notif) => {
                notif.isRead = true;
                return notif;
            });
        },
    },
});

export const { showNotif, hideNotif } = notifSlice.actions;
export default notifSlice.reducer;
