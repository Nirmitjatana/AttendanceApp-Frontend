const cacheName = 'attendance-v1';
const staticAssets = [
  './',
  './index.html',
  './admin.html',
  './Admin/adminotp.html',
  './Admin/admindashboard.html',
  './Admin/Createdevents.html',
  './Admin/createevent.html',
  './Admin/events.html',
  './Admin/adminsignup.html',
  './CSS/adminotp.css',
  './CSS/create.css',
  './CSS/dashboard.css',
  './CSS/events.css',
  './CSS/hold.css',
  './CSS/loader.css',
  './CSS/login.css',
  './CSS/otp.css',
  './CSS/signup.css',
  './CSS/user.css',
  './view/otpscreen.html',
  './view/userongoing.html',
  './view/signup.html',
  './JS/admin.js',
  './JS/adminotp.js',
  './JS/adminsignup.js',
  './JS/create.js',
  './JS/dashboard.js',
  './JS/events.js',
  './JS/hold.js',
  './JS/login.js',
  './JS/otpscreen.js',
  './JS/signup.js',
  './JS/user.js',
];
var self = this;
self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

// self.addEventListener('fetch', async e => {
//   const req = e.request;
//   const url = new URL(req.url);

//   if (url.origin === location.origin) {
//     e.respondWith(cacheFirst(req));
//   } else {
//     e.respondWith(networkAndCache(req));
//   }
// });

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
// self.addEventListener('install', async e => {
  //   const cache = await caches.open(cacheName);
  // await cache.addAll(staticAssets);
  //   return self.skipWaiting();
  // });
  
  // self.addEventListener('activate', e => {
  //   self.clients.claim();
  // });
  
  // // self.addEventListener('fetch', async e => {
  // //   const req = e.request;
  // //   const url = new URL(req.url);
  
  // //   if (url.origin === location.origin) {
  // //     e.respondWith(cacheFirst(req));
  // //   } else {
  // //     e.respondWith(networkAndCache(req));
  // //   }
  // // });
  // // self.addEventListener('fetch', event => {
  // //     event.respondWith(
  // //       caches.open(CACHE_NAME).then(cache => {
  // //        return cache.match(event.request).then(response => {
  // //         return response || fetch(event.request)
  // //         .then(response => {
  // //           const responseClone = response.clone();
  // //           cache.put(event.request, responseClone);
  // //           })
  // //         })
  // //       }
  // //    )
  // //     )
  // //   }); 
  // async function cacheFirst(req) {
  //   const cache = await caches.open(cacheName);
  //   const cached = await cache.match(req);
  //   return cached || fetch(req);
  // }
  
  // async function networkAndCache(req) {
  //   const cache = await caches.open(cacheName);
  //   try {
  //     const fresh = await fetch(req);
  //     await cache.put(req, fresh.clone());
  //     return fresh;
  //   } catch (e) {
  //     const cached = await cache.match(req);
  //     return cached;
  //   }
  // }