class DigiPanelTitle {
    constructor(element=null) {
        if(element==null){
            element=document.createElement("digi-panel");
        }
        this.dpTitleNode = element;
        this.id = element.id;
        this.size = element.getAttribute('size') || "small";
        this.text = element.getAttribute('text') || "";
        this.fillNode();
    }

    fillNode() {
        this.dpTitleNode.innerHTML = "";

        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        var div4 = document.createElement('div');
        var pElement = document.createElement('p');

        this.dpTitleNode.className = 'title-box';
        if (this.size == "large")
            this.dpTitleNode.classList.add("title-box-big-screen");
        div1.className = 'title-box-piece title-box-piece-left';
        div2.className = 'title-box-piece title-box-piece-center-left';
        div3.className = 'title-box-piece title-box-piece-center-right';
        div4.className = 'title-box-piece title-box-piece-right';
        pElement.className = 'title-box-text';

        var pText = document.createTextNode(this.text);

        pElement.appendChild(pText);
        this.dpTitleNode.appendChild(div1);
        this.dpTitleNode.appendChild(div2);
        this.dpTitleNode.appendChild(div3);
        this.dpTitleNode.appendChild(div4);
        this.dpTitleNode.appendChild(pElement);
    }
}