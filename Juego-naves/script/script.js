function mostrarEscudoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("shield-interface").style.transform = "rotate(0deg)";
    document.getElementById("shield-interface").style.right = "20px";
}

function mostrarPropulsorInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("propulsor-interface").style.transform = "rotate(0deg)";
    document.getElementById("propulsor-interface").style.right = "20px";
}

function mostrarArmaInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("arma-interface").style.transform = "rotate(0deg)";
    document.getElementById("arma-interface").style.right = "20px";
}

function mostrarTripulacionInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("tripulacion-interface").style.transform = "rotate(0deg)";
    document.getElementById("tripulacion-interface").style.right = "20px";
}

function mostrarMotorSaltoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("motor-salto-interface").style.transform = "rotate(0deg)";
    document.getElementById("motor-salto-interface").style.right = "20px";
}

function ocultarTodasLasInterfaces() {
    playSlideSound();
    //document.getElementById("shield-interface").style.transform = "rotate(-20deg)";
    document.getElementById("shield-interface").style.right = "-1000px";
    //document.getElementById("propulsor-interface").style.transform = "rotate(-20deg)";
    document.getElementById("propulsor-interface").style.right = "-1000px";
    //document.getElementById("arma-interface").style.transform = "rotate(-20deg)";
    document.getElementById("arma-interface").style.right = "-1000px";
    //document.getElementById("motor-salto-interface").style.transform = "rotate(-20deg)";
    document.getElementById("motor-salto-interface").style.right = "-1000px";
}


function emergencyJump() {
    setEnergy(getEnergy() - 30)
    setSurvivors(getSurvivors() - 30)
    setHull(getHull() - 30)
    warpEngineOverheating = 100;
    updateInterfaces();

    closeBattlePanel();
    closeGalaxyMap();
    closeSystemMap();
    playWarpSound();
    setBackground("hyperspace");
    startVibrate();
    setTimeout(function () {
        setBackground("galaxy");
        stopVibrate();
    }, 2800);
}

function startGame() {
    playBackgroundMusic();
    setBackground("cp-city");
    var startGameNode = document.getElementsByClassName("start-game")[0];
    startGameNode.remove();
    setTimeout(firstLawyerDialog, 3000);
}
function startTest() {
    welcome()
}


document.addEventListener('DOMContentLoaded', function () {


    var shieldMap = document.getElementsByClassName("shield-map")[0];
    shieldMap.addEventListener('mousedown', startChangeShieldsValueFromMap);

    startTest();
});


function welcome() {
    let text00 = "Bienvenido a la nave, comandante. Le explicaré cómo tomar el control.";
    let text01 = "En el mapa de la galaxia, podrá elegir a qué sistema saltar, siempre y cuando el motor de salto esté refrigerado. Solo podemos saltar a estrellas colindantes. Cada salto consume energía y es importante elegir bien a qué estrella saltar.";
    let text02 = "Las estrellas con más planetas pueden tener más recursos que nos serán útiles para recuperar energía o mejorar la nave.";
    let text03 = "Para saltar a una estrella, selecciónala en el mapa y en la parte inferior de su interfaz aparecerá la opción de saltar, si es que está a nuestro alcance.";
    let text04 = "Para obtener recursos, podemos llevar a cabo expediciones en los planetas que encontremos. Cada planeta tiene un índice de riesgo que indica la posibilidad de que la expedición sufra un accidente que dañe la nave o cause bajas en los supervivientes. Si el planeta es muy cálido (por encima de los 100 grados), puede afectar a los sistemas de refrigeración de la nave.";
    let text05 = "En cada planeta, pueden verse los recursos que predominan. Si consigues recursos en las expediciones, estos acabarán en el inventario de la nave y podrán ser usados en el taller. El uranio pasa directamente a la energía de la nave. La chatarra puede encontrarse en cualquier planeta.";
    let text06 = "No existe un máximo de expediciones que puedan llevarse a cabo en un planeta. La única penalización es la posibilidad de tener bajas.";
    let text07 = "Los supervivientes no pueden encontrarse en el universo. La única forma de recuperarlos es desbloqueando la natalidad a través de las mejoras de dependencias en el taller.";
    let text08 = "Cada salto entraña la posibilidad de encontrar piratas, concretamente un 30% de posibilidad.";
    let text09 = "El sistema de combate es sencillo. El enemigo cambiará sus escudos una vez por segundo, nuestro objetivo es disparar en los flancos menos cubiertos por este. Es importante acertar, ya que cada disparo consume energía y puede dejarnos varados en el espacio. Los misiles nucleares no dañan el casco por sí solos, sino que provocan un efecto de pulso electromagnético, inutilizando los escudos del enemigo durante unos segundos.";
    let text10 = "Cuidado al moverte durante el combate, mantener los propulsores por encima del 50% de su capacidad consumirá energía, aunque es una cantidad insignificante, puede marcar la diferencia.";
    let text11 = "Por el momento, los enemigos no se mueven ni atacan; es cuestión de tiempo que aprendan a hacerlo.";
    let text12 = "Para ganar, debes llegar al otro extremo de la galaxia, a la estrella Denebari.";
    let text13 = "Cada cierto tiempo se produce un escaneo Cyclon. Debes saltar antes de que esto ocurra para evitar ser detectado.";
    

    var entry00 = new Entry(text00, null, true, "admiral");
    var entry01 = new Entry(text01, null, true, "admiral");
    var entry02 = new Entry(text02, null, true, "admiral");
    var entry03 = new Entry(text03, null, true, "admiral");
    var entry04 = new Entry(text04, null, true, "admiral");
    var entry05 = new Entry(text05, null, true, "admiral");
    var entry06 = new Entry(text06, null, true, "admiral");
    var entry07 = new Entry(text07, null, true, "admiral");
    var entry08 = new Entry(text08, null, true, "admiral");
    var entry09 = new Entry(text09, null, true, "admiral");
    var entry10 = new Entry(text10, null, true, "admiral");
    var entry11 = new Entry(text11, null, true, "admiral");
    var entry12 = new Entry(text12, null, true, "admiral");
    var entry13 = new Entry(text13, null, true, "admiral");

    var dialog = new Dialog(
        [entry00, entry01, entry02, entry03, entry04, entry05, entry06, entry07, entry08, entry09, entry10, entry11, entry12, entry13]
    );

    dialog.setEndAction(function () {
        showInterface();
        setBackground("galaxy");
        configureDefaultValues();
        startClock();
        populateStarMap();
        openSystemMap();
        playBackgroundMusic();
    });
    dialog.trigger();
}


function endgame() {
    let text00 = "Algo ha ido mal... Parece que termina aquí la historia.";
    let text01 = "No te ha ido nada mal, has conseguido "+totalResources+" unidades de recursos, has invertido "+totalResourceInvested+" en mejoras para la nave, has ganado "+totalWinBattles+" batallas, has realizado "+totalJumps+" saltos y has enviado "+totalExpeditions+" expediciones.";
    

    var entry00 = new Entry(text00, null, false, "admiral");
    var entry01 = new Entry(text01, null, false, "admiral");

    var dialog = new Dialog(
        [entry00, entry01]
    );

    dialog.setEndAction(function () {
        location.reload(true);
    });
    dialog.trigger();
}