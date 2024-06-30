import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 1,
        path: '/',
    });
};

export const removeCookie = (key) => {
    cookie.remove(key, {
        expires: 1,
    });
};

export const getCookie = (key) => getCookieFromBrowser(key);

const getCookieFromBrowser = (key) => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};
