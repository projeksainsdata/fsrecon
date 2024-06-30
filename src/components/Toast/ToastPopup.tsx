import { IRootState } from '@/src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { hideNotif } from '@/store/notifSlice';
import { ToastContainer, toast } from 'react-toastify';
function Toast() {
    const dispatch = useDispatch();
    const state = useSelector((state: IRootState) => state.notif);

    useEffect(() => {
        if (state.toast.show) {
            if (state.toast.type === 'success') {
                toast.success(state.toast.message);
            } else {
                toast.error(state.toast.message);
            }
            dispatch(hideNotif());
        }
    }, [state.toast.show]);

    return <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;
}

export default Toast;
