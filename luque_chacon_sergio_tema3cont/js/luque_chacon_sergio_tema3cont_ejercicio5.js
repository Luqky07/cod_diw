let playlistMemes  = [
    {
        title: "MEMES ESPAÑOLES",
        url: "videos/MEMES_ESPAÑOLES.mp4"
    },
    {
        title: "MEMES ESPAÑOLES V2",
        url: "videos/MEMES_ESPAÑOLES_V2.mp4"
    },
    {
        title: "MEMES ESPAÑOLES V3",
        url: "videos/MEMES_ESPAÑOLES_V3.mp4"
    },
    {
        title: "MEMES ESPAÑOLES V4",
        url: "videos/MEMES_ESPAÑOLES_V4.mp4"
    }
]

//Objetos del DOM
const reproductor = document.getElementById("reproductor");
const title = document.getElementById("name");
const progreso = document.getElementById("progreso");
const duracion = document.getElementById("duracion");
const playlist = document.getElementById("playlist");
const stepBackward = document.getElementById("stepBacward");
const control = document.getElementById("control");
const stepForward = document.getElementById("stepForward");
const shuffle = document.getElementById("shuffle");

const play = "<span class='glyphicon glyphicon-play'></span>"
const pause = "<span class='glyphicon glyphicon-pause'></span>";

let aleatorio = false;
let reproduciendo = false;
let actualVideo = 0;
let lista = "";
let historial = [0];
let videosVistos = [0];

//Eventos
reproductor.addEventListener("ended", avanzarVideo);
reproductor.addEventListener("timeupdate", actualizarProgreso);
duracion.addEventListener("click", cambiarProgreso);
control.addEventListener("click", reproduccion);
stepBackward.addEventListener("click", retrocederVideo);
stepForward.addEventListener("click", avanzarVideo);
shuffle.addEventListener("click", cambiarShuffle);

//Funciones

function reproduccion() {
    if (reproduciendo == false) start();
    else stop();
}

//Inicia la cancion
function start() {
    video.play();
    control.innerHTML = pause;
    reproduciendo = true;
}

//Para la canción
function stop() {
    video.pause()
    control.innerHTML = play;
    reproduciendo = false;
}

//Pone la canción anterior o empieza de nuevo la canción
function retrocederVideo() {
    if (video.currentTime > 5) actualVideo = historial[historial.length - 1];
    else {
        if (historial.length > 1) historial.pop();
        actualVideo = historial[historial.length - 1];
        videosVistos.pop();
    }
    actualizarCancion();
    actualizarLista();
}

//Pone la siguiente canción
function avanzarVideo() {
    if (aleatorio == false) {
        if (actualVideo == playlistMemes.length - 1) {
            actualVideo = 0;
        } else actualVideo++;
    }
    if (aleatorio == true) {
        do {
            actualVideo = Math.ceil(Math.random() * playlistMemes.length - 1);
        } while (actualVideo == historial[historial.length - 1] || videosVistos.includes(actualVideo) == true);
    }
    videosVistos.push(actualVideo);
    if (videosVistos.length == playlistMemes.length) videosVistos = [actualVideo];
    historial.push(actualVideo);
    actualizarCancion();
    actualizarLista();
}

//Actualizar el titulo de la canción
function actualizarVideo() {
    reproductor.src = playlistMemes[actualVideo].url;
    title.innerHTML = playlistMemes[actualVideo].title;
    start();
}

function actualizarLista(){
    for (i in playlistMemes) {
        document.getElementById(i).style.color = "#ffffff"
    }
    document.getElementById(actualVideo).style.color = "#9500c6";
}