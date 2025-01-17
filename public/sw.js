self.addEventListener('install', (event) => {

    console.log('Service Worker installed:', event);
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated:', event);
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});




self.addEventListener('push', (event) => {
    console.log('Push event received:', event);

    const data = event.data ? event.data.json() : {};
    console.log('Parsed push data:', data);

    const title = data.title || 'Default title';
    const options = {
        body: data.body || 'Default body',
        icon: data.icon || '/icons/icon-192x192.png',
    };

    // Show notification when push event occurs
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('message', (event) => {


    if (event.data && event.data.type === 'PUSH_NOTIFICATION') {
        const message = event.data.payload;
        console.log('Received push data from app:', message);

        // Show notification from service worker
        self.registration.showNotification('neww', {
            body: 'new message',
            icon: '/public/icon/icon_192.png',
            tag: 'new-message', // Optional: gives a unique ID to the notification
            renotify: true, // Optional: ensures the notification will be re-shown if a new one comes in
        }).catch((err) => {
            console.error('Error displaying notification:', err);
        });
    }
});




// Other service worker events (install, activate, etc.) go here...




// Handle notification click event
self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    notification.close();

    event.waitUntil(
        self.clients.openWindow('/?section=profile') // Open your app’s messages page
    );
});