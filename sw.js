const CACHE_PREFIX = "fle-vocab-pwa-";
const CACHE_NAME = CACHE_PREFIX + "387a44d8cf68";
const APP_ROOT = new URL("./", self.registration.scope).href;
const APP_FILES = ["./", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"]
  .map((path) => new URL(path, APP_ROOT).href);

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES.map((url) => new Request(url, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const indexUrl = new URL("index.html", APP_ROOT).href;
  const appNavigation = request.mode === "navigate" &&
    (url.origin + url.pathname === APP_ROOT || url.origin + url.pathname === indexUrl);
  if (request.method !== "GET" || (!appNavigation && !APP_FILES.includes(url.href))) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const key = appNavigation ? APP_ROOT : url.href;
    try {
      const response = await fetch(request, appNavigation ? { cache: "no-store" } : undefined);
      if (response.ok) {
        await cache.put(key, response.clone()).catch(() => {});
        return response;
      }
      return (await cache.match(key)) ?? response;
    } catch (error) {
      const cached = await cache.match(key);
      if (cached) return cached;
      throw error;
    }
  })());
});
