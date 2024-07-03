import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import IconMail from '../components/Icon/IconMail';
import useFormData from '../hooks/useForm';
import { axiosAuth } from '../services/axios';
import { showNotif } from '../store/notifSlice';
import LoadingButton from '../components/Loading/LoadingButton';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Box'));
    }, []);
    const navigate = useNavigate();
    const { data, handleChange } = useFormData({
        email: '',
    });
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosAuth.post('api/forgot-password', data);
            setLoading(false);
            setIsSending(true);
            dispatch(
                showNotif({
                    type: 'success',
                    message: 'Password reset link has been sent to your email. Please check your email.',
                })
            );
        } catch (error) {
            setLoading(false);
        }
    };
    const resendEmail = async () => {
        setIsSending(false);
        setLoading(true);
        try {
            await axiosAuth.post('api/forgot-password', data);
            setLoading(false);
            setIsSending(true);
            dispatch(
                showNotif({
                    type: 'success',
                    message: 'Password reset link has been sent to your email. Please check your email.',
                })
            );
        } catch (error) {
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
                            <div className="mb-7">
                                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Password Reset</h1>
                                <p>Enter your email to recover your ID</p>
                            </div>
                            {isSending && (
                                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                                    <p className="font-bold">Success</p>
                                    <p>Password reset link has been sent to your {data.email}. Please check your email inbox \ spam.</p>
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
                                <div>
                                    <label htmlFor="email" className="dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input id="email" type="email" onChange={handleChange} placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" disabled={isSending} className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {loading ? <LoadingButton /> : 'Send Email'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
