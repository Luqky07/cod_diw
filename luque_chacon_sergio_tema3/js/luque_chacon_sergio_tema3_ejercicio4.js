//Array de las canciones

let cancionesJson;

/* const canciones = [
    {
        title: "I'll show you ft TWICE, Bekuh, BOOM, Annita Wells",
        url: "songs/KDA_-_I’LL_SHOW_YOU_ft_TWICE_Bekuh_BOOM_Annika_Wells_Official_Concept_Video_-_Starring_Ahri[ConverteZilla.com].mp3",
        thumbnail: "images/0.jpg"
    },
    {
        title: "More ft Madison Beer, (G)I-DLE, Lexie Liu, Jaira Burns y Seraphine",
        url: "songs/KDA_-_MORE_ft_Madison_Beer_GI-DLE_Lexie_Liu_Jaira_Burns_Seraphine_Official_Music_Video[ConverteZilla.com].mp3",
        thumbnail: "images/1.jpg"
    },
    {
        title: "Popstars ft Madison Beer, (G)I-DLE, Jaira Burns",
        url: "songs/KDA_-_POPSTARS_ft_Madison_Beer_GI-DLE_Jaira_Burns_Music_Video_-_League_of_Legends[ConverteZilla.com].mp3",
        thumbnail: "images/2.jpg"
    },
    {
        title: "The baddest ft (G)I-DLE, Bea Miller, Wolftyla",
        url: "songs/KDA_-_THE_BADDEST_ft_GI-DLE_Bea_Miller_Wolftyla_Official_Lyric_Video_League_of_Legends[ConverteZilla.com].mp3",
        thumbnail: "images/3.jpg"
    },
    {
        title: "Villain ft Madison Beer, Kim Petras",
        url: "songs/KDA_-_VILLAIN_ft_Madison_Beer_and_Kim_Petras_Official_Concept_Video_-_Starring_Evelynn[ConverteZilla.com].mp3",
        thumbnail: "images/4.jpg"
    }
]; */

let canciones = [];

/* const canciones = []; */

//Declarando los id del html

const audio = document.getElementById("audio");
const control = document.getElementById("control");
const images = document.getElementById("images");
const title = document.getElementById("name");
const progreso = document.getElementById("progreso");
const duracion = document.getElementById("duracion");
const listaCanciones = document.getElementById("canciones");
const stepBackward = document.getElementById("stepBacward");
const stepForward = document.getElementById("stepForward");
const shuffle = document.getElementById("shuffle");
const search = document.getElementById("save");
const data = document.getElementsByName("data")[0];
const article = document.getElementById("article");
const ytsearch = "https://www.youtube.com/results?search_query=";

//Variables para cambiar los glyphicons

const play = "<span class='glyphicon glyphicon-play'></span>"
const pause = "<span class='glyphicon glyphicon-pause'></span>";

//Inicio de la página

let aleatorio = false;
let reproduciendo = false;
let actualSong = 0;
let lista = "";
let historial = [0];
let cancionesEscuchadas = [0];
let numCanciones = 0;


//Funciones

//Para o reanuda la canción
function reproduccion() {
    if (reproduciendo == false) start();
    else stop();
}

//Inicia la cancion
function start() {
    audio.play();
    control.innerHTML = pause;
    reproduciendo = true;
}

//Para la canción
function stop() {
    audio.pause()
    control.innerHTML = play;
    reproduciendo = false;
}

//Pone la canción anterior o empieza de nuevo la canción
function retrocederCancion() {
    if (audio.currentTime > 5) actualSong = historial[historial.length - 1];
    else {
        if (historial.length > 1) historial.pop();
        actualSong = historial[historial.length - 1];
        cancionesEscuchadas.pop();
    }
    actualizarCancion();
    actualizarLista();
}

//Pone la siguiente canción
function avanzarCancion() {
    if (aleatorio == false) {
        if (actualSong == canciones.length - 1) {
            actualSong = 0;
        } else actualSong++;
    }
    if (aleatorio == true) {
        do {
            actualSong = Math.ceil(Math.random() * canciones.length - 1);
        } while (actualSong == historial[historial.length - 1] || cancionesEscuchadas.includes(actualSong) == true);
    }
    cancionesEscuchadas.push(actualSong);
    if (cancionesEscuchadas.length == canciones.length) cancionesEscuchadas = [actualSong];
    historial.push(actualSong);
    actualizarCancion();
    actualizarLista();
}

//Actualizar el titulo de la canción
function actualizarCancion() {
    audio.src = canciones[actualSong].url;
    images.src = canciones[actualSong].thumbnails;
    title.innerHTML = canciones[actualSong].title;
    start();
}

function actualizarLista(){
    for (i in canciones) {
        document.getElementById(i).style.color = "#ffffff"
    }
    document.getElementById(actualSong).style.color = "#9500c6";
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
    const tiempo = (ubicacionClick / totalWidth) * audio.duration;
    audio.currentTime = tiempo;
}

async function peticionGetId() {
    recargarCanciones();
    let res = await fetch("http://appfy.ml:8080/api/search?q=" + data.value);
    res = await res.json();
    for (r of res) {
        await peticionGetLink(r);
    }
}

async function peticionGetLink(id) {
    let res = await fetch("http://appfy.ml:8080/api/getLink?id=" + id);
    res = await res.json();
    canciones.push(res);
    listaCanciones.innerHTML += "<li id='" + numCanciones + "'>" + res.title + "</li>";
    if(numCanciones == 0){
        iniciarCanciones();
    }
    console.log(res);
    numCanciones++;
}

function recargarCanciones(){
    stop();
    historial = [0];
    cancionesEscuchadas = [0];
    canciones = [];
    actualSong = 0;
    numCanciones = 0;
    article.style.display = "none";
    listaCanciones.innerHTML = "";
}

function iniciarCanciones(){
    actualizarCancion();
    article.style.display = "block";
    document.getElementById(actualSong).style.color = "#9500c6";
}

//Eventos
audio.addEventListener("ended", avanzarCancion);
audio.addEventListener("timeupdate", actualizarProgreso);
duracion.addEventListener("click", cambiarProgreso);
control.addEventListener("click", reproduccion);
stepBackward.addEventListener("click", retrocederCancion);
stepForward.addEventListener("click", avanzarCancion);
shuffle.addEventListener("click", cambiarShuffle);
search.addEventListener("click", peticionGetId);

//Busqueda youtube