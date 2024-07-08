//import all workbox modules
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Set workbox config
workbox.setConfig({
    debug: false,
});

// Set workbox cache names
workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time',
    googleAnalytics: 'ga',
});

// cleint claim using workbox
workbox.core.clientsClaim();
// caches claim using workbox
self.skipWaiting();
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
// Precache and route self.__WB_MANIFEST
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// Cache first strategy using reg
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-app-images-v1',
        plugins: [
            // workbox expiration plugin
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 12 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-app-scripts-v1',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 12 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-app-styles-v1',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 12 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'font',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-app-fonts-v1',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 12 * 60 * 60, // 7 Days
            }),
        ],
    })
);

// Cache first strategy
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'my-app-documents-v1',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 12 * 60 * 60, // 7 Days
            }),
        ],
    })
);

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
