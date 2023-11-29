class Star {
    constructor(name, type, size, position, starsToJump = []) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.planets = this.generatePlanets();
        this.starsToJump = starsToJump;
        this.position = position;
    }
    getTypeDescription() {
        switch (this.type) {
            case 1:
                return "Tipo G";
            case 2:
                return "Tipo A";
            case 3:
                return "Tipo K";
            case 4:
                return "Tipo M";
            default:
                return "Desconocido";
        }
    }
    getPopulation() {
        let totalPopulation = 0;
        for (const planet of this.planets) {
            totalPopulation += planet.population;
        }
        return totalPopulation;
    }
    getName() {
        return this.name;
    }
    // Función para obtener la clase de posición (star-position-X)
    getPositionClass() {
        return `star-position-${this.position}`;
    }

    // Función para obtener la clase de tipo (star-XX)
    getTypeClass() {
        return `star-${this.type.toString().padStart(2, '0')}`;
    }

    // Función para obtener la clase de tamaño (star-X)
    getSizeClass() {
        return `star-${this.size}`;
    }

    // Función para obtener la clase completa de la estrella
    getStarClass() {
        return `star ${this.getPositionClass()} ${this.getTypeClass()} ${this.getSizeClass()}`;
    }

    getStarElement() {
        const positionClass = this.getPositionClass();
        const starElement = document.querySelector(`.${positionClass}`);
        return starElement;
    }
    generateRandomPlanet() {
        const planetSizes = ["s", "m", "l"];
        const planetTypes = ["01", "02", "03", "04", "05", "06", "07"];
        const resources = ["Fe", "Al", "Si", "U", "Grafeno"];

        const randomType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
        const randomSize = planetSizes[Math.floor(Math.random() * planetSizes.length)];

        const numberOfResources = Math.floor(Math.random() * 2) + 1;
        const randomResources = [];

        for (let i = 0; i < numberOfResources; i++) {
            const randomResource = resources[Math.floor(Math.random() * resources.length)];
            if (!randomResources.includes(randomResource)) {
                randomResources.push(randomResource);//Evitar duplicados
            }
        }

        const randomTemperature = Math.floor(Math.random() * (200 - (-200) + 1)) + (-200);
        const randomRisk = Math.random();
        return new Planet(`Planet-${randomType}-${randomSize}`, this, randomType, randomSize, "", 0, randomResources, randomTemperature, randomRisk);
    }

    generatePlanets() {
        const numberOfPlanets = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
        const planets = [];
        const positions = ["a", "b", "c", "d", "e", "f", "g"];
        for (let i = 0; i < numberOfPlanets; i++) {
            const planet = this.generateRandomPlanet();
            planet.position = positions[i];
            planets.push(planet);
        }

        return planets;
    }
    paintPlanets() {
        let starSystemMap = document.getElementsByClassName("star-system-map")[0];
        starSystemMap.innerHTML = "";
        this.planets.forEach(planet => {
            starSystemMap.appendChild(planet.getNode());
        });
        if (GalaxyMap.starman) {
            let starman = document.createElement("div");
            starman.classList.add("starman");
            starSystemMap.appendChild(starman);
        }
    }
}
class Planet {
    constructor(name, star, type, size, position, population, resources, temperature, riskLevel) {
        this.name = name;
        this.star = star;
        this.type = type;
        this.size = size;
        this.position = position;
        this.population = population;
        this.resources = resources;
        this.temperature = temperature;
        this.riskLevel = riskLevel;
    }
    getNode() {
        const planetDiv = document.createElement("div");
        planetDiv.classList.add("planet", `planet-position-${this.position}`, `planet-${this.type.toLowerCase()}`, `planet-${this.size.toLowerCase()}`);
        planetDiv.onclick = this.showPlanetDetails.bind(this);
        return planetDiv;
    }
    getPlanetElement() {
        return document.querySelector(`div.planet.planet-position-${this.position}`);
    }
    showPlanetDetails() {
        const planetCardBox = document.querySelectorAll('.planet-card-box')[0];
        var open = true;
        if (planetCardBox) {
            const planetNameElement = planetCardBox.querySelector('.title-box-text');
            const cardPlanetName = planetNameElement.innerText;
            open = cardPlanetName != this.name;
            planetCardBox.remove();
        }
        if (open) {
            this.createPlanetCard();
        }
    }

