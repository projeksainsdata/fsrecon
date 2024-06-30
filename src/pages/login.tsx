import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../store/themeConfigSlice';
import IconMail from '../components/Icon/IconMail';
import IconLockDots from '../components/Icon/IconLockDots';

const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const submitForm = () => {
        navigate('/');
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
                                <img alt='Logo Faculty of Science ITERA' src='/assets/images/auth/Logo-FSains.png' />
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">FSRECON LOGIN</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center dark:text-white">
                                    Forgot Password ?&nbsp;
                                    <Link to="/auth/boxed-signup" className="text-primary underline transition hover:text-black dark:hover:text-white">
                                        Send Login Detail
                                    </Link>
                                </div>
                                <div className="relative flex gap-4 text-base items-center justify-between">
                                    <button type="submit" className="btn-login btn-primary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                        Author Login
                                    </button>
                                    <button type="submit" className="btn-login btn-primary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                        Reviewer Login
                                    </button>
                                    <button type="submit" className="btn-login btn-primary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                        Editor Login
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 md:mt-[60px] text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/register" className="text-primary underline transition hover:text-black dark:hover:text-white">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
