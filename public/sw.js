self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    // Perform install steps, like caching assets
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    // Remove old caches, etc.
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});