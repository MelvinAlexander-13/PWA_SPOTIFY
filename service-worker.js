const CACHE_NAME = "musicwave-v3";


const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./styles.css",

    "./app.js",

    "./favorites.js",

    "./install.js",

    "./manifest.json",

    "./song.json",

    "./icon-192.png"

];




// INSTALACIÓN

self.addEventListener(
    "install",
    event => {


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(cache => {


                return cache.addAll(
                    FILES_TO_CACHE
                );


            })

        );


        self.skipWaiting();


    }

);





// ACTIVACIÓN

self.addEventListener(
    "activate",
    event => {


        event.waitUntil(


            caches.keys()

            .then(keys => {


                return Promise.all(


                    keys.map(key => {


                        if(
                            key !== CACHE_NAME
                        ){

                            return caches.delete(
                                key
                            );

                        }


                    })


                );


            })


        );


        self.clients.claim();


    }

);








// CARGA DE ARCHIVOS

self.addEventListener(
    "fetch",
    event => {



        event.respondWith(



            caches.match(
                event.request
            )

            .then(response => {



                if(response){

                    return response;

                }




                return fetch(
                    event.request
                )

                .then(networkResponse => {



                    return caches.open(
                        CACHE_NAME
                    )

                    .then(cache => {



                        cache.put(

                            event.request,

                            networkResponse.clone()

                        );



                        return networkResponse;



                    });



                });



            })



        );



    }

);