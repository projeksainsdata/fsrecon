import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { login } from '../store/authSlice';
import IconMail from '../components/Icon/IconMail';
import IconLockDots from '../components/Icon/IconLockDots';
import useFormData from '../hooks/useForm';
import { axiosAuth } from '../services/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../components/Loading/LoadingButton';



const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    }, [dispatch]);

    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [loading, setLoading] = useState(false);

    const { data, handleChange } = useFormData({
        email: '',
        password: '',
    });

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
    
            if (!data.email || !data.password) {
                toast.error('Email and Password are required');
                setLoading(false);
                return;
            }
    
            const response = await axiosAuth.post('/api/login', {
                email: data.email,
                password: data.password,
            });
    
            if (response.data && response.data.data) {
                dispatch(login({ jwt: response.data.data }));
                toast.success('Login Success');
                navigate('/');
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <ToastContainer />
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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-3xl">FSRECON MANAGER LOGIN</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
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

                                <div className="text-center dark:text-white">
                                    Forgot Password ?&nbsp;
                                    <Link to="/forgotpassword" className="text-primary underline transition hover:text-black dark:hover:text-white">
                                        Send Login Detail
                                    </Link>
                                </div>

                                <div className="relative flex gap-4 text-base items-center justify-between">
                                    <button type="submit" className={`btn-login btn-primary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ${loading ? 'cursor-not-allowed' : ''}`}>
                                        {loading ? <LoadingButton /> : 'Author Login'}
                                    </button>
                                    <button type="submit" className={`btn-login btn-primary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ${loading ? 'cursor-not-allowed' : ''}`}>
                                        {loading ? <LoadingButton /> : 'Reviewer Login'}
                                    </button>
                                    <button type="submit" className={`btn-login btn-primary w-full border-0 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] ${loading ? 'cursor-not-allowed' : ''}`}>
                                        {loading ? <LoadingButton /> : 'Editor Login'}
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
