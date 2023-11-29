function hideInterface() {
    var controlBar = document.getElementsByClassName("control-bar-input-group")[0];
    var meterBar = document.getElementsByClassName("control-bar-meter-group")[0];

    controlBar.style.right = "-100%"
    meterBar.style.left = "-100%"
}
function showInterface() {
    var controlBar = document.getElementsByClassName("control-bar-input-group")[0];
    var navBar = document.getElementsByClassName("nav-bar-input-group")[0];
    var meterBar = document.getElementsByClassName("control-bar-meter-group")[0];

    controlBar.style.right = "0px"
    navBar.style.left = "0px"
    meterBar.style.left = "15px"
}
function startVibrate() {
    var controlBar = document.getElementsByClassName("control-bar-input-group")[0];
    var meterBar = document.getElementsByClassName("control-bar-meter-group")[0];
    var navBar = document.getElementsByClassName("nav-bar-input-group")[0];

    meterBar.style.bottom = "30px";
    controlBar.classList.add("vibrating");
    navBar.classList.add("vibrating");
    setTimeout(function () {
        meterBar.classList.add("vibrating");
    }, 500);

}

function stopVibrate() {
    var controlBar = document.getElementsByClassName("control-bar-input-group")[0];
    var meterBar = document.getElementsByClassName("control-bar-meter-group")[0];
    var navBar = document.getElementsByClassName("nav-bar-input-group")[0];

    controlBar.classList.remove("vibrating");
    navBar.classList.remove("vibrating");
    meterBar.style.bottom = "";
    meterBar.classList.remove("vibrating");
}

function updateResources() {
    let feMeter = document.getElementsByClassName("control-bar-resources-resource-fe")[0];
    let alMeter = document.getElementsByClassName("control-bar-resources-resource-al")[0];
    let siMeter = document.getElementsByClassName("control-bar-resources-resource-si")[0];
    let graphenMeter = document.getElementsByClassName("control-bar-resources-resource-graphen")[0];
    let scrapMeter = document.getElementsByClassName("control-bar-resources-resource-scrap")[0];

    feMeter.getElementsByClassName("control-bar-resources-resource-amount")[0].innerText = getFeResource();
    alMeter.getElementsByClassName("control-bar-resources-resource-amount")[0].innerText = getAlResource();
    siMeter.getElementsByClassName("control-bar-resources-resource-amount")[0].innerText = getSiResource();
    graphenMeter.getElementsByClassName("control-bar-resources-resource-amount")[0].innerText = getGraphenResource();
    scrapMeter.getElementsByClassName("control-bar-resources-resource-amount")[0].innerText = getScrapResource();
}

