const offlineUrl = 'offline.html';

self.addEventListener("install", (event) => {
    console.log("installed");
    event.waitUntil(
        caches.open('static')
        .then((cache)=>{
            cache.addAll([
                '/',      
                offlineUrl,                   
                'static/js/*.js',  
                'static/css/*.css',      
                'static/media/logo.e2ed9e3c.png'
            ]);
            console.log("caching is done here")
        })
    );

});

self.addEventListener("activate", () => {
    console.log("activated");
    
});




const CACHE_DYNAMIC_NAME='Fetch Cache';
const CACHE_CONTAINING_ERROR_MESSAGES='Fetch Cache Error';

self.addEventListener('fetch', function(event) {
  // console.log("this public :"+event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
                return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                  .then(function(cache) {
                    return cache.match(offlineUrl);
                  });
              });
          }
        })
    );
  });          

