class Controls {
    constructor() {
        this.controlsCollection = [];
    }

    addControl(control) {
        this.controlsCollection.push(control);
    }

    getElementById(id) {
        return this.controlsCollection.find(control => control.id === id) || null;
    }

    paintAllControls() {
        this.paintAllPBars();
        this.paintAllEButtons();
        this.paintAllDigiPanels();
        this.paintAllDPTitles();
    }

    paintAllPBars() {
        let progressBarElements = document.querySelectorAll('p-bar');

        progressBarElements.forEach((element) => {
            this.controlsCollection.push(new ProgressBar(element));
        });
    }

    paintAllEButtons() {
        let EnhancedButtonElements = document.querySelectorAll('e-button');

        EnhancedButtonElements.forEach((element) => {
            this.controlsCollection.push(new EnhancedButton(element));
        });
    }

    paintAllDigiPanels() {
        let DigiPanelElements = document.querySelectorAll('digi-panel');

        DigiPanelElements.forEach((element) => {
            this.controlsCollection.push(new DigiPanel(element));
        });
    }
    paintAllDPTitles() {
        let DigiPanelTitleSmallElements = document.querySelectorAll('dp-title');

        DigiPanelTitleSmallElements.forEach((element) => {
            this.controlsCollection.push(new DigiPanelTitle(element));
        });
    }
}
const controls = new Controls();
document.addEventListener('DOMContentLoaded', function () {
    controls.paintAllControls();
});