    createPlanetCard() {
        const planetCard = new DigiPanel();
        planetCard.title = this.name;
        planetCard.closeAction = "document.getElementsByClassName('planet-card-box')[0].remove()";
        planetCard.fillNode();
        const planetCardDescription = document.createElement("div");
        planetCardDescription.classList.add("planet-card-description");
        planetCardDescription.innerHTML = `
        <div class="planet-card-type">Temperatura: ${this.temperature}</div>
        <div class="planet-card-pop">Población: ${this.population}</div>
        <div class="planet-card-planets">Recursos: ${this.resources}</div>
        <div class="planet-card-planets">Riesgo calculado: ${Math.floor(this.riskLevel * 100)}%</div>
    `;

        let expeditionButton = document.createElement("div");
        expeditionButton.classList.add("go-to-button");
        expeditionButton.innerText = "Enviar expedición";
        expeditionButton.onclick = this.sendExpedition.bind(this);
        planetCardDescription.appendChild(expeditionButton);

        const planetPosition = this.getPlanetElement().getBoundingClientRect();

        planetCard.digiPanelNode.style.position = 'absolute';
        planetCard.digiPanelNode.style.left = `${planetPosition.x + 100}px`;
        planetCard.digiPanelNode.style.top = `${planetPosition.y + 100}px`;
        planetCard.digiPanelNode.classList.add("planet-card-box");

        planetCard.digiPanelNode.appendChild(planetCardDescription);
        // Agregar el árbol de nodos al documento HTML
        const parentNode = document.getElementsByClassName("star-system-map")[0];
        parentNode.appendChild(planetCard.digiPanelNode);
    }
    /*
    createPlanetCard() {
        const planetCardBox = document.createElement("div");
        planetCardBox.classList.add("planet-card-box");

        const titleBox = document.createElement("div");
        titleBox.classList.add("title-box", "title-box-big-screen");
        titleBox.innerHTML = `
        <div class="title-box-piece title-box-piece-left"></div>
        <div class="title-box-piece title-box-piece-center-left"></div>
        <div class="title-box-piece title-box-piece-center-right"></div>
        <div class="title-box-piece title-box-piece-right"></div>
        <p class="title-box-text">${this.name}</p>
    `;

        const panelBars = document.createElement("div");
        panelBars.classList.add("panel-bars");

        const panelCorners = ["tl", "tr", "bl", "br"];
        panelCorners.forEach(corner => {
            const panelCorner = document.createElement("div");
            panelCorner.classList.add("panel-corner", `panel-corner-${corner}`);
            planetCardBox.appendChild(panelCorner);
        });

        const panelFrameBars = ["top-left", "top-right", "bottom-left", "bottom-right", "left-bottom", "left-top", "right-bottom", "right-top"];
        panelFrameBars.forEach(bar => {
            const panelFrameBar = document.createElement("div");
            panelFrameBar.classList.add("panel-frame-bar", `panel-frame-bar-${bar}`);
            planetCardBox.appendChild(panelFrameBar);
        });

        const planetCardContainer = document.createElement("div");
        planetCardContainer.classList.add("planet-card-container");

        const planetCardImage = document.createElement("div");
        planetCardImage.classList.add("planet-card-image");

        const planetCardDescription = document.createElement("div");
        planetCardDescription.classList.add("planet-card-description");
        planetCardDescription.innerHTML = `
        <div class="planet-card-type">Temperatura: ${this.temperature}</div>
        <div class="planet-card-pop">Población: ${this.population}</div>
        <div class="planet-card-planets">Recursos: ${this.resources}</div>
        <div class="planet-card-planets">Riesgo calculado: ${Math.floor(this.riskLevel * 100)}%</div>
    `;

        if (!this.explored) {
            let expeditionButton = document.createElement("div");
            expeditionButton.innerText = "Enviar expedición";
            expeditionButton.onclick = this.sendExpedition.bind(this);
            planetCardDescription.appendChild(expeditionButton);
        }
        planetCardContainer.appendChild(planetCardDescription);
        planetCardBox.appendChild(titleBox);
        planetCardBox.appendChild(panelBars);
        planetCardBox.appendChild(planetCardContainer);

        const planetPosition = this.getPlanetElement().getBoundingClientRect();
        planetCardBox.style.position = 'absolute';
        planetCardBox.style.left = `${planetPosition.x + 100}px`;
        planetCardBox.style.top = `${planetPosition.y + 100}px`;

        // Agregar el árbol de nodos al documento HTML
        const parentNode = document.getElementsByClassName("star-system-map")[0];
        parentNode.appendChild(planetCardBox);
    }*/
    sendExpedition() {
        totalExpeditions++;
        this.showPlanetDetails();
        let dice = Math.random();
        let risk = this.riskLevel;
        let otherOption = ((1.0 - risk) - 0.1) / (1 + this.resources.length)//resto de probabilidad = 2 (nada o chatarra) + recursos del planeta
        if (dice <= risk) {
            lootPlanetAccident(Math.floor(Math.random() * 16), this.temperature);
            return;
        } else {
            for (let i = 0; i < this.resources.length; i++) {
                risk += otherOption;
                if (dice < risk) {
                    lootResource(this.resources[i], Math.floor(Math.random() * 300));
                    return;
                }
            }
            risk += otherOption;
            if (dice < risk) {
                lootPlanetScrap(Math.floor(Math.random() * 100));
                return;
            } else {
                lootPlanetEmpty();
                return;
            }
        }
    }
}
class GalaxyMap {
    starman = false;
    starArray = []
    // Método estático para llenar el nodo padre con estrellas
    static populateMap(stars) {
        if (!stars)
            stars = GalaxyMap.starArray;
        const parentNode = document.getElementsByClassName("galaxy-map")[0];
        parentNode.innerHTML = "";
        if (Array.isArray(stars) && parentNode instanceof Element) {
            stars.forEach(star => {
                const starNode = document.createElement("div");
                starNode.classList.add("star", star.getPositionClass(), star.getTypeClass(), star.getSizeClass());
                starNode.addEventListener("click", () => {
                    GalaxyMap.showStarDetails(star.getName());
                });
                if (star.position == starPosition) {
                    let mainPosition = document.createElement("div");
                    mainPosition.classList.add("star-main-position");
                    starNode.appendChild(mainPosition);
                    starNode.classList.add("star-main");
                }
                parentNode.appendChild(starNode);
            });
        }
    }


