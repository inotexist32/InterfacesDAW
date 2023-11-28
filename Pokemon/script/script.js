var cartas = [];
var selected = 0;
var aciertos = 0;
var lastSelected = "";
var bussy = false;
var clicks = 0;
class Carta {
    constructor(imgCode) {
        this.imgCode = imgCode;
        this.id = generarNumeroAleatorio();
    }
    getNode() {
        var carta = document.createElement("div");
        carta.id = this.id;
        carta.classList.add("card");
        carta.name = this.imgCode;
        var frontalCarta = document.createElement("div");
        frontalCarta.style.backgroundImage = "url(./assets/img/" + this.imgCode + ".png)";
        frontalCarta.classList.add("card-front");
        var reversoCarta = document.createElement("div");
        reversoCarta.classList.add("card-back");
        var marca = document.createElement("p");
        marca.classList.add("mark");
        marca.innerText = this.imgCode;
        reversoCarta.appendChild(marca);

        carta.appendChild(frontalCarta);
        carta.appendChild(reversoCarta);

        carta.onclick = function () {
            select(this.id);
        };
        return carta;
    }
}

function generarNumeroAleatorio() {
    const min = 1000000000;
    const max = 9999999999;

    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorio.toString();
}

function crearCartas() {
    cartas.push(new Carta("F01"));
    cartas.push(new Carta("F01"));
    cartas.push(new Carta("F02"));
    cartas.push(new Carta("F02"));
    cartas.push(new Carta("F03"));
    cartas.push(new Carta("F03"));
    cartas.push(new Carta("F04"));
    cartas.push(new Carta("F04"));
    cartas.push(new Carta("F05"));
    cartas.push(new Carta("F05"));
    cartas.push(new Carta("F06"));
    cartas.push(new Carta("F06"));
}
function pintaCartas() {
    var tablero = document.getElementsByClassName("tablero")[0];

    while (cartas.length > 0) {
        var cardNumber = getRandomNumber(cartas.length - 1);
        var carta = cartas[cardNumber];
        cartas.splice(cardNumber, 1);

        tablero.appendChild(carta.getNode());
    }
}
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function prueba() {
    crearCartas();
    pintaCartas();
}

function select(id) {
    if (lastSelected == id || bussy)
        return;

    clicks++;
    setScore()
    lastSelected = id;
    var carta = document.getElementById(id);
    carta.classList.add("card-selected");


    selected++;
    if (selected > 1) {
        bussy = true;
        setTimeout(function () {
            unselect();
            bussy = false;
        }, 500);
        return;
    }
}
function unselect() {
    var selects = document.getElementsByClassName("card-selected");
    if (selects[0].name == selects[1].name) {
        aciertos++;
        selects[0].classList.add("card-deleted");
        selects[1].classList.add("card-deleted");
    }
    Array.from(selects).forEach(select => {
        select.classList.remove("card-selected")
    });
    selected = 0;
    lastSelected = "";
    if (aciertos > 5)
        terminarJuego();
}

function terminarJuego() {
    document.getElementsByClassName("tablero")[0].classList.add("tablero-terminado")
}
function setScore() {
    var scoreDiv = document.getElementById("actual-score");
    scoreDiv.innerHTML = "<b>Puntuación actual: </b>" + clicks;
}