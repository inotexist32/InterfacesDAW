class MainShip {
    constructor() {
        this.node = document.getElementsByClassName("battle-panel-main-ship");
        this.thrusterSpeed = 0;
        this.steeringPosition = 50;
    }
}

var popaShieldElement;
var proaShieldElement;
var baborShieldElement;
var estriborShieldElement;

var popaShieldValue;
var proaShieldValue;
var baborShieldValue;
var estriborShieldValue;

var warpEngineOverheating;
var laserShoots = 0;

var rotationDegree = 0;
var clockInterval;

var enemyShip;
var natalityProgress = 0.0;
function startClock() {
    clockInterval = setInterval(clock, 1000);
}
/**
 * Función que se ejecuta cada segundo y llama a las demás funciones
 * que dependan del paso del tiempo
 */
function clock() {
    checkAlive();
    consumEnergy();
    advanceCountdown();
    cooling();
    updateInterfaces();
    moveShip();
    natality();
}
function natality() {
    natalityProgress += getNatalityIndex() * getSurvivors() / 100;
    if (natalityProgress >= 1) {
        if (getSurvivors() < 100)
            setSurvivors(getSurvivors() + 1);
        natalityProgress = 0.0;
    }
}
function checkAlive() {
    if (getEnergy() <= 0 || countdown <= 0 || getSurvivors()<1) {
        endgame();
        clearInterval(clockInterval);
    }
}
/*
Al girar la nave en grados multiplos de 45, las esquinas del elemento hacen que el ancho alcance su longitud máxima.
Esto altera la posición absoluta del elemento, creando valores incorrectos al ajustar el posicionamiento.
Como medida para solucionarlo he creado un mapa con un valor de corrección asociado a cada grado de 0 a 45.
*/

function moveShip() {
    var correccionDesplazamiento = {
        0: 0,
        1: 1.7300102710723877,
        2: 3.429032325744629,
        3: 5.0965495109558105,
        4: 6.732052803039551,
        5: 8.335043907165527,
        6: 9.905035972595215,
        7: 11.418146133422852,
        8: 12.944116592407227,
        9: 14.389911651611328,
        10: 15.845593452453613,
        11: 17.19925308227539,
        12: 18.60593032836914,
        13: 19.89012908935547,
        14: 21.22176170349121,
        15: 22.4744873046875,
        16: 23.689903259277344,
        17: 24.867647171020508,
        18: 26.00735092163086,
        19: 27.108673095703125,
        20: 28.171276092529297,
        21: 29.17908477783203,
        22: 30.164119720458984,
        23: 31.123598098754883,
        24: 32.0282096862793,
        25: 32.89260482788086,
        26: 33.71651840209961,
        27: 34.49970245361328,
        28: 35.23061752319336,
        29: 35.93246078491211,
        30: 36.592689514160156,
        31: 37.22053909301758,
        32: 37.79673767089844,
        33: 38.33095932006836,
        34: 38.82304763793945,
        35: 39.27284622192383,
        36: 39.68022537231445,
        37: 40.04505157470703,
        38: 40.36722183227539,
        39: 40.64264678955078,
        40: 40.883209228515625,
        41: 41.07685852050781,
        42: 41.2275390625,
        43: 41.335205078125,
        44: 41.399147033691406,
        45: 41.421356201171875
    };

    let mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];


    let transform = mainShip.style.transform;

    let rotation = parseFloat(transform.split("(")[1].split(")")[0]);
    let forward = parseFloat(transform.split("(")[2].split(")")[0]);

    var rect = mainShip.getBoundingClientRect();
    let index = Math.floor(Math.abs(rotation) % 90);
    if (index > 45) {
        index = 45 - (index - 45);
    }
    var topAbsoluto = rect.top + correccionDesplazamiento[index];
    var leftAbsoluto = rect.left + correccionDesplazamiento[index];

    if (leftAbsoluto < 0)
        leftAbsoluto = 0;
    if (topAbsoluto < 0)
        topAbsoluto = 0;

    mainShip.style.top = topAbsoluto + "px";
    mainShip.style.left = leftAbsoluto + "px";

    mainShip.style.transform = "rotateZ(" + (rotation) + "deg) translateY(0px)";
    mainShip.style.transition = "1s linear";


    let direccionInputValue = document.getElementById("direction-slider").value - 50;
    let speedValue = -document.getElementById("speed-slider").value / 10;

    mainShip.style.transform = "rotateZ(" + (rotation + direccionInputValue / 2) + "deg) translateY(" + (speedValue) + "px)";
}
function advanceCountdown() {
    if (countdown > 0)
        countdown--;
}
function cooling() {
    coolingWarpEngine();
}
function consumEnergy() {
    if (thrusterSpeed > 500)
        substractEnergy(thrusterSpeed / 10000);

    if (warpEngineOverheating > 0)
        substractEnergy(getWarpCooler()); // Consumo del refrigerador de salto
}
function coolingWarpEngine() { // Refrigera 1 de base por segundo mas los 10 por cada punto del refrigerador
    if (warpEngineOverheating > 0) {
        warpEngineOverheating -= getWarpCooler() * 10 + 1;
    }
}
function centerHelm() {
    document.getElementById("direction-slider").value = 50;
}
function loadElements() {
    popaShieldElement = document.getElementById("popa-shield");
    proaShieldElement = document.getElementById("proa-shield");
    baborShieldElement = document.getElementById("babor-shield");
    estriborShieldElement = document.getElementById("estribor-shield");
    warpEngineOverheating = document.getElementById("jump-progress");
}

