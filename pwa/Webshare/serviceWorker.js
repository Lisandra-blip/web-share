const webShareMobile = "Web-Share-Mobile";
const assets = [
  "./",
  "./index.html",
  "./app.js"
  //,
  //"https://uploads-ssl.webflow.com/5fd2188df28fb24f6a63402c/604a0f980e199240beb4043e_Slide%204_3%20-%201%20(16).png"
];

self.addEventListener('install', e => {
  e.waitUntil(
    // depois que o Service Worker estiver instalado,,
    // abra um novo cache
    caches.open('my-pwa-cache').then(cache => {
      // adicione todas as URLs de recursos que queremos armazenar em cache
      return cache.addAll([
        './',
        "./index.html",
        "./app.js"
      ]);
    })
  );
 });

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

// This code executes in its own worker or thread
// self.addEventListener("install", event => {
//   console.log("Service worker installed");
// });
// self.addEventListener("activate", event => {
//   console.log("Service worker activated");
// });