class EnhancedButton {
    constructor(element) {
        this.enhancedButtonNode = element;
        this.id = element.id;
        this.text = element.getAttribute('text') || "";
        this.fillNode();
    }

    fillNode() {
        this.enhancedButtonNode.innerHTML = "";

        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        var div4 = document.createElement('div');
        var div5 = document.createElement('div');
        var div6 = document.createElement('div');

        this.enhancedButtonNode.className = 'standar-button';
        div1.className = 'btn standar-button';
        div2.className = 'standar-button-piece standar-button-piece-left';
        div3.className = 'standar-button-piece standar-button-piece-center-left';
        div4.className = 'standar-button-piece standar-button-piece-center-right';
        div5.className = 'standar-button-piece standar-button-piece-right';
        div6.className = 'standar-button-text';
        div6.innerText = this.text;

        div1.appendChild(div2);
        div1.appendChild(div3);
        div1.appendChild(div4);
        div1.appendChild(div5);
        div1.appendChild(div6);
        this.enhancedButtonNode.appendChild(div1);
    }
}