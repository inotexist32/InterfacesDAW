class Upgrade {
    constructor(type, name, description, feCost, alCost, siCost, graphenCost, scrapCost, useLevels) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.feCost = feCost;
        this.alCost = alCost;
        this.siCost = siCost;
        this.graphenCost = graphenCost;
        this.scrapCost = scrapCost;
        this.useLevels = useLevels;
        this.level = 1;
    }

    get feCostAtCurrentLevel() {
        return this.feCost * this.level * 2;
    }

    get alCostAtCurrentLevel() {
        return this.alCost * this.level * 2;
    }

    get siCostAtCurrentLevel() {
        return this.siCost * this.level * 2;
    }

    get graphenCostAtCurrentLevel() {
        return this.graphenCost * this.level * 2;
    }

    get scrapCostAtCurrentLevel() {
        return this.scrapCost * this.level * 2;
    }
    getTotalCost(){
        return this.feCost+this.alCost+this.siCost+this.graphenCost+this.scrapCost;
    }
    getNode() {
        const upgradeDiv = document.createElement("div");
        upgradeDiv.classList.add("workshop-ship-section");

        const logoDiv = document.createElement("div");
        logoDiv.classList.add("workshop-ship-section-logo");

        const logoImgDiv = document.createElement("div");
        logoImgDiv.classList.add("workshop-ship-section-logo-img", `workshop-ship-section-logo-img-${this.type}`);
        logoDiv.appendChild(logoImgDiv);

        const logoNameDiv = document.createElement("div");
        logoNameDiv.classList.add("workshop-ship-section-logo-name");
        logoNameDiv.textContent = this.name;
        logoDiv.appendChild(logoNameDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("workshop-ship-section-description");
        descriptionDiv.textContent = this.description;

        const costDiv = document.createElement("div");
        costDiv.classList.add("workshop-ship-section-cost");

        let possibleUpgrade = true;// Creo esta variable antes de iterar los recursos para guardar en ella si no se cumple alguno
        const resources = [["fe", "Hierro"], ["al", "Aluminio"], ["si", "Silicio"], ["graphen", "Grafeno"], ["scrap", "Chatarra"]];
        resources.forEach(resource => {
            const resourceDiv = document.createElement("div");
            resourceDiv.classList.add("workshop-ship-section-cost-resource", `workshop-ship-section-cost-${resource[0]}`);

            const resourceNameDiv = document.createElement("div");
            resourceNameDiv.classList.add("workshop-ship-section-cost-name");
            resourceNameDiv.textContent = resource[1].charAt(0).toUpperCase() + resource[1].slice(1);
            resourceDiv.appendChild(resourceNameDiv);

            const resourceLogoDiv = document.createElement("div");
            resourceLogoDiv.classList.add("workshop-ship-section-cost-logo", `workshop-ship-section-cost-logo-${resource[0]}`);
            resourceDiv.appendChild(resourceLogoDiv);

            const resourceAmountDiv = document.createElement("div");
            resourceAmountDiv.classList.add("workshop-ship-section-cost-amount");
            resourceAmountDiv.textContent = this[`${resource[0]}CostAtCurrentLevel`];

            let resourceReserves = 0;
            switch (resource[0]) {
                case "fe":
                    resourceReserves = getFeResource();
                    break;
                case "al":
                    resourceReserves = getAlResource();
                    break;
                case "si":
                    resourceReserves = getSiResource();
                    break;
                case "graphen":
                    resourceReserves = getGraphenResource();
                    break;
                case "scrap":
                    resourceReserves = getScrapResource();
                    break;
            }
            if (resourceReserves < this[`${resource[0]}CostAtCurrentLevel`]) {
                resourceAmountDiv.classList.add("resource-red"); // Agrego la clase para colorear en rojo si no hay suficientes recursos
                possibleUpgrade = false;
            }
            resourceDiv.appendChild(resourceAmountDiv);
            costDiv.appendChild(resourceDiv);
        });

        const applyDiv = document.createElement("div");
        applyDiv.classList.add("workshop-ship-section-apply");
        if (this.useLevels) {
            applyDiv.textContent = `Aumentar a nivel ${this.level}`;
        } else {
            applyDiv.textContent = `Fabricar mejora`;
        }
        if (possibleUpgrade) {
            applyDiv.onclick = this.apply.bind(this);
        } else {
            applyDiv.classList.add("disabled-text")
        }

        // Construir el árbol de elementos
        upgradeDiv.appendChild(logoDiv);
        upgradeDiv.appendChild(descriptionDiv);
        upgradeDiv.appendChild(costDiv);
        upgradeDiv.appendChild(applyDiv);

        return upgradeDiv;
    }
    apply() {
        setFeResource(getFeResource() - this.feCostAtCurrentLevel);
        setAlResource(getAlResource() - this.alCostAtCurrentLevel);
        setSiResource(getSiResource() - this.siCostAtCurrentLevel);
        setGraphenResource(getGraphenResource() - this.graphenCostAtCurrentLevel);
        setScrapResource(getScrapResource() - this.scrapCostAtCurrentLevel);
        if (this.useLevels)
            this.level++;
        workshop.paintUpgrades();
        this.effect();
    }
    setEffect(effect) {
        this.effect = effect;
    }
}

