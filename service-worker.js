self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1-vodomer').then(cache => {
      return cache.addAll([
        '/',
        '/vodomer/index.html',
        '/vodomer/styles.css',
        '/vodomer/script.js',
        '/vodomer/icons/icon-192x192.png',
        '/vodomer/icons/icon-360x360.png',
        '/vodomer/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});