function getShieldsRemainingEnergy() {
    return getShieldsEnergy() - getShieldsEnergyCurrent();
}
function getShieldsEnergyCurrent() {
    return popaShieldElement.value + proaShieldElement.value + baborShieldElement.value + estriborShieldElement.value;
}
function equalizeShields() {
    var proaShield = document.getElementById("proa-shield").value;
    var popaShield = document.getElementById("popa-shield").value;
    var baborShield = document.getElementById("babor-shield").value;
    var estriborShield = document.getElementById("estribor-shield").value;

    var total = proaShield + popaShield + baborShield + estriborShield;

    // Verifica si la suma es igual a 100 y ajusta los valores si es necesario
    if (total !== 100) {
        var adjustment = 100 - total;
        // Distribuye el ajuste a las barras de manera proporcional
        proaShield += adjustment * (proaShield / total);
        popaShield += adjustment * (popaShield / total);
        baborShield += adjustment * (baborShield / total);
        estriborShield += adjustment * (estriborShield / total);
    }

    document.getElementById("proa-shield").value = proaShield;
    document.getElementById("popa-shield").value = popaShield;
    document.getElementById("babor-shield").value = baborShield;
    document.getElementById("estribor-shield").value = estriborShield;
}

function updateShield(updatedRange) {
    let ranges = document.getElementsByClassName("shield-range")
    let totalCurrentValue = 0;

    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        totalCurrentValue += parseInt(range.value);
    }

    const adjustment = 100 - totalCurrentValue;

    var restantes = 0;
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (updatedRange.id != range.id)
            if ((range.value > 0 && adjustment < 0) || (range.value < 100 && adjustment > 0))
                restantes++;
    }
    if (restantes == 0)
        return;

    const sharedAdjustment = adjustment / restantes;
    if (Math.abs(sharedAdjustment) < 3)
        return;
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (range !== updatedRange) {
            range.value = (parseInt(range.value) + sharedAdjustment).toFixed(2);
        }
    }

    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        totalCurrentValue += parseInt(range.value);
    }
    if (totalCurrentValue > 0)
        updateShield(updatedRange);
    updateShieldImage();
}
function updateShieldImage() {
    let shield = document.getElementsByClassName("battle-panel-main-ship-shield")[0];

    let shieldLeftValue = controls.getElementById("babor-shield").value;
    let shieldRightValue = controls.getElementById("estribor-shield").value;
    let shieldFrontValue = controls.getElementById("proa-shield").value;
    let shieldRearValue = controls.getElementById("popa-shield").value;

    let horizontalValue = (shieldRightValue - shieldLeftValue) / 5;
    let verticalValue = (shieldRearValue - shieldFrontValue) / 5;


    shield.style.boxShadow = horizontalValue + "px " + verticalValue + "px 10px 10px rgba(28, 240, 255, 0.5)";

}


