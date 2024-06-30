import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import authReducer from './authSlice';
import notifReducer from './notifSlice';


const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authReducer,
    notif: notifReducer,
});

const store = configureStore({
    reducer: rootReducer,

});

export type IRootState = ReturnType<typeof rootReducer>;
export default store;
