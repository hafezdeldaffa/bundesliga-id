importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/nav.html',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/nav.js',
        revision: '1'
    },
    {
        url: '/service-worker.js',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/push.js',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/db.js',
        revision: '1'
    },
    {
        url: '/js/regis.js',
        revision: '1'
    },
    {
        url: '/js/main.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    },
    {
        url: '/assets/image/icon.png',
        revision: '1'
    },
    {
        url: '/assets/image/icon-192.png',
        revision: '1'
    },
    {
        url: '/assets/image/icon-48.png',
        revision: '1'
    },
    {
        url: '/assets/image/icon-512.png',
        revision: '1'
    },
    {
        url: '/assets/image/icon-96.png',
        revision: '1'
    },
    {
        url: '/',
        revision: '1'
    },
    {
        url: '/pages/home.html',
        revision: '1'
    },
    {
        url: '/pages/saved.html',
        revision: '1'
    },
    {
        url: '/pages/standing.html',
        revision: '1'
    },
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/js/'),
    workbox.strategies.staleWhileRevalidate({
        networkTimeoutSeconds: 5,
        cacheName: 'js'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new RegExp('/assets/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api'
    })
);

self.addEventListener('push', event => {
    let body

    event.data ? body = event.data.text() : body = 'No Payload'
    const options = {
        body: body,
        icon: '/assets/image/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})

/* const CACHE_NAME = 'bundesliga-v1.0.2';
let urlsToCache = [
    '/',
    '/nav.html',
    '/index.html',
    '/pages/home.html',
    '/pages/standing.html',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/js/nav.js',
    '/manifest.json',
    '/js/api.js',
    '/js/db.js',
    '/js/idb.js',
    '/js/regis.js',
    '/js/main.js',
    '/assets/image/icon-192.png',
    '/assets/image/icon-48.png',
    '/assets/image/icon-512.png',
    '/assets/image/icon-96.png',
    '/assets/image/icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', (event) => {
    let base_url = 'https://api.football-data.org'

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return fetch(event.request).then((response) => {
                    cache.put(event.request.url, response.clone())
                    return response
                })
            })
        )
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then((response) => {
                return response || fetch(event.request)
            })
        )
    }
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`Service Worker: cache ${cacheName} dihapus`)
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/assets/image/icon-96.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
}); */