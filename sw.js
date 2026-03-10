const CACHE_NAME="slotify-v10-cache-v1";
const urlsToCache=["./","./index.html","./manifest.json","./assets/icons/logo.png","./assets/icons/favicon.png","./assets/icons/icon-192.png","./assets/icons/icon-512.png","./assets/icons/apple-touch-icon.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET") return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).catch(()=>new Response("",{status:404,statusText:"Not found"}))));});