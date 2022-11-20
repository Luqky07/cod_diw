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

//Declarando los id del html

const video = document.getElementById("reproductor");
const control = document.getElementById("control");
const progreso = document.getElementById("progreso");
const duracion = document.getElementById("duracion");
const playlist = document.getElementById("playlist");
const stepBackward = document.getElementById("stepBacward");
const stepForward = document.getElementById("stepForward");
const shuffle = document.getElementById("shuffle");

//Variables para cambiar los glyphicons

const play = "<span class='glyphicon glyphicon-play'></span>"
const pause = "<span class='glyphicon glyphicon-pause'></span>";

//Inicio de la página

let aleatorio = false;
let reproduciendo = false;
let actualVideo = 0;
let lista = "";
let historial = [0];
let videoVistos = [0];
for (i in playlistMemes) {
    lista += "<li id='"+ i +"'>" + playlistMemes[i].title + "</li>"
}
playlist.innerHTML = lista;
video.src = playlistMemes[actualVideo].url;
title.innerHTML = playlistMemes[actualVideo].title;
document.getElementById(actualVideo).style.color= "#555555";

//Funciones

//Para o reanuda la canción
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
function retrocederCancion() {
    if (video.currentTime > 5) actualVideo = historial[historial.length - 1];
    else {
        if (historial.length > 1) historial.pop();
        actualVideo = historial[historial.length - 1];
        videoVistos.pop();
    }
    actualizarCancion();
}

//Pone la siguiente canción
function avanzarCancion() {
    if (aleatorio == false) {
        if (actualVideo == playlistMemes.length - 1) {
            actualVideo = 0;
        } else actualVideo++;
    }
    if (aleatorio == true) {
        do {
            actualVideo = Math.ceil(Math.random() * playlistMemes.length - 1);
        } while (actualVideo == historial[historial.length - 1] || videoVistos.includes(actualVideo) == true);
    }
    videoVistos.push(actualVideo);
    if (videoVistos.length == playlistMemes.length) videoVistos = [];
    historial.push(actualVideo);
    actualizarCancion();
}

//Actualizar el titulo de la canción
function actualizarCancion() {
    for (i in playlistMemes) {
        document.getElementById(i).style.color = "#ffffff"
    }
    video.src = playlistMemes[actualVideo].url;
    title.innerHTML = playlistMemes[actualVideo].title;
    document.getElementById(actualVideo).style.color= "#555555";
    start();
}

//Cambiar estilo shuffle
function cambiarShuffle() {
    if (aleatorio == false) {
        shuffle.style.color = "#03b100";
        aleatorio = true;
    } else {
        shuffle.style.color = "#555555";
        aleatorio = false;
    }
}

//Actualizar barra de reproducción
function actualizarProgreso(evento) {
    const { duration, currentTime } = evento.srcElement;
    const porcentaje = (currentTime / duration) * 100;
    progreso.style.width = porcentaje + "%"
}

//Permitir cambiar tiempo de la canción
function cambiarProgreso(evento) {
    const totalWidth = this.offsetWidth;
    const ubicacionClick = evento.offsetX;
    const tiempo = (ubicacionClick / totalWidth) * video.duration;
    video.currentTime = tiempo;
}

//Eventos
video.addEventListener("ended", avanzarCancion);
video.addEventListener("timeupdate", actualizarProgreso);
duracion.addEventListener("click", cambiarProgreso);
control.addEventListener("click", reproduccion);
stepBackward.addEventListener("click", retrocederCancion);
stepForward.addEventListener("click", avanzarCancion);
shuffle.addEventListener("click", cambiarShuffle);