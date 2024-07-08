//import all workbox modules
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Set workbox config
workbox.setConfig({
    debug: true,
});

// Set workbox cache names
workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time',
    googleAnalytics: 'ga',
});

// Set workbox strategy
workbox.routing.registerRoute(new RegExp('https://jsonplaceholder.typicode.com/users'), new workbox.strategies.NetworkFirst());

// Set workbox strategy
workbox.routing.registerRoute(new RegExp('https://jsonplaceholder.typicode.com/posts'), new workbox.strategies.NetworkFirst());

// Set workbox strategy
workbox.routing.registerRoute(new RegExp('https://jsonplaceholder.typicode.com/comments'), new workbox.strategies.NetworkFirst());

// Set workbox strategy
workbox.routing.registerRoute(new RegExp('https://jsonplaceholder.typicode.com/albums'), new workbox.strategies.NetworkFirst());

// Set workbox strategy
workbox.routing.registerRoute(new RegExp('https://jsonplaceholder.typicode.com/photos'), new workbox.strategies.NetworkFirst());

// Set workbox strategy
workbox.routing.registerRoute(new RegExp('https://jsonplaceholder.typicode.com/todos'), new workbox.strategies.NetworkFirst());


precacheAndRoute(self.__WB_MANIFEST);

// Cache first strategy
registerRoute(
    ({ request }) => request.destination === 'image',
    new StaleWhileRevalidate({
        cacheName: 'my-app-images-v1',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
registerRoute(
    ({ request }) => request.destination === 'script',
    new StaleWhileRevalidate({
        cacheName: 'my-app-scripts-v1',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
registerRoute(
    ({ request }) => request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'my-app-styles-v1',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
registerRoute(
    ({ request }) => request.destination === 'font',
    new StaleWhileRevalidate({
        cacheName: 'my-app-fonts-v1',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
registerRoute(
    ({ request }) => request.destination === 'document',
    new StaleWhileRevalidate({
        cacheName: 'my-app-documents-v1',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
registerRoute(
    ({ request }) => request.destination === 'other',
    new StaleWhileRevalidate({
        cacheName: 'my-app-others-v1',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);

clientsClaim();



self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );

    event.waitUntil(
        caches.open('my-app-runtime-v1').then((cache) => {
            return fetch(event.request).then((response) => {
                return cache.put(event.request, response);
            });
        })
    );

    event.waitUntil(
        caches.open('my-app-runtime-v1').then((cache) => {
            return fetch(event.request).then((response) => {
                return cache.put(event.request, response);
            });
        })
    );
});

// Install and activate service worker
self.addEventListener('install', function (e) {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    self.clients.claim();
});

// Receive message from client
self.addEventListener('message', function (e) {
    console.log('Message from client: ', e.data);
});

// Receive push notifications
self.addEventListener('push', function (e) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (e.data) {
        let message = e.data.json();
        e.waitUntil(
            self.registration.showNotification(message.title, {
                body: message.body,
                icon: message.icon,
                actions: message.actions,
            })
        );
    }
});

// Click and open notification
self.addEventListener(
    'notificationclick',
    function (event) {
        event.notification.close();
        if (event.action === 'verify') clients.openWindow(`${'localhost:5173'}/verify-email`); // Open verify email page
        else clients.openWindow(event.action); // Open link from action
    },
    false
);
