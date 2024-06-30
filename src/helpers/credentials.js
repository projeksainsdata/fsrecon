import { getCookie, setCookie } from './cookies.js';
import { jwtDecode } from 'jwt-decode';
import axios from '../services/axios';
// check jwt token is expired or not
export function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

export function decodeJwt(token) {
    return jwtDecode(token);
}

export const setCredentials = (value) => {
    try {
        setCookie('keys', JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
};

export const getUser = () => {
    try {
        const keys = getCookie('keys');

        // parse the keys to get the user
        const user = decodeJwt(JSON.parse(keys).access);
        return user.user;
    } catch (e) {
        return {};
        // console.log(e,"user");
    }
};

async function getAccessUsingRefresh(refreshToken) {
    return axios
        .post('/refresh', { refreshToken })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

async function getVerifiedKeys(keys) {
    // console.log("Loading keys from storage");

    if (keys) {
        // console.log('checking access');
        if (!isTokenExpired(keys.access)) {
            // console.log('returning access');

            return keys;
        } else {
            // console.log('access expired');

            // console.log('checking refresh expiry');

            if (!isTokenExpired(keys.refresh)) {
                // console.log('fetching access using refresh');

                // console.log('fetching access using refresh');

                const response = await getAccessUsingRefresh(keys.refresh);
                await setCredentials(response);

                return response;
            } else {
                // console.log('refresh expired, please login');

                return null;
            }
        }
    } else {
        // console.log('access not available please login');

        return null;
    }
}

// get credentials from cookies

export const getJwt = (key) => {
    try {
        const keys = getCookie('keys');
        if (keys) {
            return JSON.parse(keys);
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};

const getCredentials = async () => {
    try {
        let credentials = getCookie('keys');

        if (!credentials) {
            return null;
        }
        let cred = await getVerifiedKeys(JSON.parse(credentials));

        if (cred != null) {
            return cred;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};

export default getCredentials;
