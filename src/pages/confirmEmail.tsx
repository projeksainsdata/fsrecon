import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { showNotif } from '../store/notifSlice';
import { AxiosError } from 'axios';
import LoadingOverlay from '../components/Loading/LoadingOverLay';
import axiosApiInstance from '../services/axios';
import { login } from '../store/authSlice';

const ConfirmEmail = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Reset Password'));
    }, []);
    const navigate = useNavigate();
    // get params
    const { token } = useParams();

    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!token) {
            // redirect to dashboard
            navigate('/');
        }
        try {
            setLoading(true);
            const fetchData = async () => {
                const response = await axiosApiInstance.post(`api/confirm-email/${token}`);
                if (response.status === 200) {
                    setIsValid(true);
                }
                dispatch(
                    showNotif({
                        type: 'success',
                        message: 'Email verified',
                    })
                );
                // set Credential new
                dispatch(
                    login({
                        jwt: response.data.data.tokens,
                    })
                );

                setLoading(false);
                // navigate to login
                navigate('/');
            };
            fetchData();
        } catch (error) {
            setLoading(false);
            // check error is axios error
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.data) {
                    dispatch(
                        showNotif({
                            type: 'error',
                            message: axiosError.response?.data.message,
                        })
                    );
                }
            }
            // redirect to verify email
            navigate('/verify-email');
        }
    }, [token]);

    return (
        <div className="fix" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading && <LoadingOverlay />}
            {isValid && <div>Email verified</div>}
        </div>
    );
};

export default ConfirmEmail;
