let deferredPrompt = null;


const installBtn =
    document.getElementById(
        "installBtn"
    );




// Detectar instalación disponible

window.addEventListener(
    "beforeinstallprompt",
    (event)=>{


        event.preventDefault();


        deferredPrompt = event;



        if(installBtn){


            installBtn.style.display =
                "block";


        }



    }

);






// Botón instalar

if(installBtn){


installBtn.addEventListener(
    "click",
    async ()=>{


        if(!deferredPrompt){


            console.log(
                "Instalación no disponible"
            );


            return;


        }




        deferredPrompt.prompt();




        const result =
            await deferredPrompt.userChoice;



        console.log(
            "Resultado instalación:",
            result.outcome
        );





        deferredPrompt = null;




        installBtn.style.display =
            "none";



    }

);


}









// Cuando la app ya fue instalada

window.addEventListener(
    "appinstalled",
    ()=>{


        console.log(
            "✅ MusicWave instalada correctamente"
        );



        deferredPrompt = null;



        if(installBtn){


            installBtn.style.display =
                "none";


        }



    }

);