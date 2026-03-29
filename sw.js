const CACHE_NAME = "mine-cache-v1";
const urlsToCache = [
  "/mine/",
  "/mine/index.html",
  "/mine/style.css",
  "/mine/script.js",
  "/mine/icon.png"
];

// Installation
self.addEventListener("install", (event) => {
  console.log("Service Worker installé");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation
self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});