function getFavorites() {


    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];


}





function saveFavorites(favorites) {


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


}







function toggleFavorite(id) {


    let favorites =
        getFavorites();



    const exists =
        favorites.includes(id);




    if(exists){


        favorites =
            favorites.filter(
                item => item !== id
            );


        showToast(
            "❌ Eliminado de favoritos"
        );


    }else{


        favorites.push(id);


        showToast(
            "❤️ Añadido a favoritos"
        );


    }




    saveFavorites(favorites);



    renderFavorites();



}








function renderFavorites(){



    if(
        typeof songs === "undefined"
    ) return;



    const favoriteContainer =
        document.getElementById(
            "favoriteContainer"
        );



    if(!favoriteContainer)
        return;





    const favorites =
        getFavorites();




    favoriteContainer.innerHTML = "";





    const favoriteSongs =
        songs.filter(
            song =>
            favorites.includes(song.id)
        );






    if(
        favoriteSongs.length === 0
    ){


        favoriteContainer.innerHTML = `

            <p>
                No tienes canciones favoritas.
            </p>

        `;


        return;


    }







    favoriteSongs.forEach(song => {



        const card =
            document.createElement(
                "div"
            );



        card.className =
            "song-card";






        card.innerHTML = `


            <h3>
                🎵 ${song.title}
            </h3>


            <p>
                ${song.artist}
            </p>



            <div class="btn-group">


                <button
                    class="play-btn">

                    ▶ Reproducir

                </button>




                <button
                    class="favorite-btn">

                    💔 Quitar

                </button>



            </div>


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


                toggleFavorite(
                    song.id
                );


            }
        );







        favoriteContainer
        .appendChild(card);



    });



}









function showToast(message){



    const toast =
        document.createElement(
            "div"
        );



    toast.className =
        "toast";



    toast.textContent =
        message;



    document.body
    .appendChild(toast);

    setTimeout(
        ()=>{

            toast.remove();


        },
        2500
    );

}