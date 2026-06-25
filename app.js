let songs = [];

let currentSongIndex = 0;

let isPlaying = false;



const songContainer =
    document.getElementById("songContainer");

const searchInput =
    document.getElementById("search");

const player =
    document.getElementById("audioPlayer");

const playBtn =
    document.getElementById("playBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const currentTitle =
    document.getElementById("currentTitle");

const currentArtist =
    document.getElementById("currentArtist");




// =========================
// CARGAR CANCIONES
// =========================

async function loadSongs(){

    try{


        const response =
            await fetch("/song.json");


        if(!response.ok){

            throw new Error(
                "No se encontró song.json"
            );

        }


        songs =
            await response.json();



        renderSongs(songs);


        loadFavorites();



    }catch(error){


        console.error(
            "Error cargando canciones:",
            error
        );


    }

}






// =========================
// MOSTRAR CANCIONES
// =========================


function renderSongs(songList){


    songContainer.innerHTML = "";


    songList.forEach(song => {



        const card =
            document.createElement("div");


        card.className =
            "song-card";



        card.innerHTML = `


            <h3>
                🎵 ${song.title}
            </h3>


            <p>
                ${song.artist}
            </p>


            <button class="play-btn">
                ▶ Reproducir
            </button>



            <button class="favorite-btn">

                ❤️ Favorito

            </button>


        `;



        card
        .querySelector(".play-btn")
        .addEventListener(
            "click",
            ()=>{


                currentSongIndex =
                    songs.findIndex(
                        item =>
                        item.id === song.id
                    );


                playSong();


            }
        );



        card
        .querySelector(".favorite-btn")
        .addEventListener(
            "click",
            ()=>{


                toggleFavorite(song.id);


            }
        );



        songContainer.appendChild(card);



    });



}






// =========================
// REPRODUCIR CANCION
// =========================


function playSong(){


    const song =
        songs[currentSongIndex];



    if(!song)
        return;




    player.pause();



    player.src =
        window.location.origin +
        encodeURI(song.audio);



    player.load();



    player.play()

    .then(()=>{


        isPlaying = true;


        playBtn.textContent =
            "⏸️";



    })


    .catch(error=>{


        console.error(
            "Error reproduciendo audio:",
            error
        );


    });




    currentTitle.textContent =
        song.title;


    currentArtist.textContent =
        song.artist;



    progress.value = 0;



}







// =========================
// PLAY / PAUSA
// =========================


playBtn.addEventListener(
    "click",
    ()=>{


        if(!player.src)
            return;



        if(isPlaying){


            player.pause();


            isPlaying=false;


            playBtn.textContent =
                "▶️";


        }else{


            player.play();


            isPlaying=true;


            playBtn.textContent =
                "⏸️";


        }


    }
);







// =========================
// SIGUIENTE
// =========================


nextBtn.addEventListener(
    "click",
    ()=>{


        currentSongIndex++;



        if(
            currentSongIndex >= songs.length
        ){

            currentSongIndex = 0;

        }



        playSong();



    }
);








// =========================
// ANTERIOR
// =========================


prevBtn.addEventListener(
    "click",
    ()=>{


        currentSongIndex--;



        if(
            currentSongIndex < 0
        ){

            currentSongIndex =
                songs.length - 1;

        }



        playSong();



    }
);








// SIGUIENTE AUTOMÁTICO

player.addEventListener(
    "ended",
    ()=>{


        nextBtn.click();


    }
);








// BARRA DE PROGRESO

player.addEventListener(
    "timeupdate",
    ()=>{


        if(player.duration){


            progress.value =
            (
                player.currentTime /
                player.duration
            ) * 100;


        }


    }
);








progress.addEventListener(
    "input",
    ()=>{


        if(player.duration){


            player.currentTime =
            (
                progress.value / 100
            )
            *
            player.duration;


        }


    }
);








// VOLUMEN

volume.addEventListener(
    "input",
    ()=>{


        player.volume =
            volume.value;


    }
);








// BUSCADOR

if(searchInput){


searchInput.addEventListener(
    "input",
    ()=>{


        const text =
            searchInput.value
            .toLowerCase();



        const filtered =
            songs.filter(song =>



                song.title
                .toLowerCase()
                .includes(text)



                ||

                song.artist
                .toLowerCase()
                .includes(text)



            );



        renderSongs(filtered);



    }
);


}








// FAVORITOS

function loadFavorites(){


    if(
        typeof renderFavorites === "function"
    ){

        renderFavorites();

    }


}








// PWA

if(
    "serviceWorker" in navigator
){


window.addEventListener(
    "load",
    ()=>{


        navigator.serviceWorker
        .register(
            "/service-worker.js"
        )

        .then(()=>{


            console.log(
                "✅ PWA registrada"
            );


        })

        .catch(error=>{


            console.error(
                "Error PWA:",
                error
            );


        });



    }
);


}
loadSongs();