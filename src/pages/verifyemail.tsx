import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { showNotif } from '../store/notifSlice';
import axiosApiInstance from '../services/axios';
import LoadingButton from '../components/Loading/LoadingButton';

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Verify Email'));
    }, []);
    const navigate = useNavigate();
    const user = useSelector((state: IRootState) => state.auth.user);

    const submitForm = async (e) => {
        e.preventDefault();
        // verify email logic
        try {
            // set loading to true
            setLoading(true);
            // check if data not null
            if (!user.email) {
                dispatch(showNotif({ message: 'Email is required', type: 'error' }));
                setLoading(false);
                return;
            }
            // axios verify email
            const response = await axiosApiInstance.post('api/verify-email', {
                email: user.email,
            });
            dispatch(
                showNotif({
                    type: 'success',
                    message: 'Link Verify Email has been sent to your email. Please check your email in inbox/spam.',
                })
            );
            setIsSending(true);
            setLoading(false);
        } catch (error) {
            // check if error from api
            if (error.response) {
                dispatch(showNotif({ message: error.response.data.message, type: 'error' }));
            }
            setLoading(false);
        }
    };

    const resendEmail = async () => {
        try {
            // set loading to true
            setLoading(true);
            // check if data not null
            if (!user.email) {
                dispatch(showNotif({ message: 'Email is required', type: 'error' }));
                setLoading(false);
                return;
            }
            // axios verify email
            const response = axiosApiInstance.post('api/verify-email', {
                email: user.email,
            });
            dispatch(
                showNotif({
                    type: 'success',
                    message: 'Link Verify Email has been sent to your email. Please check your email in inbox/spam.',
                })
            );
            setIsSending(true);
            setLoading(false);
        } catch (error) {
            // check if error from api
            if (error.response) {
                dispatch(showNotif({ message: error.response.data.message, type: 'error' }));
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/gedungf.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10 flex items-center">
                                <div className="flex h-16 w-16 items-end justify-center overflow-hidden rounded-full bg-[#00AB55] ltr:mr-4 rtl:ml-4">
                                    <img src={user.profile_img} className="w-full object-cover " alt="images" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl dark:text-white">{user.email}</h4>
                                    <p className="text-sm dark:text-gray-400">Verify your email address</p>
                                </div>
                            </div>
                            {isSending && (
                                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                                    <p className="font-bold">Success</p>
                                    <p>Verify Email link has been sent to your {user.email}. Please check your email inbox\spam.</p>
                                    {/* resend email */}
                                    <p>
                                        Didn't receive an email?{' '}
                                        <button className="text-blue-500 dark:text-blue-400" onClick={resendEmail}>
                                            Resend Email
                                        </button>
                                    </p>
                                </div>
                            )}
                            <form className="space-y-5" onSubmit={submitForm}>
                                <div className="flex items-center justify-center">
                                    <img src="/assets/images/auth/reset-password.svg" alt="image" className="w-24 h-24" />
                                </div>

                                <button type="submit" disabled={isSending} className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {loading ? <LoadingButton /> : 'Verify Email'}
                                </button>
                            </form>

                            {/* resend email  button */}
                            {/* is sending */}
                            {isSending && (
                                <div className="flex items-center justify-center mt-6">
                                    <button className="text-blue-500 dark:text-blue-400">Resend Email</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
