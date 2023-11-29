var stopWritting = false;
var currentDialog;
var currentEntry;

function continueDialog() {
    playClickSound();
    currentDialog.nextEntry();
}
function skipDialog() {
    stopWritting = true;
    playClickSound();
    setTimeout(function () {
        while (true) {
            if (currentDialog.entries.length > 1) {
                if (!currentDialog.entries[1].continuable)
                    break;
            } else
                break;
            currentDialog.entries.shift();
        }
        currentDialog.nextEntry();
    }, 500);
}
function setRandomSkipText() {
    var options = ["Al turrón, que no tengo todo el día", "Ya basta de tanta chachara", "Me duermes con tanta verborrea", "No tienes a otro alguien a quien dar la chapa?", "Como sigas hablando me voy a dormir", "Ah, que aún no has terminado?"]
    var skipButton = document.getElementsByClassName("dialog-shut-up-button")[0];

    var randomIndex = Math.floor(Math.random() * options.length);
    skipButton.innerText = options[randomIndex];
}
function showAllDialog(){
    var textBoxElement = document.getElementsByClassName("dialog-box")[0];
    var publicText = textBoxElement.getElementsByClassName("public-text")[0];
    var hiddenText = textBoxElement.getElementsByClassName("hidden-text")[0];
    stopWritting = true;
    setTimeout(function(){
        publicText.innerText=hiddenText.innerText;
        endEntryDialog()
    },200);
}
function write() {
    setRandomSkipText();
    stopWritting = false;
    var textBoxElement = document.getElementsByClassName("dialog-box")[0];
    var publicText = textBoxElement.getElementsByClassName("public-text")[0];
    var hiddenText = textBoxElement.getElementsByClassName("hidden-text")[0];
    var inputBlock = document.getElementById("dialog-input-block");
    var continueButton = document.getElementsByClassName("dialog-continue-button")[0];
    var fastButton = document.getElementsByClassName("dialog-fast-button")[0];
    var skipButton = document.getElementsByClassName("dialog-shut-up-button")[0];

    publicText.innerText = "";

    const hiddenContent = hiddenText.textContent;
    let currentIndex = 0;

    const charactersPerSecond = 10; // Velocidad de escritura normal
    continueButton.style.display = "none";
    fastButton.style.display = "block";
    if (currentEntry.continuable)
        skipButton.style.display = "block";
    else
        skipButton.style.display = "none";

    inputBlock.innerHTML = "";

    function getCharacterDelay(character) {
        // Si el carácter es un punto, aumenta el retardo
        if (character === '.') {
            return 3 * 1000 / charactersPerSecond; // Pausa de 2 segundos
        } else if (character === ",")
            return 2 * 1000 / charactersPerSecond;
        return 500 / charactersPerSecond; // Velocidad normal
    }

    function addCharacter() {
        if (currentIndex < hiddenContent.length) {
            publicText.textContent += hiddenContent[currentIndex];
            currentIndex++;
            const delay = getCharacterDelay(hiddenContent[currentIndex - 1]);
            if (hiddenContent[currentIndex - 1] != ".") {
                playTypingSound();
            }
            // Programa el siguiente carácter después del retardo
            if (!stopWritting)
                setTimeout(addCharacter, delay);
            else
                stopWritting = false;
        } else {
            endEntryDialog();
        }
    }

    if (hiddenContent.length > 0) {
        // Inicia la escritura con el primer carácter
        setTimeout(addCharacter, getCharacterDelay(hiddenContent[currentIndex]));
    }
}
function endEntryDialog(){
    var fastButton = document.getElementsByClassName("dialog-fast-button")[0];
    var continueButton = document.getElementsByClassName("dialog-continue-button")[0];
    var inputBlock = document.getElementById("dialog-input-block");

    fastButton.style.display = "none";
    if (currentEntry.skypeable) {
        continueButton.style.display = "block";
    }

    if (currentEntry.inputs) {
        switch (currentEntry.inputs[0]) {
            case "row":
                inputBlock.style.flexDirection = "row";
                currentEntry.inputs.shift();
                break;
            case "column":
                inputBlock.style.flexDirection = "column";
                currentEntry.inputs.shift();
                break;
        }
        currentEntry.inputs.forEach(entry => {
            inputBlock.appendChild(entry);
        });
    } else {
        continueButton.style.display = "block";

    }
}

function setDialogText(text) {
    var hiddenText = document.getElementsByClassName("hidden-text")[0];
    hiddenText.innerText = text;
}

function closeDialog() {
    var dialogBox = document.getElementsByClassName("dialog-box")[0];
    var publicText = dialogBox.getElementsByClassName("public-text")[0];
    var dialog = document.getElementsByClassName("dialog")[0];
    var holoPanel = document.getElementsByClassName("holo-panel")[0];
    var holoPanelContent = holoPanel.getElementsByClassName("holo-panel-content")[0];
    var continueButton = document.getElementsByClassName("dialog-continue-button")[0];
    continueButton.style.display = "none"
    dialog.style.display = "none";
    holoPanelContent.style.opacity = 0;
    holoPanel.style.width = "10px";
    stopWritting = true;
    publicText.innerText = "";
}
function showDialog() {
    var dialog = document.getElementsByClassName("dialog")[0];
    var holoPanel = document.getElementsByClassName("holo-panel")[0];
    var holoPanelContent = holoPanel.getElementsByClassName("holo-panel-content")[0];
    if (holoPanel.style.width != "250px") {
        dialog.style.display = "flex";
        holoPanelContent.style.opacity = 1;
        holoPanel.style.width = "250px";
        if (currentDialog)
            write();
    } else
        closeDialog();
}

function createTextInput(id, placeHolder) {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.id = id;
    newInput.className = "dialog-input";
    if (placeHolder)
        newInput.placeholder = placeHolder;
    return newInput;
}
function createButtonInput(text, clickFunction) {
    const newButton = document.createElement("input");
    newButton.type = "button";
    newButton.value = text;
    newButton.className = "dialog-input";
    newButton.addEventListener("click", clickFunction);
    return newButton;

}
function setHolophoneFace(face) {
    var holophoneFace = document.getElementById("holophone-face");
    holophoneFace.classList = [];
    holophoneFace.classList.add("holophone-face");
    holophoneFace.classList.add(face + "-face");
}
/**
 * Objetos Entry de los que se compone el diálogo
 * Opción de saltarlo u obligación de leerlo entero
 */
class Dialog {
    constructor(entries, skypeable) {
        this.entries = entries;
        this.skypeable = skypeable;
        this.endAction = null;
    }

    setEndAction(action) {
        this.endAction = action;
    }

    trigger() {
        currentDialog = this;
        if (this.entries.length > 0) {
            var entry = this.entries[0];
            setHolophoneFace(entry.character);

            setDialogText(entry.text);
            currentEntry = entry;
            showDialog();
        } else {
            closeDialog();
            this.endAction();
        }
    }
    nextEntry() {
        var publicText = document.getElementsByClassName("public-text")[0];
        this.entries.shift();
        currentDialog = this;
        if (this.entries.length > 0) {
            var entry = this.entries[0];
            setHolophoneFace(entry.character);
            setDialogText(entry.text);
            currentEntry = entry;
            publicText.innerText = "";
            write();
        } else {
            closeDialog();
            if (this.endAction) {
                this.endAction();
            }
        }
    }
}
/**
 * Texto de la entrada de dialogo, nodos de inputs en order y boolean de continuable
 */
class Entry {
    constructor(text, inputs, continuable, character) {
        this.text = text;
        this.inputs = inputs;
        this.continuable = continuable;
        this.character = character;
    }

}