function updateInterfaces() {
    var missileMeter = document.getElementById("ammunition-meter");
    var countMissilesElement = document.getElementById("count-missiles");
    var survivorMeter = controls.getElementById("survivor-meter");
    var hullMeter = controls.getElementById("damage-meter");
    var warpEngineOverheatingMeter = controls.getElementById("jump-progress");
    var warpCoolerLevelNumber = document.getElementById("warp-cooler-level-number");

    var shootButton = document.getElementById("shoot-button");

    var energyMeter0 = controls.getElementById("energy-meter");
    var energyMeter1 = controls.getElementById("energy-meter1");
    var energyMeter2 = controls.getElementById("energy-meter2");
    var energyMeter3 = controls.getElementById("energy-meter3");

    var weapon1 = document.getElementById("weapon1");
    var weapon2 = document.getElementById("weapon2");


    var energyLevelNumber = document.getElementById("energy-level-number");
    var hullLevelNumber = document.getElementById("hull-level-number");
    var survivorsLevelNumber = document.getElementById("survivors-level-number");

    if (laserShoots > 4) {
        shootButton.disabled = true;
    } else {
        shootButton.disabled = false;
    }

    energyLevelNumber.innerText = Math.floor(getEnergy());
    hullLevelNumber.innerText = getHull();
    survivorsLevelNumber.innerText = getSurvivors();

    missileMeter.value = getMissiles();
    if (missileMeter.value < 1) {

        weapon1.checked = true;
        weapon2.disabled = true;
    } else {
        weapon2.disabled = false;
    }
    countMissilesElement.innerText = getMissiles();
    survivorMeter.setValue(getSurvivors());
    if (getSurvivors() > 50)
        document.documentElement.style.setProperty('--survivor-meter-value-background', 'green');
    else if (getSurvivors() > 25)
        document.documentElement.style.setProperty('--survivor-meter-value-background', 'yellow');
    else
        document.documentElement.style.setProperty('--survivor-meter-value-background', 'red');


    hullMeter.setValue(getHull());
    if (getHull() > 50)
        document.documentElement.style.setProperty('--damage-meter-value-background', 'green');
    else if (getHull() > 25)
        document.documentElement.style.setProperty('--damage-meter-value-background', 'yellow');
    else
        document.documentElement.style.setProperty('--damage-meter-value-background', 'red');

    warpEngineOverheatingMeter.setValue(warpEngineOverheating);
    warpCoolerLevelNumber.innerText = getWarpCooler();
    if (getEnergy() > 50)
        document.documentElement.style.setProperty('--overheat-progress-value-background', 'green');
    else if (getEnergy() > 25)
        document.documentElement.style.setProperty('--overheat-progress-value-background', 'yellow');
    else
        document.documentElement.style.setProperty('--overheat-progress-value-background', 'red');

    energyMeter0.setValue(getEnergy());
    if (getEnergy() > 50)
        document.documentElement.style.setProperty('--energy-meter-value-background', 'green');
    else if (getEnergy() > 25)
        document.documentElement.style.setProperty('--energy-meter-value-background', 'yellow');
    else
        document.documentElement.style.setProperty('--energy-meter-value-background', 'red');

    energyMeter1.setValue(getEnergy());
    energyMeter2.setValue(getEnergy());
    energyMeter3.setValue(getEnergy());


    updateResources();
    updateCountdown();
}
function updateCountdown() {
    var countdownElement = document.getElementById('countdown');
    if (countdown == undefined)
        countdown = Math.floor(Math.random() * 60) + 120 * getCountdownMultiplier();

    if (countdown>0 && countdown % 30 == 0) {
        showDangerScreen(0);
    }else if(countdown>0 && countdown == 10){
        showDangerScreen(1);
    }
    
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    countdownElement.value = formattedTime;

}
function openBattlePanel() {
    let enemyShields = Math.floor(Math.random() * 40 + 40);
    let enemyHull = Math.floor(Math.random() * 100 + 200);

    enemyShip = new EnemyShip(enemyShields, enemyHull, 10);
    closeGalaxyMap();
    closeSystemMap();
    var battlePanel = document.getElementsByClassName("battle-panel")[0];
    battlePanel.style.display = "block";

    setInitialShields();
    setTimeout(enemyShip.start(), 2000);
}
function closeBattlePanel() {
    var battlePanel = document.getElementsByClassName("battle-panel")[0];
    battlePanel.style.display = "none";
}
function openWorkshop() {
    closeAllPlanetCards();
    closeAllStarCards();
    if (!workshop)
        workshop = new Workshop();
    workshop.paintUpgrades();
    var battlePanel = document.getElementsByClassName("workshop-panel")[0];
    battlePanel.style.display = "flex";
}
function closeWorkshop() {
    var battlePanel = document.getElementsByClassName("workshop-panel")[0];
    battlePanel.style.display = "none";
}
function gameOver() {
    alert("Has perdido");
}
function showDangerScreen(level) {
    let time=1500;
    const dangerScreen = document.createElement('div');
    if (level == 0)
        dangerScreen.classList.add("warn-screen");
    else
    {
        dangerScreen.classList.add("critical-screen");
        time=10000;
    }
    document.body.appendChild(dangerScreen);
    setTimeout(() => {
        dangerScreen.remove();
    }, time);
}