class Workshop {
    constructor(node) {
        this.node = node || document.getElementById("workshop-upgrades");
        this.upgrades = [];
        this.fillUpgrades();
    }
    fillUpgrades() {
        const shieldsUpgrade = new Upgrade(
            "shields",
            "Generador de escudos",
            "Cada mejora en el sistema de generación de escudos aumenta la cantidad de energía disponible para derivar a los escudos de la nave",
            20, // Hierro
            20, // Aluminio
            60, // Silicio
            100, // Grafeno
            10,   // Chatarra
            true
        );
        shieldsUpgrade.setEffect(function () {
            setShields(getShields() + 20);
            totalResourceInvested+=shieldsUpgrade.getTotalCost();
        })
        const stealthUpgrade = new Upgrade(
            "stealth",
            "Tecnología de sigilo",
            "La tecnología de sigilo proporciona a la nave una protección extra contra los escaneos Cyclon. Cada nivel de mejora aumenta el tiempo entre escaneos Cyclon",
            50, // Hierro
            0, // Aluminio
            100, // Silicio
            20, // Grafeno
            0,   // Chatarra
            true
        );
        stealthUpgrade.setEffect(function () {
            setCountdownMultiplier(getCountdownMultiplier() + 0.5);
            totalResourceInvested+=stealthUpgrade.getTotalCost();
        })
        const energyUpgrade = new Upgrade(
            "energy",
            "Tecnología de energia",
            "Las últimas tecnologías energeticas optimizan el consumo de los componentes y aumentan la durabilidad de los sistemas de almacenamiento energético. Cada nivel reduce el gasto de energía y aumenta ligeramente la energia generada por el uranio.",
            20, // Hierro
            0, // Aluminio
            100, // Silicio
            50, // Grafeno
            0,   // Chatarra
            true
        );
        energyUpgrade.setEffect(function () {
            setEnergyMultiplier(getEnergyMultiplier() + 0.1);
            totalResourceInvested+=energyUpgrade.getTotalCost();
        })
        const dependenciasUpgrade = new Upgrade(
            "dependencias",
            "Dependencias de la tripulación",
            "Una nave es el hogar de muchas personas. La comodidad a bordo es crucial para el desarrollo de sus huespedes. Cada nivel de mejora de las dependencias aumentará la tasa de natalidad a bordo. (No existe natalidad hasta desarrollar el primer nivel)",
            200, // Hierro
            200, // Aluminio
            50, // Silicio
            0, // Grafeno
            50,   // Chatarra
            true
        );
        dependenciasUpgrade.setEffect(function () {
            setNatalityIndex(getNatalityIndex() + 0.025);
            totalResourceInvested+=dependenciasUpgrade.getTotalCost();
        })
        const laserUpgrade = new Upgrade(
            "laser",
            "Tecnología laser",
            "El desarrollo de la tecnología laser es crucial a la hora de afrontar combates espaciales. Cada nivel aumentará el poder de las armas laser de la nave.",
            0, // Hierro
            200, // Aluminio
            200, // Silicio
            10, // Grafeno
            0,   // Chatarra
            true
        );
        laserUpgrade.setEffect(function () {
            setLaserDamage(getLaserDamage() + 5);
            totalResourceInvested+=laserUpgrade.getTotalCost();
        })
        const hullRepair = new Upgrade(
            "hull",
            "Reparación de casco",
            "Restaura por completo la integridad del casco. La fatiga de materiales hace que cada vez que se repara el casco sea mucho mas costoso. Si encuentras un astillero espacial podrás restaurar la nave por completo y volver al nivel 0",
            20, // Hierro
            20, // Aluminio
            0, // Silicio
            0, // Grafeno
            0,   // Chatarra
            true
        );
        hullRepair.setEffect(function () {
            setHull(100);
            totalResourceInvested+=hullRepair.getTotalCost();
        })
        const createMissiles = new Upgrade(
            "missile",
            "Fabricar misiles",
            "Fabrica misiles utilizando materiales rudimentarios. Se fabrican 5 misiles cada vez",
            100, // Hierro
            100, // Aluminio
            100, // Silicio
            0, // Grafeno
            50,   // Chatarra
        );
        createMissiles.setEffect(function () {
            setMissiles(getMissiles() + 5);
            totalResourceInvested+=createMissiles.getTotalCost();
        })
        this.upgrades.push(shieldsUpgrade);
        this.upgrades.push(stealthUpgrade);
        this.upgrades.push(hullRepair);
        this.upgrades.push(laserUpgrade);
        this.upgrades.push(energyUpgrade);
        this.upgrades.push(dependenciasUpgrade);
        this.upgrades.push(createMissiles);
    }
    paintUpgrades() {
        this.node.innerHTML = "";

        this.upgrades.forEach(upgrade => {
            this.node.appendChild(upgrade.getNode());
        });
    }
}