    static showStarDetails(starName) {
        const starCardBox = document.querySelectorAll('.star-card-box')[0];
        var open = true;
        if (starCardBox) {
            const starNameElement = starCardBox.querySelector('.title-box-text');
            const cardStarName = starNameElement.innerText;
            open = cardStarName != starName;
            starCardBox.remove();
        }

        const star = GalaxyMap.starArray.find(star => star.name === starName);
        const mainStar = GalaxyMap.starArray.find(star => star.position == starPosition);

        if (mainStar.starsToJump.includes(star.position))
            star.canJump = true;
        if (star && open) {
            GalaxyMap.createStarCard(star);
        }
    }
    /*
        static createStarCard(star) {
            const starCardBox = document.createElement("div");
            starCardBox.classList.add("star-card-box");
    
            const titleBox = document.createElement("div");
            titleBox.classList.add("title-box", "title-box-big-screen");
            titleBox.innerHTML = `
            <div class="title-box-piece title-box-piece-left"></div>
            <div class="title-box-piece title-box-piece-center-left"></div>
            <div class="title-box-piece title-box-piece-center-right"></div>
            <div class="title-box-piece title-box-piece-right"></div>
            <p class="title-box-text">${star.name}</p>
        `;
    
            const panelBars = document.createElement("div");
            panelBars.classList.add("panel-bars");
    
            const panelCorners = ["tl", "tr", "bl", "br"];
            panelCorners.forEach(corner => {
                const panelCorner = document.createElement("div");
                panelCorner.classList.add("panel-corner", `panel-corner-${corner}`);
                starCardBox.appendChild(panelCorner);
            });
    
            const panelFrameBars = ["top-left", "top-right", "bottom-left", "bottom-right", "left-bottom", "left-top", "right-bottom", "right-top"];
            panelFrameBars.forEach(bar => {
                const panelFrameBar = document.createElement("div");
                panelFrameBar.classList.add("panel-frame-bar", `panel-frame-bar-${bar}`);
                starCardBox.appendChild(panelFrameBar);
            });
    
            const starCardContainer = document.createElement("div");
            starCardContainer.classList.add("star-card-container");
    
            const starCardImage = document.createElement("div");
            starCardImage.classList.add("star-card-image");
    
            const starCardDescription = document.createElement("div");
            starCardDescription.classList.add("star-card-description");
            starCardDescription.innerHTML = `
            <div class="star-card-type">Tipo: ${star.getTypeDescription()}</div>
            <div class="star-card-pop">Población: ${star.getPopulation()}</div>
            <div class="star-card-planets">Planetas: ${star.planets.length}</div>
        `;
    
            if (star.canJump) {
                let jumpButton = document.createElement("div");
                jumpButton.innerText = "Saltar";
                jumpButton.setAttribute("onclick", "jumpTo('" + star.position + "')");
                jumpButton.style.color = ""
                starCardDescription.appendChild(jumpButton);
            }
            starCardContainer.appendChild(starCardImage);
            starCardContainer.appendChild(starCardDescription);
            starCardBox.appendChild(titleBox);
            starCardBox.appendChild(panelBars);
            starCardBox.appendChild(starCardContainer);
    
            const starPosition = star.getStarElement().getBoundingClientRect();
            starCardBox.style.position = 'absolute';
            starCardBox.style.left = `${starPosition.x + 20}px`;
            starCardBox.style.top = `${starPosition.y + 20}px`;
    
            // Agregar el árbol de nodos al documento HTML
            const parentNode = document.getElementsByClassName("galaxy-map")[0];
            parentNode.appendChild(starCardBox);
        }
        static getStarByPosition(position) {
            return GalaxyMap.starArray.find(star => star.position === position);
        }
    }
    */
    static createStarCard(star) {
        const starCardBox = new DigiPanel();
        starCardBox.title = this.name;
        starCardBox.closeAction = "document.getElementsByClassName('star-card-box')[0].remove()";
        starCardBox.fillNode();
        starCardBox.digiPanelNode.classList.add("star-card-box");

        const starCardDescription = document.createElement("div");
        starCardDescription.classList.add("star-card-description");
        starCardDescription.innerHTML = `
    <div class="star-card-type">Tipo: ${star.getTypeDescription()}</div>
    <div class="star-card-pop">Población: ${star.getPopulation()}</div>
    <div class="star-card-planets">Planetas: ${star.planets.length}</div>
`;

        const starCardImage = document.createElement("div");
        starCardImage.classList.add("star-card-image");
        if (star.canJump) {
            let jumpButton = document.createElement("div");
            jumpButton.innerText = "Saltar";
            jumpButton.classList.add("go-to-button");
            jumpButton.setAttribute("onclick", "jumpTo('" + star.position + "')");
            jumpButton.style.color = ""
            starCardDescription.appendChild(jumpButton);
        }
        const starCardContainer = document.createElement("div");
        starCardContainer.classList.add("star-card-container");
        starCardContainer.appendChild(starCardImage);
        starCardContainer.appendChild(starCardDescription);
        starCardBox.digiPanelNode.appendChild(starCardContainer);

        const starPosition = star.getStarElement().getBoundingClientRect();
        starCardBox.digiPanelNode.style.position = 'absolute';
        starCardBox.digiPanelNode.style.left = `${starPosition.x + 20}px`;
        starCardBox.digiPanelNode.style.top = `${starPosition.y + 20}px`;

        // Agregar el árbol de nodos al documento HTML
        const parentNode = document.getElementsByClassName("galaxy-map")[0];
        parentNode.appendChild(starCardBox.digiPanelNode);
    }
    static getStarByPosition(position) {
        return GalaxyMap.starArray.find(star => star.position === position);
    }
}
function populateStarMap() {
    GalaxyMap.starArray = [
        new Star("Proxima Nova", 1, "s", "a", ["b"]),
        new Star("Sirianis", 2, "s", "b", ["a", "c", "l"]),
        new Star("Alpha Centuria", 2, "l", "c", ["b", "l", "d"]),
        new Star("Betelaris", 2, "m", "d", ["c", "l", "e", "g", "f"]),
        new Star("Vegara", 1, "m", "e", ["l", "d", "g"]),
        new Star("Antarion", 4, "m", "f", ["d", "g", "h"]),
        new Star("Pollus", 2, "m", "g", ["e", "d", "f", "h"]),
        new Star("Altara", 1, "m", "h", ["g", "f", "i"]),
        new Star("Capellus", 1, "m", "i", ["h", "j"]),
        new Star("Rigelia", 4, "m", "j", ["i", "k"]),
        new Star("Denebari", 2, "m", "k", ["j"]),
        new Star("Aldebaron", 4, "m", "l", ["b", "c", "d", "e"])
    ];
    GalaxyMap.populateMap();
}
function cleanStarMap() {
    GalaxyMap.starArray = [];
    var galaxyMapElement = document.querySelector("div.galaxy-map");
    if (galaxyMapElement)
        while (galaxyMapElement.firstChild) {
            galaxyMapElement.removeChild(galaxyMapElement.firstChild);
        }
}

