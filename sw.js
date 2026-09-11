const CACHE_NAME = "kangoo-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/css/main.css",
  "/assets/css/components.css",
  "/assets/css/animations.css",
  "/assets/js/app.js",
  "/assets/js/state.js",
  "/assets/js/engine/camera.js",
  "/assets/js/engine/poseDetector.js",
  "/assets/js/data/scenarios.js",
  "/assets/js/utils/audio.js",
  "/assets/js/utils/storage.js",
  // Images and icons
  "/assets/images/icon-192.png",
  "/assets/images/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