function upSpeed() {
    let speed = getThrusterSpeed();
    if (speed < 901) {
        setThrusterSpeed(100 + speed);
        updateInterfaces();
    }
}

function downSpeed() {
    let speed = getThrusterSpeed();
    if (speed > 99) {
        setThrusterSpeed(speed - 100);
        updateInterfaces();
    }
}
function changeWeapon() {
    var weapon1 = document.getElementById("weapon1");
    var weapon2 = document.getElementById("weapon2");

    if (weapon2.checked)
        weapon1.checked = true;
    else
        weapon2.checked = true;

}
function shoot() {
    if (enemyShip && enemyShip.hull > 0) {
        const mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];
        var weapon2 = document.getElementById("weapon2");
        if (weapon2.checked) {
            playMissileSound();
            setMissiles(getMissiles() - 1);
            dispararMisil();
            enemyShip.disableShield();
        }
        else {
            playBlasterSound();
            laserShoots++;
            setEnergy(getEnergy() - 1);
            disparar();
            enemyShip.hit(getLaserDamage(), calcularAngulo(mainShip, enemyShip.findElement()));

        }
        updateInterfaces();
    }
}
function changeWarpCooler() {
    var coolerElement = document.getElementById("warp-cooler-level");
    setWarpCooler(coolerElement.value);
    updateInterfaces();
}
function reload() {
    laserShoots = 0;
    updateInterfaces();
}
function turnRightShip() {
    const mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];
    rotationDegree += 90;
    mainShip.style.transform = `rotateZ(${rotationDegree}deg)`;
}
function turnLeftShip() {
    const mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];
    rotationDegree -= 90;
    mainShip.style.transform = `rotateZ(${rotationDegree}deg)`;
}
function disparar() {
    let mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];
    let enemyShip = document.getElementsByClassName("battle-panel-enemy-ship")[0];

    let disparo = document.createElement("div");
    disparo.classList.add("disparo");

    disparo.style.left = mainShip.offsetLeft + (parseFloat(window.getComputedStyle(mainShip).width) / 2) + "px";
    disparo.style.top = mainShip.offsetTop + (parseFloat(window.getComputedStyle(mainShip).height) / 2) + "px";
    disparo.style.transform = "rotateZ(" + calcularAngulo(enemyShip, mainShip) + "deg)";
    document.getElementsByClassName("battle-panel")[0].appendChild(disparo);
    document.body.appendChild(disparo);

    disparo.style.left = enemyShip.offsetLeft + (parseFloat(window.getComputedStyle(enemyShip).width) / 2) + "px";
    disparo.style.top = enemyShip.offsetTop + (parseFloat(window.getComputedStyle(enemyShip).height) / 2) + "px";
    disparo.style.height = "100px";

    setTimeout(function () {
        disparo.remove();
    }, 300);
}
function dispararMisil() {
    let mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];
    let enemyShip = document.getElementsByClassName("battle-panel-enemy-ship")[0];

    let disparo = document.createElement("div");
    disparo.classList.add("disparo-misil");

    disparo.style.left = mainShip.offsetLeft + (parseFloat(window.getComputedStyle(mainShip).width) / 2) + "px";
    disparo.style.top = mainShip.offsetTop + (parseFloat(window.getComputedStyle(mainShip).height) / 2) + "px";
    disparo.style.transform = "rotateZ(" + calcularAngulo(enemyShip, mainShip) + "deg)";
    document.getElementsByClassName("battle-panel")[0].appendChild(disparo);
    document.body.appendChild(disparo);

    disparo.style.left = enemyShip.offsetLeft + (parseFloat(window.getComputedStyle(enemyShip).width) / 2) + "px";
    disparo.style.top = enemyShip.offsetTop + (parseFloat(window.getComputedStyle(enemyShip).height) / 2) + "px";
    disparo.style.height = "100px";

    setTimeout(function () {
        disparo.remove();
    }, 300);
}
function calcularAngulo(enemyShip, mainShip) {
    const deltaX = enemyShip.offsetLeft - mainShip.offsetLeft;
    const deltaY = enemyShip.offsetTop - mainShip.offsetTop;

    const radianes = Math.atan2(deltaY, deltaX);

    const grados = radianes * (180 / Math.PI);

    const anguloFinal = (grados + 360) % 360;

    return anguloFinal + 90;
}


