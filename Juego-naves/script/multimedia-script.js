function playSlideSound() {
    var slideSound = document.getElementById("slide-sound");
    slideSound.volume = 0.5;
    slideSound.currentTime = 0; // Reinicia el audio para reproducir desde el principio
    slideSound.play();
}
function playClickSound() {
    var clickSound = document.getElementById("click-sound");
    clickSound.volume = 0.5;
    clickSound.currentTime = 0;
    clickSound.play();
}
function playTypingSound() {
    var typingSound = document.getElementById("typing-sound");
    typingSound.volume = 0.1;

    typingSound.currentTime = 0;
    typingSound.play();
}
function playBlasterSound() {
    var blasterSound = document.getElementById("blaster-sound");
    blasterSound.volume = 0.3;

    blasterSound.currentTime = 0;
    blasterSound.play();
}
function playMissileSound() {
    var missileSound = document.getElementById("missile-sound");
    missileSound.volume = 0.3;

    missileSound.currentTime = 0;
    missileSound.play();
}
function playGetItemSound() {
    var getItemSound = document.getElementById("get-item-sound");
    getItemSound.volume = 0.5;

    getItemSound.currentTime = 0;
    getItemSound.play();
}
function playBackgroundMusic() {
    var backgroundAudio = document.getElementById("background-audio2");
    backgroundAudio.pause();
    var backgroundAudio = document.getElementById("background-audio");
    if (backgroundAudio.paused) {
        backgroundAudio.volume = 0.6;
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(error => {
            console.error("Error al reproducir el audio: " + error.message);
        });
    }
}
function playSpaceOddity() {
    var backgroundAudio = document.getElementById("background-audio");
    backgroundAudio.pause();
    var backgroundAudio = document.getElementById("background-audio2");

    if (backgroundAudio.paused) {
        backgroundAudio.volume = 0.6;
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(error => {
            console.error("Error al reproducir el audio: " + error.message);
        });
    }
}
function playShipOut() {
    var shipOutAudio = document.getElementById("ship-out-sound");
    shipOutAudio.volume = 0.6;
    shipOutAudio.play().catch(error => {
        console.error("Error al reproducir el audio: " + error.message);
    });
}
function playShipIn() {
    var shipInAudio = document.getElementById("ship-in-sound");
    shipInAudio.volume = 0.6;
    shipInAudio.play().catch(error => {
        console.error("Error al reproducir el audio: " + error.message);
    });
}
function playWarpSound() {
    var warpSound = document.getElementById("warp-sound");
    warpSound.volume = 0.6;
    warpSound.play().catch(error => {
        console.error("Error al reproducir el audio: " + error.message);
    });
}

function showScene(scene, time) {
    var cinematic = document.getElementById("cinematic");

    cinematic.classList.forEach(className => {
        if (className.startsWith('animated-scene-')) {
            cinematic.classList.remove(className);
        }
    });
    cinematic.classList.add("animated-scene-" + scene)
    cinematic.style.display = "block";
    setTimeout(hideScene, time)
}
function hideScene() {
    var cinematic = document.getElementById("cinematic");
    cinematic.style.display = "none";
}
function setBackground(background) {
    document.body.classList = [background];
}