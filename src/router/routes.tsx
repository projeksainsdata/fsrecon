import { lazy } from 'react';
import RedirectIfAuthenticated from '../middleware/RedirectifAuthenticated';
import Login from '../pages/login';
import RequireAuth from '../middleware/RequireAuth';
import Register from '../pages/register';
import VerifyEmail from '../pages/verifyemail';
import ForgotPassword from '../pages/forgotpassword';
import ResetPassword from '../pages/ResetPassword';
import ConfirmEmail from '../pages/confirmEmail';

const Index = lazy(() => import('../pages/Index'));

const routes = [
    {
        path: '/verify-email',
        element: <RequireAuth Component={VerifyEmail} />,
        layout: 'blank',
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        layout: 'blank',
    },

    // login
    {
        path: '/login',
        element: <RedirectIfAuthenticated Component={Login} />,
        layout: 'blank',
    },
    // register
    {
        path: '/register',
        element: <RedirectIfAuthenticated Component={Register} />,
        layout: 'blank',
    },
    // password-reset
    {
        path: '/reset-password',
        element: <ResetPassword />,
        layout: 'blank',
    },
    // dashboard
    {
        path: '/',
        element: <RequireAuth Component={Index} />,
        layout: 'default',
    },
    // confirm-email with params
    {
        path: '/confirm-email/:token',
        element: <RequireAuth Component={ConfirmEmail} />,
        layout: 'blank',
    },
    // page not found
    {
        path: '*',
        element: <RequireAuth Component={Index} />,
        layout: 'default',
    },
];

export { routes };