function startChangeShieldsValueFromMap() {
    var shieldMap = document.getElementsByClassName('shield-map')[0];
    document.addEventListener('mousemove', changeShieldsValueFromMap);
    document.addEventListener('mouseup', stopChangeShieldsValueFromMap);
    shieldMap.addEventListener('mouseleave', stopChangeShieldsValueFromMap);

}
function stopChangeShieldsValueFromMap() {
    var shieldMap = document.getElementsByClassName('shield-map')[0];
    document.removeEventListener('mousemove', changeShieldsValueFromMap);
    document.removeEventListener('mouseup', stopChangeShieldsValueFromMap);
    shieldMap.removeEventListener('mouseleave', stopChangeShieldsValueFromMap);
}
function changeShieldsValueFromMap(evento) {

    var posX = evento.offsetX - 100;
    var posY = evento.offsetY - 100;

    let pesoIzquierda = 100;
    let pesoDerecha = 100;
    let pesoArriba = 100;
    let pesoAbajo = 100;

    if (posX < 0) {
        pesoIzquierda = -posX + 100;
        pesoDerecha = 100 + posX;
    }
    else if (posX > 0) {
        pesoIzquierda = 100 - posX;
        pesoDerecha = 100 + posX;
    }
    if (posY < 0) {
        pesoArriba = -posY + 100;
        pesoAbajo = posY + 100;
    }
    else if (posY > 0) {
        pesoArriba = 100 - posY;
        pesoAbajo = 100 + posY;
    }

    let sumaPesos = pesoIzquierda + pesoDerecha + pesoArriba + pesoAbajo;

    let totalPuntos = getShields();

    let puntosIzquierda = (pesoIzquierda / sumaPesos) * totalPuntos;
    let puntosDerecha = (pesoDerecha / sumaPesos) * totalPuntos;
    let puntosArriba = (pesoArriba / sumaPesos) * totalPuntos;
    let puntosAbajo = (pesoAbajo / sumaPesos) * totalPuntos;

    controls.getElementById("babor-shield").setValue(puntosIzquierda);
    controls.getElementById("estribor-shield").setValue(puntosDerecha);
    controls.getElementById("proa-shield").setValue(puntosArriba);
    controls.getElementById("popa-shield").setValue(puntosAbajo);

    estriborShieldValue = puntosDerecha;
    baborShieldElement = puntosIzquierda;
    proaShieldElement = puntosArriba;
    popaShieldElement = puntosAbajo;

    let selector = document.getElementsByClassName("shield-map-selector")[0];
    posX += 94;
    posY += 94;

    if (posX < -6)
        posX = -6
    if (posX > 206)
        posX = 206

    if (posY < -6)
        posY = -6
    if (posY > 206)
        posY = 206

    selector.style.left = posX + "px";
    selector.style.top = posY + "px";
    updateShieldImage();
}

function setInitialShields() {
    let totalPuntos = getShields();

    let puntosIzquierda = totalPuntos / 4;
    let puntosDerecha = totalPuntos / 4;
    let puntosArriba = totalPuntos / 4;
    let puntosAbajo = totalPuntos / 4;

    controls.getElementById("babor-shield").setValue(puntosIzquierda);
    controls.getElementById("estribor-shield").setValue(puntosDerecha);
    controls.getElementById("proa-shield").setValue(puntosArriba);
    controls.getElementById("popa-shield").setValue(puntosAbajo);

    estriborShieldValue = puntosDerecha;
    baborShieldElement = puntosIzquierda;
    proaShieldElement = puntosArriba;
    popaShieldElement = puntosAbajo;

    let selector = document.getElementsByClassName("shield-map-selector")[0];
    selector.style.left = 90 + "px";
    selector.style.top = 90 + "px";
    updateShieldImage();
}