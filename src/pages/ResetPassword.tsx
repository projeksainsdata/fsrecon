import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import IconMail from '../components/Icon/IconMail';
import useFormData from '../hooks/useForm';
import { axiosAuth } from '../services/axios';
import { showNotif } from '../store/notifSlice';
import LoadingButton from '../components/Loading/LoadingButton';
import { AxiosError } from 'axios';

const ResetPassword = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Reset Password'));
    }, []);
    const navigate = useNavigate();
    const { data, handleChange } = useFormData({
        password: '',
        password2: '',
    });
    // get params ?token
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get('token');

    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setLoading(false);
            const response = await axiosAuth.post('api/reset-password', { ...data, token });
            dispatch(
                showNotif({
                    type: 'success',
                    message: 'Password reset successfully',
                })
            );

            // navigate to login
            navigate('/login');
        } catch (error) {
            // check error is axios error
            if ((error as AxiosError).response) {
                dispatch(
                    showNotif({
                        type: 'error',
                        message: (error as AxiosError).response?.data.message,
                    })
                );
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
                            <div className="mb-7">
                                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Password Reset</h1>
                                <p>Reset Your Password</p>
                            </div>

                            <form className="space-y-5" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="password" className="dark:text-white">
                                        new Password
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input id="password" type="password" onChange={handleChange} placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password2" className="dark:text-white">
                                        Password confirm
                                    </label>
                                    <div className="relative text-white-dark">
                                        <input id="password2" type="password" onChange={handleChange} placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
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

export default ResetPassword;
