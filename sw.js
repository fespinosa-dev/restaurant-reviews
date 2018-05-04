(function () {
    'use strict';
    var REQUIRED_FILES = ['/', 'css/styles.css', 'data/restaurants.json',
        'js/dbhelper.js', 'js/main.js', 'js/restaurant_info.js', 'img/1.jpg',
        'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg',
        'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg', 'index.html',
        'restaurant.html'
    ];
    var CACHE_NAME = 'restaurant-reviews-cache-v1';

    //Caching site asset
    self.addEventListener('install', function (event) {
        event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(REQUIRED_FILES);
        }));
    });

    
    self.addEventListener('fetch', function (event) {
        event.respondWith(caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function (response) {
                return response;
            });
        }).catch(function (error) {
            console.log('Error, ', error);
        }));
    });
    self.addEventListener('activate', function (event) {
        var cacheWhitelist = [CACHE_NAME];
        event.waitUntil(caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (CACHE_NAME) {
                if (cacheWhitelist.indexOf(CACHE_NAME) === -1) {
                    return caches.delete(CACHE_NAME);
                }
            }));
        }));
    });
})();