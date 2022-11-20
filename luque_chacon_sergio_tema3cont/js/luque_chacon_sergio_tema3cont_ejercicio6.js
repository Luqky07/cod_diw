//Objetos del DOM
const canvas = document.getElementById("canvas");
const lienzo = canvas.getContext("2d");
const form = document.getElementById("form");

let x = 50;
let y = 50;
let aumentoX = 2;
let aumentoY = 2;

let texto;
let dimensiones;
let intervalo;
let primeraCarga = true;
let ancho;

//Funciones

function iniciarPintura(evento){
    reiniciarDibujo();
    evento.preventDefault();
    texto = evento.target.text.value;
    dimensiones = lienzo.measureText(texto);
    ancho = dimensiones.width;
    if(primeraCarga == true){
        ancho = ancho * 2.5;
        primeraCarga = false;
    }
    console.log(ancho);
    intervalo = setInterval(movimiento,10);
}

function pintar(){
    lienzo.beginPath();
    lienzo.font = "italic 24px monospace"
    lienzo.texAlign = "start";
    lienzo.fillStyle = "orange";
    lienzo.fillText(texto,x,y);
    lienzo.closePath();
}

function movimiento(){
    lienzo.clearRect(0, 0, canvas.width, canvas.height);
    pintar();
    
    if(x + aumentoX > canvas.width-ancho || x + aumentoX < 0) {
        aumentoX = -aumentoX;
    }
    if(y + aumentoY > canvas.height - 2 || y + aumentoY < 15) {
        aumentoY = -aumentoY;
    }
    
    x += aumentoX;
    y += aumentoY;
}

function reiniciarDibujo(){
    aumentoX = 2;
    aumentoY = 2;
    x = 50;
    y = 50;
    clearInterval(intervalo);
}

//Eventos

form.addEventListener("submit", iniciarPintura);