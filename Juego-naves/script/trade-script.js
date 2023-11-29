
var stock = [];
var shipPosition;
var action = "asc";//Dirección en la que va a aparecer la nave en el carrousel

class Ship {
    constructor(model, weapons, shields, warpEngine, miningTools, price, img, description) {
        this.model = model;
        this.weapons = weapons;
        this.shields = shields;
        this.warpEngine = warpEngine;
        this.miningTools = miningTools;
        this.price = price;
        this.img = img;
        this.description = description;
    }

}
function openShipShop() {
    deleteCurrentShopShip();
    const shipShop = document.getElementsByClassName('ship-shop')[0];
    shipShop.style.display = "flex";
    shipPosition = 0;
    setShipShopNavButtons();
    showShipInShop();
}
function closeShipShop() {
    const shipShop = document.getElementsByClassName('ship-shop')[0];
    shipShop.style.opacity = "0";

    setTimeout(function () {
        shipShop.style.display = "none";
        shipShop.style.opacity = "1";
        deleteCurrentShopShip();
    }, 1000);

}
function setShipShopNavButtons() {
    const nextButton = document.getElementsByClassName('ship-shop-next-button')[0];
    const prevButton = document.getElementsByClassName('ship-shop-prev-button')[0];


    if (shipPosition < 1) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }
    if (shipPosition < stock.length - 1) {
        nextButton.style.display = "block";
    } else {
        nextButton.style.display = "none";
    }
}

function showShipInShop() {
    var ship = stock[shipPosition];

    const shipModelText = document.getElementById('ship-shop-model-text');
    const shipWeaponsMeter = document.getElementById('ship-shop-weapons-meter');
    const shipShieldsMeter = document.getElementById('ship-shop-shields-meter');
    const shipWarpEngineMeter = document.getElementById('ship-shop-warp-engine-meter');
    const shipMiningToolsMeter = document.getElementById('ship-shop-mining-tools-meter');
    const shipPriceText = document.getElementById('ship-shop-price-text');
    const shipDescription = document.getElementById('ship-shop-ship-description');



    shipModelText.textContent = ship.model;
    shipWeaponsMeter.value = ship.weapons;
    shipShieldsMeter.value = ship.shields;
    shipWarpEngineMeter.value = ship.warpEngine;
    shipMiningToolsMeter.value = ship.miningTools;
    shipPriceText.textContent = ship.price + ' $';
    shipDescription.textContent = ship.description;
    checkinNewShip(ship);
}
function deleteCurrentShopShip() {
    let ship = document.getElementById("ship-in-carrousel");
    if (ship)
        ship.remove();
}
function checkoutActualShip() {
    var ship = document.getElementById('ship-in-carrousel');
    if (ship.classList.contains('ship-in-carrousel-checkin'))
        ship.classList.remove('ship-in-carrousel-checkin');
    if (ship.classList.contains('ship-in-carrousel-checkin-reverse'))
        ship.classList.remove('ship-in-carrousel-checkin-reverse');
    if (action == "asc")
        ship.classList.add('ship-in-carrousel-checkout');
    else if (action == "des")
        ship.classList.add('ship-in-carrousel-checkout-reverse');


    setTimeout(function () {
        if (ship && ship.parentNode) {
            ship.parentNode.removeChild(ship);
        }
    }, 2000);
}
function checkinNewShip() {
    var ship = stock[shipPosition];
    const carrousel = document.getElementsByClassName("ship-carrousel")[0];
    const shipInCarrouselDiv = document.createElement('div');
    shipInCarrouselDiv.id = "ship-in-carrousel";
    shipInCarrouselDiv.style.backgroundImage = `url(./assets/img/spaceships/${ship.img})`;
    if (action == "asc")
        shipInCarrouselDiv.classList.add('ship-in-carrousel');
    else if (action == "des")
        shipInCarrouselDiv.classList.add('ship-in-carrousel-reverse');
    carrousel.appendChild(shipInCarrouselDiv);
    if (action == "asc")
        shipInCarrouselDiv.classList.add('ship-in-carrousel-checkin');
    else if (action == "des")
        shipInCarrouselDiv.classList.add('ship-in-carrousel-checkin-reverse');
}

function nextShip() {

    const nextButton = document.getElementsByClassName('ship-shop-next-button')[0];
    const prevButton = document.getElementsByClassName('ship-shop-prev-button')[0];

    prevButton.style.display = "none";
    nextButton.style.display = "none";

    shipPosition++;
    action = "asc";
    checkoutActualShip();
    setTimeout(playShipOut, 500);
    setTimeout(playShipIn, 2000);
    setTimeout(showShipInShop, 2000);
    setTimeout(setShipShopNavButtons, 2100);
}
function prevShip() {

    const nextButton = document.getElementsByClassName('ship-shop-next-button')[0];
    const prevButton = document.getElementsByClassName('ship-shop-prev-button')[0];

    prevButton.style.display = "none";
    nextButton.style.display = "none";

    shipPosition--;
    action = "des";
    checkoutActualShip();
    setTimeout(playShipOut, 500);
    setTimeout(playShipIn, 2000);
    setTimeout(showShipInShop, 2000);
    setTimeout(setShipShopNavButtons, 2100);
}
function createStock() {
    const descriptions = [
        "Una nave compacta y ágil, ideal para la exploración en sistemas estelares cercanos. Destaca por su velocidad y maniobrabilidad.",
        "Esta nave resistente está diseñada para soportar las condiciones más extremas del espacio. Sus potentes escudos y sistema de defensa la hacen perfecta para misiones peligrosas.",
        "Una nave versátil que combina tecnología de punta y capacidad de carga. Perfecta para el transporte de carga o para llevar a cabo investigaciones científicas en el espacio.",
        "Con su diseño elegante y avanzada tecnología de warp, esta nave es ideal para viajes intergalácticos de largo alcance. Ofrece una experiencia cómoda y rápida en tus exploraciones.",
        "Una nave especializada en la minería de asteroides y recursos espaciales. Equipada con herramientas de alta precisión, es la elección perfecta para aquellos interesados en la extracción de minerales.",
        "Esta nave espacial de combate es letal en el campo de batalla. Su arsenal de armas avanzadas y su diseño aerodinámico la hacen temible para los enemigos."
    ];

    for (let i = 1; i <= 6; i++) {
        const model = `Nave ${i}`;
        const weapons = Math.floor(Math.random() * 100); // Valores aleatorios para armas, escudos, etc.
        const shields = Math.floor(Math.random() * 100);
        const warpEngine = Math.floor(Math.random() * 100);
        const miningTools = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 10000) + 1000; // Precio aleatorio entre 1000 y 10999
        const img = `ship-0${i}.png`; // Nombre de la imagen basado en el índice
        const description = descriptions[i]

        const ship = new Ship(model, weapons, shields, warpEngine, miningTools, price, img, description);
        stock.push(ship);
    }

}
function buyShipInShop(){
    closeShipShop();
    showScene("airlock",3500)
    setTimeout(showInterface,4500);
    setTimeout(greetingDialog,5500);
}

function pruebaTienda() {
    createStock();
    openShipShop();
}