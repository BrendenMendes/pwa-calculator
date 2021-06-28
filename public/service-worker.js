if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log("Service worker registered"))
        .catch(err => console.error(`Service Worker Error: ${err}`));
    });
} 
else {
    console.log("Service Worker is not supported by browser.");
}

const cacheName = "calculator";

const cachedAssets = ["/", "./index.html", "./style.css", "./script.js", "./manifest.json", "https://cdn.jsdelivr.net/npm/big.js@6.0.0/big.min.js"];

self.addEventListener("install", (e) => {
    console.log('Service worker installed')
    e.waitUntil(
        caches
        .open(cacheName)
        .then((cache) => { cache.addAll(cachedAssets); })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener("activate", (e) => {
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cache => {
            if (cache !== cacheName) {
                return caches.delete(cache);
            }
        }));
    }));
});

self.addEventListener("fetch", (e) => {
    console.log("Fetching data from cache")
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});