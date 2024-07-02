import { lazy } from 'react';
import RedirectIfAuthenticated from '../middleware/RedirectifAuthenticated';
import Login from '../pages/login';
import RequireAuth from '../middleware/RequireAuth';
import Register from '../pages/register';
import VerifyEmail from '../pages/verifyemail';
import ForgotPassword from '../pages/forgotpassword';
const Index = lazy(() => import('../pages/Index'));

const routes = [
        // dashboard
    {
       path: '/',
       element: <Index />,
       layout: 'default',
    },
    {
        path: '/verifyemail',
        element: <VerifyEmail />,
        layout: 'default',
    },
    {
        path: '/forgotpassword',
        element: <ForgotPassword />,
        layout: 'default',
    }

    // login
    //{
    //    path: '/login',
    //    element: <RedirectIfAuthenticated Component={Login} />,
    //    layout: 'blank',
    //},
    // register
    //{
    //    path: '/register',
    //    element: <RedirectIfAuthenticated Component={Register} />,
    //    layout: 'blank',
    //},
    // dashboard
    //{
    //    path: '/',
    //    element: <RequireAuth Component={Index} />,
    //    layout: 'default',
    //},



];

export { routes };
