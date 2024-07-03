import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';
import Toast from './components/Toast/ToastPopup';
import 'react-toastify/dist/ReactToastify.css';
// register service worker
import * as serviceWorkerRegistration from './registerServiceWorker';

// Register service worker
serviceWorkerRegistration.register({
    bypassNodeEnvProduction: true,
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router} />
                <Toast />
            </Provider>
        </Suspense>
    </React.StrictMode>
);
