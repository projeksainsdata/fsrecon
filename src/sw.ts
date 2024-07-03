// Install and activate service worker
self.addEventListener('install', function (e) {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    self.clients.claim();
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