function openGalaxyMap() {
    if (document.getElementsByClassName("battle-panel")[0].style.display == "block") {
        cantScape();
        return;
    }
    closeSystemMap();
    setBackground("galaxy-map-background");
    var galaxyMap = document.querySelector("div.galaxy-map");
    if (galaxyMap.style.display != "block") {
        galaxyMap.style.display = "block";
        if (!GalaxyMap.starArray)
            populateStarMap();
    }
}
function closeGalaxyMap() {
    var galaxyMap = document.querySelector("div.galaxy-map");
    if (galaxyMap)
        galaxyMap.style.display = "none";
}
function openSystemMap() {
    if (document.getElementsByClassName("battle-panel")[0].style.display == "block") {
        cantScape();
        return;
    }
    closeGalaxyMap();
    setBackground("galaxy");
    var systemMap = document.getElementsByClassName("star-system-map")[0];
    let star = GalaxyMap.getStarByPosition(starPosition);
    star.paintPlanets();
    systemMap.style.display = "block";
}
function closeSystemMap() {
    var systemMap = document.getElementsByClassName("star-system-map")[0];
    if (systemMap)
        systemMap.style.display = "none";
}


//#region loot

function lootResource(resource, amount) {
    totalResources += amount;
    switch (resource.toLowerCase()) {
        case "fe":
            lootPlanetFe(amount);
            break;
        case "al":
            lootPlanetAl(amount);
            break;
        case "si":
            lootPlanetSl(amount);
            break;
        case "u":
            lootPlanetU(amount);
            break;
        case "grafeno":
            lootPlanetGra(amount);
            break;
    }
}
function lootPlanetFe(amount = 0) {
    let texts = [];
    texts.push("La expedición ha regresado con éxito de un planeta rico en hierro. Has obtenido " + amount + " unidades de este valioso metal, que podrás usar para fabricar nuevas piezas.");
    texts.push("Tu equipo ha explorado un mundo árido y rocoso, donde han encontrado grandes depósitos de hierro. Has ganado " + amount + " unidades de hierro, un recurso esencial para la supervivencia en el espacio.");
    texts.push("Has enviado una expedición a un planeta con un núcleo de hierro. A pesar de las dificultades, tu equipo ha logrado extraer " + amount + " unidades de hierro, que podrás emplear para mejorar tu nave.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");
    entry00

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        setFeResource(getFeResource() + amount);
        updateInterfaces();
        playGetItemSound();
    });

    dialog.trigger();
}
function lootPlanetAl(amount = 0) {
    let texts = [];
    texts.push("Tu expedición ha vuelto de un planeta con una corteza de aluminio. Has obtenido " + amount + " unidades de aluminio, un material ligero y resistente que te permitirá mejorar algunos componentes de tu nave.");
    texts.push("Has mandado una expedición a un planeta con una atmósfera rica en oxígeno, donde han encontrado abundante aluminio. Has ganado " + amount + " unidades de aluminio, un recurso muy útil fabricar mejoras.");
    texts.push("Tu equipo ha explorado un planeta con una superficie cubierta de aluminio. Has conseguido " + amount + " unidades de aluminio, que podrás usar para crear aleaciones metálicas o revestir tu nave.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        setAlResource(getAlResource() + amount);
        updateInterfaces();
        playGetItemSound();
    });

    dialog.trigger();
}
function lootPlanetSl(amount = 0) {
    let texts = [];
    texts.push("Tu expedición ha regresado de un planeta con una gran cantidad de silicio. Has obtenido " + amount + " unidades de silicio, un elemento clave para fabricar circuitos electrónicos o chips informáticos.");
    texts.push("Has enviado una expedición a un planeta con una geología variada, donde han encontrado diversos minerales que contienen silicio. Has ganado " + amount + " unidades de silicio, un recurso imprescindible para mejorar tu sistema de comunicación o navegación.");
    texts.push("Tu equipo ha explorado un planeta con una arena de silicio. Has conseguido " + amount + " unidades de silicio, que podrás emplear para generar energía solar o crear cristales.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        setSiResource(getSiResource() + amount);
        updateInterfaces();
        playGetItemSound();
    });

    dialog.trigger();
}
function lootPlanetU(amount = 0) {
    energyAmount = Math.floor(amount * 0.1);
    let texts = [];
    texts.push("Tu expedición ha vuelto de un planeta con una actividad nuclear, donde han encontrado uranio. Has obtenido " + amount + " unidades de uranio, un material muy peligroso pero también muy poderoso que te permitirá generar mucha energía. Has conseguido extraer " + energyAmount * getEnergyMultiplier() + " unidades de energía a partir del uranio, lo que aumentará tu capacidad de combate y exploración.");
    texts.push("Has mandado una expedición a un planeta con una historia antigua, donde han encontrado uranio. Has ganado " + amount + " unidades de uranio, un recurso muy raro pero también muy valioso que te permitirá alimentar los sistemas de tu nave. Has conseguido extraer " + energyAmount * getEnergyMultiplier() + " unidades de energía a partir del uranio, lo que mejorará tu eficiencia y autonomía.");
    texts.push("Tu equipo ha explorado un planeta con una anomalía espacial, donde han encontrado uranio. Has conseguido " + amount + " unidades de uranio, un elemento muy extraño pero también muy útil que te permitirá alterar tu espacio-tiempo o viajar a otras dimensiones. Has conseguido extraer " + energyAmount * getEnergyMultiplier() + " unidades de energía a partir del uranio, lo que te dará acceso a nuevos mundos y misterios.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        addEnergy(energyAmount);
        updateInterfaces();
        playGetItemSound();
    });

    dialog.trigger();
}
function lootPlanetGra(amount = 0) {
    let texts = [];
    texts.push("Tu expedición ha vuelto de un planeta con una tecnología avanzada, donde han encontrado restos de grafeno. Has obtenido " + amount + " unidades de grafeno, un material increíblemente fuerte y flexible que te permitirá optimizar el rendimiento de tu nave.");
    texts.push("Has mandado una expedición a un planeta con una flora exótica, donde han encontrado plantas que producen grafeno. Has ganado " + amount + " unidades de grafeno, un recurso muy valioso para fabricar baterías o sensores.");
    texts.push("Tu equipo ha explorado un planeta con una actividad volcánica, donde han encontrado rocas que contienen grafeno. Has conseguido " + amount + " unidades de grafeno, que podrás usar para reforzar tu escudo térmico o crear nanomateriales.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        setGraphenResource(getGraphenResource() + amount);
        updateInterfaces();
        playGetItemSound();
    });

    dialog.trigger();
}
function lootPlanetScrap(amount = 0) {
    totalResources += amount;
    let texts = [];
    texts.push("Tu expedición ha regresado de un planeta con una civilización extinta, donde han encontrado chatarra. Has obtenido " + amount + " unidades de chatarra, un material que podrás reciclar o vender a otros viajeros espaciales.");
    texts.push("Has enviado una expedición a un planeta con una guerra en curso, donde han encontrado chatarra. Has ganado " + amount + " unidades de chatarra, un recurso que podrás aprovechar o intercambiar por otros bienes.");
    texts.push("Tu equipo ha explorado un planeta con una basura espacial, donde han encontrado chatarra. Has conseguido " + amount + " unidades de chatarra, que podrás reutilizar o comerciar con otros naves.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        setScrapResource(getScrapResource() + amount);
        updateInterfaces();
        playGetItemSound();
    });

    dialog.trigger();
}
function lootPlanetEmpty(amount = 0) {
    let texts = [];
    texts.push("Tu expedición ha vuelto de un planeta vacío, donde no han encontrado nada de interés. Has perdido tiempo y combustible, y tu equipo está desanimado.");
    texts.push("Has mandado una expedición a un planeta hostil, donde no han encontrado nada útil. Has gastado recursos y energía, y tu equipo está frustrado.");
    texts.push("Tu equipo ha explorado un planeta inhóspito, donde no han encontrado nada valioso. Has desperdiciado oportunidades y dinero, y tu equipo está enfadado.");

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.trigger();
}
function lootPlanetAccident(amount = 0, temperature) {
    let texts = [];
    texts.push("Tu expedición ha vuelto de un planeta con una gravedad muy alta, donde han sufrido un accidente al aterrizar. Has perdido " + amount + " miembros de tu equipo y tu nave ha quedado dañada.");
    texts.push("Has mandado una expedición a un planeta con una tormenta eléctrica, donde han sido alcanzados por un rayo. Has perdido " + amount + " miembros de tu equipo y tu nave ha quedado averiada.");
    texts.push("Has enviado una expedición a un planeta con una tecnología avanzada, donde han sido atacados por unos robots. Has perdido " + amount + " miembros de tu equipo y tu nave ha quedado dañada.");
    texts.push("Has enviado una expedición a un planeta con una anomalía gravitatoria, donde han sido absorbidos por un agujero negro. Has perdido " + amount + " miembros de tu equipo y tu nave ha quedado destruida.");
    texts.push("Has mandado una expedición a un planeta con una fauna peligrosa, donde han sido atacados por unas criaturas hostiles. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado traumatizado.");
    texts.push("Tu equipo ha explorado un planeta con una radiación intensa, donde han sido expuestos a una dosis letal. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado enfermo.");
    texts.push("Has enviado una expedición a un planeta con una guerra civil, donde han sido capturados por unos rebeldes. Has perdido " + amount + " miembros de tu equipo.");
    texts.push("Tu expedición ha vuelto de un planeta con una atmósfera tóxica, donde han respirado un gas venenoso. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado intoxicado.");
    texts.push("Tu equipo ha explorado un planeta con una superficie helada, donde han caído en una grieta. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado atrapado.");
    texts.push("Tu expedición ha regresado de un planeta con una vegetación extraña, donde han sido devorados por una planta carnívora. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado aterrorizado.");
    texts.push("Has mandado una expedición a un planeta con una cultura alienígena, donde han sido sacrificados por unos rituales. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado traumatizado.");
    texts.push("Tu equipo ha explorado un planeta con una historia misteriosa, donde han sido poseídos por unos espíritus. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado loco.");
    texts.push("Tu expedición ha vuelto de un planeta con una geología inestable, donde han sido sepultados por un terremoto. Has perdido " + amount + " miembros de tu equipo y el resto ha quedado herido.");
    if (temperature > 100) {
        texts.push("Tu expedición ha regresado de un planeta con una temperatura extrema, donde han sufrido una avería en el sistema de refrigeración. Has perdido " + amount + " miembros de tu equipo y tu nave ha quedado sobrecalentada.");
        texts.push("Has mandado una expedición a un planeta con una atmósfera inflamable, donde han provocado una explosión. Has perdido " + amount + " miembros de tu equipo y tu nave ha quedado incendiada.");
    }

    let randomIndex = Math.floor(Math.random() * texts.length);
    let text00 = texts[randomIndex];

    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        setSurvivors(getSurvivors() - amount);
        switch (randomIndex) {
            case 0:
            case 1:
            case 2:
                setHull(getHull() - Math.floor(Math.random() * 16));
                break;
            case 3:
                setHull(getHull() - Math.floor(Math.random() * 25));
                break;
            case texts.length - 1:
            case texts.length - 2:
                if (temperature > 100)
                    warpEngineOverheating = 100;
                break;

        }
        updateInterfaces();
    });

    dialog.trigger();
}
//#endregion

