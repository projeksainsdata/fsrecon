// Install and activate service worker
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/favicon.ico',
                '/logo192.png',
                '/logo512.png',
                '/sw-dev.js',
                '/sw-prod.js',
                '/static/js/bundle.js',
                '/static/js/0.chunk.js',
                '/static/js/main.chunk.js',
                '/static/js/vendors~main.chunk.js',
                '/static/css/main.chunk.css',
                '/static/css/vendors~main.chunk.css',
                '/static/media/logo.5d5d9eef.svg',
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

// Receive push notifications
self.addEventListener('push', function (e) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (e.data) {
        let payload = e.data.json();
        e.waitUntil(
            self.registration.showNotification(payload.title, {
                body: payload.body,
                icon: payload.icon,

                actions: payload.actions,
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
