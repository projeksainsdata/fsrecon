import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle, toggleRTL } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconUser from '../components/Icon/IconUser';
import IconMail from '../components/Icon/IconMail';
import IconLockDots from '../components/Icon/IconLockDots';

import { axiosAuth } from '../services/axios';
import { login } from '../store/authSlice';
import useFormData from '../hooks/useForm';
import { showNotif } from '../store/notifSlice';
import LoadingButton from '../components/Loading/LoadingButton';

const Register = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register'));
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const { data, handleChange } = useFormData({
        fullname: '',
        email: '',
        password: '',
        password2: '',
    });
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // register logic
        try {
            // set loading to true
            setLoading(true);
            // check if data not null
            if (!data.fullname && !data.email && !data.password && !data.password2) {
                dispatch(showNotif({ message: 'All field is required', type: 'error' }));
                setLoading(false);
                return;
            }
            if (data.password !== data.password2) {
                dispatch(showNotif({ message: 'Password not match', type: 'error' }));
                setLoading(false);
                return;
            }
            const response = await axiosAuth.post('api/register', {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                password2: data.password2,
            });

            //    login after register
            const responseLogin = await axiosAuth.post('api/login', {
                email: data.email,
                password: data.password,
            });

            dispatch(login({ jwt: responseLogin.data.data }));
            dispatch(showNotif({ message: `Login Success`, type: 'success' }));
            setLoading(false);

            navigate('/verifyemail');
        } catch (error: any) {
            // check if error from a
            if (error.response) {
                dispatch(showNotif({ message: error.response.data.message, type: 'error' }));
            }
            setLoading(false);
        } finally {
            setLoading(false);
            // set loading to false
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
                            <div className="mb-10">
                                <img alt="Logo Faculty of Science ITERA" src="/assets/images/auth/Logo-FSains.png" />
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">FSRECON Register</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to register</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="fullname">Full Name</label>
                                    <div className="relative text-white-dark">
                                        <input id="fullname" type="text" placeholder="Enter Name" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="email" type="email" placeholder="Enter Email" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="password" type="password" placeholder="Enter Password" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password2">Password Confirm</label>
                                    <div className="relative text-white-dark">
                                        <input id="password2" type="password" placeholder="Enter Password" onChange={handleChange} className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]" disabled={loading}>
                                    {loading ? <LoadingButton /> : 'Register'}
                                </button>
                            </form>
                            <div className="mb-10 md:mb-[60px]"></div>
                            <div className="relative flex gap-4 items-center justify-between">
                                <Link to="/login" className="btn-login btn-secondary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Cancel
                                </Link>
                                <Link to="/forgotpassword" className="btn-login btn-secondary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Forgot Your Login Detail ?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