function battlePlanet() {
    let text00 = "Eyecta la carga ahora mísmo o atente a las consecuencias";
    let text01 = "Pero si no llevamos carga...";
    let text02 = "No se hable más";
    var entry00 = new Entry(text00, null, false, "pirate");
    var entry01 = new Entry(text01, null, false, "admiral");
    var entry02 = new Entry(text02, null, false, "pirate");

    var dialog = new Dialog(
        [entry00, entry01, entry02]
    );

    dialog.setEndAction(function () {
        openBattlePanel();
    });

    dialog.trigger();
}
function endBattle() {
    totalWinBattles++;
    setThrusterSpeed(0);
    centerHelm();
    document.getElementsByClassName("battle-panel")[0].style.display = "none";
    let text00 = "Hemos conseguido destruir la nave enemiga";
    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.setEndAction(function () {
        openSystemMap();
    });

    dialog.trigger();
}
function cantScape() {
    let text00 = "No vas a escaparte tan fácilmente";
    let text01 = "La única forma de escapar es haciendo un salto de emergencia, pero tiene sus riesgos";
    var entry00 = new Entry(text00, null, false, "pirate");
    var entry01 = new Entry(text01, null, false, "admiral");

    var dialog = new Dialog(
        [entry00, entry01]
    );

    dialog.trigger();
}
function cantJump() {
    closeAllStarCards();
    let text00 = "Parece que aún no se ha refiregerado el motor de salto... Tocará esperar.";
    var entry00 = new Entry(text00, null, false, "admiral");

    var dialog = new Dialog(
        [entry00]
    );

    dialog.trigger();
}
function closeAllPlanetCards() {
    let starCards = document.getElementsByClassName("planet-card-box");
    Array.from(starCards).forEach(starCard => {
        starCard.remove();
    });
}
function closeAllStarCards() {
    let starCards = document.getElementsByClassName("star-card-box");
    Array.from(starCards).forEach(starCard => {
        starCard.remove();
    });
}
function jumpTo(position) {

    if (warpEngineOverheating > 0) {
        cantJump();
        return;
    }
    totalJumps++;
    let piratesDice = Math.floor(Math.random() * 101);
    if (piratesDice > 70) {
        setTimeout(function () {
            battlePlanet();
        }, 4000);
    }
    substractEnergy(30);
    warpEngineOverheating = 100;
    updateInterfaces();

    closeBattlePanel();
    closeGalaxyMap();
    closeSystemMap();
    playWarpSound();
    setBackground("hyperspace");
    startVibrate();
    countdown = undefined;
    setTimeout(function () {
        setBackground("galaxy");
        stopVibrate();
    }, 2800);
    setTimeout(function () {
        openSystemMap();
        if (GalaxyMap.starman)
            playSpaceOddity();
        else {
            playBackgroundMusic();
        }
    }, 3500);
    starPosition = position;
    GalaxyMap.populateMap();
    let dice = Math.floor(Math.random() * 101);
    if (dice > 80) {
        GalaxyMap.starman = true;
    }
    else {
        GalaxyMap.starman = false;
    }
}