const CACHE_NAME = 'vodomer-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './style.css',
  './script.js',
  './icon-192x192.png',
  './icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Otevírám cache a ukládám soubory.');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});