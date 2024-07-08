import { lazy } from 'react';
import RedirectIfAuthenticated from '../middleware/RedirectifAuthenticated';
import Login from '../pages/login';
import RequireAuth from '../middleware/RequireAuth';
import Register from '../pages/register';
import VerifyEmail from '../pages/verifyemail';
import ForgotPassword from '../pages/forgotpassword';
const Index = lazy(() => import('../pages/Index'));

const routes = [
    {
       path: '/login',
       element: <RedirectIfAuthenticated Component={Login} />,
       layout: 'blank',
    },

    {
       path: '/register',
       element: <RedirectIfAuthenticated Component={Register} />,
       layout: 'blank',
    },
    // {
    //     path: '/',
    //     element: <Index />,
    //     layout: 'default',
    //  },
    {
         path: '/verifyemail',
         element: <VerifyEmail />,
         layout: 'default',
    },
    {
         path: '/forgotpassword',
         element: <ForgotPassword />,
         layout: 'default',
    },
    // dashboard
    {
       path: '/',
       element: <RequireAuth Component={Index} />,
       layout: 'default',
    }



];

export { routes };
