class DigiPanel {
    constructor(element = null) {
        if (element == null) {
            element = document.createElement("digi-panel");
        }
        this.digiPanelNode = element;
        this.id = element.id;
        this.size = element.getAttribute('size') || "small";
        this.title = element.getAttribute('title') || "";
        this.closeAction = element.getAttribute('close-action') || "";
        this.fillNode();
    }

    fillNode() {
        this.digiPanelNode.style.padding = "20px";
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        var div4 = document.createElement('div');
        var div5 = document.createElement('div');
        var div6 = document.createElement('div');
        var div7 = document.createElement('div');
        var div8 = document.createElement('div');
        var div9 = document.createElement('div');
        var div10 = document.createElement('div');
        var div11 = document.createElement('div');
        var div12 = document.createElement('div');
        var div13 = document.createElement('div');
        var div14 = document.createElement('div');
        var titleElements = this.digiPanelNode.getElementsByTagName('dp-title');
        if (titleElements.length > 0)
            var hpTitleS = titleElements[0];
        else
            var hpTitleS = document.createElement('dp-title');
        if (this.size == "large")
            hpTitleS.setAttribute("size", "large");

        div1.className = 'panel-bars';
        div2.className = 'panel-corner panel-corner-tl';
        div3.className = 'panel-corner panel-corner-tr';
        div4.className = 'panel-corner panel-corner-bl';
        div5.className = 'panel-corner panel-corner-br';
        div6.className = 'panel-frame-bar panel-frame-bar-top-left';
        div7.className = 'panel-frame-bar panel-frame-bar-top-right';
        div8.className = 'panel-frame-bar panel-frame-bar-bottom-left';
        div9.className = 'panel-frame-bar panel-frame-bar-bottom-right';
        div10.className = 'panel-frame-bar panel-frame-bar-left-bottom';
        div11.className = 'panel-frame-bar panel-frame-bar-left-top';
        div12.className = 'panel-frame-bar panel-frame-bar-right-bottom';
        div13.className = 'panel-frame-bar panel-frame-bar-right-top';


        hpTitleS.setAttribute('text', this.title);

        this.digiPanelNode.insertBefore(hpTitleS, this.digiPanelNode.firstChild);  // Agregar hpTitleS al principio
        if (this.closeAction != "") {
            div14.className = 'panel-close-button';
            div14.setAttribute("onclick", this.closeAction);
            this.digiPanelNode.insertBefore(div14, this.digiPanelNode.firstChild);
        }

        this.digiPanelNode.insertBefore(div13, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div12, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div11, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div10, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div9, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div8, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div7, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div6, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div5, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div4, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div3, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div2, this.digiPanelNode.firstChild);
        this.digiPanelNode.insertBefore(div1, this.digiPanelNode.firstChild);
        this.fillTitle();
    }
    fillTitle() {
        let titleElement = this.digiPanelNode.getElementsByTagName("dp-title");
        if (titleElement.length > 0) {
            let title = new DigiPanelTitle(titleElement[0]);
            title.fillNode();
        }
    }
}