class ProgressBar {
    constructor(element) {
        this.progressBarNode = element;
        this.id = element.id;
        this.value = parseInt(element.getAttribute('value')) || 100;
        this.greenLimit = parseInt(element.getAttribute('green-limit')) || 50;
        this.yellowLimit = parseInt(element.getAttribute('yellow-limit')) || 25;
        this.colorFull = element.getAttribute('color-f') || "green";
        this.colorMid = element.getAttribute('color-m') || "yellow";
        this.colorEmp = element.getAttribute('color-e') || "red";
        this.fillNode();
    }

    setValue(value) {
        this.value = value;
        this.updateValue();
    }
    
    getValue() {
        return this.value;
    }
    subtractValue(subtract) {
        this.value -= subtract;
        this.updateValue();
    }
    addValue(add) {
        this.value += add;
        this.updateValue();
    }

    updateValue() {
        this.progressBarBody
        if (this.value > 100)
            this.value = 100;
        else if (this.value < 0)
            this.value = 0;

        this.redBar.style.width = this.yellowBar.style.width = this.greenBar.style.width = this.value + "%";
        let greenOpacity = (this.value - this.greenLimit) / (100 - this.greenLimit);
        if (greenOpacity < 0)
            greenOpacity = 0;
        let yellowOpacity = this.value / (100 - this.yellowLimit);
        if (yellowOpacity < 0)
            yellowOpacity = 0;

        this.yellowBar.style.opacity = yellowOpacity;
        this.greenBar.style.opacity = greenOpacity;

    }
    fillNode() {
        this.progressBarNode.innerHTML = "";
        this.progressBarNode.classList.remove("progress-bar");
        this.progressBarNode.classList.add("progress-bar");
        let progressBarBody = document.createElement("div");
        progressBarBody.classList.add("progres-bar-component", "progress-bar-body");

        let color = this.progressBarNode.getAttribute('color') || "default";
        if (color != "default") {
            this.redBar = this.createProgressBarBar(color);
            this.yellowBar = this.createProgressBarBar("none");
            this.greenBar = this.createProgressBarBar("none");
        } else {
            this.redBar = this.createProgressBarBar(this.colorEmp);
            this.yellowBar = this.createProgressBarBar(this.colorMid);
            this.greenBar = this.createProgressBarBar(this.colorFull);
        }
        progressBarBody.appendChild(this.redBar);
        progressBarBody.appendChild(this.yellowBar);
        progressBarBody.appendChild(this.greenBar);

        let leftFrame = document.createElement("div");
        leftFrame.classList.add("progres-bar-component", "progress-bar-left-frame");

        let rightFrame = document.createElement("div");
        rightFrame.classList.add("progres-bar-component", "progress-bar-right-frame");

        this.progressBarNode.appendChild(progressBarBody);
        this.progressBarNode.appendChild(leftFrame);
        this.progressBarNode.appendChild(rightFrame);
    }

    createProgressBarBar(color) {
        let barBody = document.createElement("div");
        barBody.classList.add("progres-bar-component", "progress-bar-bar-body", `progress-bar-bar-body-${color}`);

        let barFrame = document.createElement("div");
        barFrame.classList.add("progres-bar-component", "progress-bar-bar-frame", `progress-bar-bar-frame-${color}`);

        barBody.appendChild(barFrame);

        return barBody;
    }
}