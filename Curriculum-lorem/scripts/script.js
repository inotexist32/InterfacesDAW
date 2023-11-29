var formacionMinButton = document.getElementById("formacion-min-button");
//formacionMinButton.addEventListener("click", switchMin("formacion"));

/*var experienciaMinButton = document.getElementById("experiencia-min-button");
formacionMinButton.addEventListener("click", switchMin("experiencia"));

var otrosDatosMinButton = document.getElementById("other-data-min-button");
formacionMinButton.addEventListener("click", switchMin("other-data"));

var aboutMinButton = document.getElementById("about-me-min-button");
formacionMinButton.addEventListener("click", switchMin("about-about-me"));
*/
window.onload = function () {
    setSizes();
};
window.onresize = function () {
    setSizes();
};
window.ondeviceorientation = function () {
    setSizes();
};

function setSizes() {
    var bodySections = document.getElementsByClassName("body-section");
    Array.from(bodySections).forEach(bodySection => {
        let sectionRows = bodySection.getElementsByClassName("section-entry");
        let totalHeight = 0;
        Array.from(sectionRows).forEach(sectionRow => {
            totalHeight += sectionRow.offsetHeight;
        });

        if (bodySection.style.height != "0px") {
            bodySection.style.height = totalHeight + "px";
        }
    });
}
const idSwitchBusy = [];
function switchMin(id) {
    if (idSwitchBusy.length > 0) {
        let value = idSwitchBusy.indexOf(id);
        if (value != -1)
            return;
    }
    idSwitchBusy.push(id);
    var section = document.getElementsByClassName(id)[0];
    var button = section.getElementsByClassName("min-button")[0];
    var bar = button.getElementsByTagName("div")[0];

    if (bar.classList.contains("min-bar"))
        var minimized = false;
    else
        var minimized = true;

    var bodySection = section.getElementsByClassName("body-section")[0];
    if (minimized) {
        bodySection.style.height = bodySection.scrollHeight + "px";
        setTimeout(function () {
            bodySection.style.overflow = "inherit";

            let index = idSwitchBusy.indexOf(id);
            if (index !== -1) {
                idSwitchBusy.splice(index, 1);
            }
        }, 200);
        bar.classList.remove("max-bar");
        bar.classList.add("min-bar");
    } else {
        bodySection.style.height = "0px";
        bodySection.style.overflow = "hidden";
        bar.classList.remove("min-bar");
        bar.classList.add("max-bar");

        let index = idSwitchBusy.indexOf(id);
        if (index !== -1) {
            idSwitchBusy.splice(index, 1);
        }
    }
    setTimeout(setSizes, 100);
}
