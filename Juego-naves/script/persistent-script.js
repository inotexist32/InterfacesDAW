var shipName;
var shipGender;
var playerName;
var playerTitle;
var playerRole;

var survivors = 90;
var energy = 90;
var hull = 90;
var shields = 100;

var missiles = 10;
var laserDamage = 15;

var thrusterSpeed = 0;
var warpEngineOverheating = 100;
var countdown;
var countdownMultiplier = 1.0;
var energyMultiplier = 1.0;

var warpCooler = 0;
var starPosition = "a";

var natalityIndex = 0;

//#region score
var totalResources=0;
var totalResourceInvested=0;
var totalWinBattles=0;
var totalJumps=0;
var totalExpeditions=0;
//#endregion

function getLaserDamage() {
    return laserDamage;
}
function setLaserDamage(value) {
    laserDamage = value;
}

function setNatalityIndex(value) {
    natalityIndex = value;
}
function getNatalityIndex() {
    return natalityIndex;
}

function setEnergyMultiplier(value) {
    energyMultiplier = value;
}
function getEnergyMultiplier() {
    return energyMultiplier;
}

//#region ship
function setShipName(name, gender) {
    shipName = name;
    shipGender = gender;
}
function setPlayerName(name, title) {
    playerName = name;
    playerTitle = title;
}
function getFullPlayerName() {
    return playerTitle + " " + playerName;
}
function getPlayerName() {
    return playerName;
}
function getFullShipNameOf() {
    var text;
    if (shipName)
        if (shipGender == "la") {
            text = "de la " + shipName;
        }
        else
            text = "del " + shipName;
    return text;
}
function getFullShipName() {
    var text;
    if (shipName)
        if (shipGender == "la") {
            text += "la " + shipName;
        }
        else
            text += "el " + getShipName();
    return text;
}
function getShipName() {
    return shipName;
}
function setPlayerRol(rol) {
    playerRole = rol;
}

//#endregion

//#region resources

var feResource = 200;
var alResource = 200;
var siResource = 100;
var graphenResource = 50;
var scrapResource = 100;

function getFeResource() {
    return feResource;
}

function setFeResource(value) {
    feResource = value;
}

function getAlResource() {
    return alResource;
}

function setAlResource(value) {
    alResource = value;
}

function getSiResource() {
    return siResource;
}

function setSiResource(value) {
    siResource = value;
}

function getGraphenResource() {
    return graphenResource;
}

function setGraphenResource(value) {
    graphenResource = value;
}

function getScrapResource() {
    return scrapResource;
}

function setScrapResource(value) {
    scrapResource = value;
}
//#endregion

var workshop;

//#region cookies
/*
function getWarpCooler() {
    return warpCooler;
}

function setWarpCooler(value) {
    warpCooler = parseInt(value);
}

function getSurvivors() {
    return getCookieOrDefaultValue("survivors", 90);
}

function setSurvivors(value) {
    document.cookie = "survivors=" + value;
}

function getEnergy() {
    return getCookieOrDefaultValue("energy", 90);
}

function setEnergy(value) {
    document.cookie = "energy=" + value;
}

function getHull() {
    return getCookieOrDefaultValue("hull", 90);
}

function setHull(value) {
    document.cookie = "hull=" + value;
}

function getMissiles() {
    return getCookieOrDefaultValue("missiles", 10);
}

function setMissiles(value) {
    document.cookie = "missiles=" + value;
}
*/
//#endregion

function getWarpCooler() {
    return warpCooler;
}

function setWarpCooler(value) {
    warpCooler = parseInt(value);
}

function getSurvivors() {
    return survivors;
}

function setSurvivors(value) {
    survivors = value;
}

function getEnergy() {
    return energy;
}

function setEnergy(value) {
    energy = value;
}
function substractEnergy(value) {
    value *= (2 - getEnergyMultiplier());
    let newValue = getEnergy() - value;
    if (newValue < 0)
        newValue = 0;
    setEnergy(getEnergy(newValue) - value);
}
function addEnergy(value) {
    value *= (1 + getEnergyMultiplier());
    let newValue = getEnergy() + value;
    if (newValue > 100)
        newValue = 100;
    setEnergy(newValue);

}
function getHull() {
    return hull;
}

function setHull(value) {
    hull = value;
}

function getMissiles() {
    return missiles;
}

function setMissiles(value) {
    missiles = value;
}

function getShields() {
    return shields;
}

function setShields(value) {
    shields = value;
}

function getThrusterSpeed() {
    return thrusterSpeed;
}

function setThrusterSpeed(value) {
    var speedSlider = document.getElementById("speed-slider");
    thrusterSpeed = value;
    speedSlider.value = thrusterSpeed;

    let mainShip = document.getElementsByClassName("battle-panel-main-ship")[0];
    let thrusterFire = mainShip.getElementsByClassName("thruster-fire")[0];
    thrusterFire.style.height = value / 10 + "px";
}
function getCountdownMultiplier() {
    return countdownMultiplier;
}
function setCountdownMultiplier(value) {
    countdownMultiplier = value;
}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}
function setCookieWithDefault(cookieName, defaultValue) {
    const existingValue = getCookie(cookieName);
    if (existingValue === null) {
        document.cookie = cookieName + "=" + defaultValue;
    }
}
function getCookieOrDefaultValue(cookieName, defaultValue) {
    const cookieValue = getCookie(cookieName);
    return cookieValue !== null ? parseInt(cookieValue) : defaultValue;
}

function configureDefaultValues() {
    setCookieWithDefault("survivors", 90);
    setCookieWithDefault("energy", 90);
    setCookieWithDefault("hull", 90);
    setCookieWithDefault("missiles", 10);
}
function clearCookies() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookieName = cookies[i].split("=")[0];
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    alert("Cookies borradas");
}

function testResources() {
    setSiResource(5000);
    setFeResource(5000);
    setAlResource(5000);
    setGraphenResource(5000);
}