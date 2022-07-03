const APP_PREFIX = 'BudgetTracker-';
const VERSION = '1.0.0';
const CACHE_NAME = `${APP_PREFIX}${VERSION}`;

const FILES_TO_CACHE = [
  './index.html',
  './css/styles.css',
  './js/index.js',
  './js/idb.js',
  './manifest.json',
  './icons/icon-512x512.png',
  './icons/icon-384x384.png',
  './icons/icon-192x192.png',
  './icons/icon-152x152.png',
  './icons/icon-144x144.png',
  './icons/icon-128x128.png',
  './icons/icon-96x96.png',
  './icons/icon-72x72.png'
];

//  install function
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    }))
});

// activate function
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }
  ));
});

// fetch function
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => { 
      if (response) {
        return response;
      }
      console.log('fetching');
      return fetch(event.request);
    }))
})