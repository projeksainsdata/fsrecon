import axios from 'axios';
import getCredentials from '@/helpers/credentials';

// Assuming the environment variable is set as VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;

const axiosApiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async (config) => {
        const value = await getCredentials();
        if (!value) {
            throw new Error('Not logged in');
        }

        config.headers = {
            Authorization: `Bearer ${value.access}`,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const accessToken = await getCredentials();
            if (!accessToken) {
                return Promise.reject(error);
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken.access;
            return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosApiInstance;
