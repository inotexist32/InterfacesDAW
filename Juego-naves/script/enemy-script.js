class EnemyShip {
    constructor(shields, hull, weapons) {
        this.shields = shields;
        this.hull = hull;
        this.weapons = weapons;
    }
    enemyClock() {
        let v1 = Math.random() * 100;
        let v2 = Math.random() * 100;
        let v3 = Math.random() * 100;
        let v4 = Math.random() * 100;
        enemyShip.setEnemyShields(v1, v2, v3, v4);
    }
    hit(damage, degrees) {
        let shieldValue = this.getShieldValueFromDegrees(degrees);
        let realDamage = damage - shieldValue;
        if (realDamage < 0)
            realDamage = 0;
        this.hull -= realDamage;
        if (this.hull <= 0)
            this.destroy();
    }
    destroy() {
        this.findElement().remove();
        clearInterval(this.clockInterval);
        endBattle();
    }
    getShieldValueFromDegrees(degrees) {
        let angulo = (degrees + 360) % 360;

        const norteLimite = 45;
        const esteLimite = 135;
        const surLimite = 225;
        const oesteLimite = 315;

        if (angulo < norteLimite || angulo >= oesteLimite) {
            return this.proaShieldValue;
        } else if (angulo < esteLimite) {
            return this.baborShieldValue;
        } else if (angulo < surLimite) {
            return this.popaShieldValue;
        } else {
            return this.estriborShieldValue;
        }
    }
    findElement() {
        return document.getElementsByClassName("battle-panel-enemy-ship")[0];
    }
    disableShield() {
        this.shieldsDisabled = true;
        setTimeout(function () {
            enemyShip.shieldsDisabled = false
        }, 5000);
    }
    paintNode() {
        const enemyShipDiv = document.createElement('div');
        enemyShipDiv.className = 'battle-panel-enemy-ship';
        enemyShipDiv.style.left = '45%';
        enemyShipDiv.style.top = '40%';

        const shieldDiv = document.createElement('div');
        shieldDiv.className = 'battle-panel-shield battle-panel-enemy-ship-shield';

        enemyShipDiv.appendChild(shieldDiv);

        const container = document.getElementsByClassName("battle-panel")[0];

        container.appendChild(enemyShipDiv);
        this.setEnemyShields(5, 5, 5, 5);

    }
    start() {
        this.paintNode();
        this.clockInterval = setInterval(this.enemyClock, 1000);
    }
    setEnemyShields(pesoIzquierda, pesoDerecha, pesoArriba, pesoAbajo) {
        let totalPuntos = this.shields;

        let sumaPesos = pesoIzquierda + pesoDerecha + pesoArriba + pesoAbajo;

        let puntosIzquierda = (pesoIzquierda / sumaPesos) * totalPuntos;
        let puntosDerecha = (pesoDerecha / sumaPesos) * totalPuntos;
        let puntosArriba = (pesoArriba / sumaPesos) * totalPuntos;
        let puntosAbajo = (pesoAbajo / sumaPesos) * totalPuntos;

        if (this.shieldsDisabled) {
            puntosIzquierda = 0
            puntosDerecha = 0
            puntosArriba = 0
            puntosAbajo = 0
        }

        this.estriborShieldValue = puntosDerecha;
        this.baborShieldValue = puntosIzquierda;
        this.proaShieldValue = puntosArriba;
        this.popaShieldValue = puntosAbajo;
        this.updateEnemyShieldImage();
    }

    updateEnemyShieldImage() {
        let shield = document.getElementsByClassName("battle-panel-enemy-ship-shield")[0];

        let horizontalValue = (this.estriborShieldValue - this.baborShieldValue) / 5;
        let verticalValue = (this.popaShieldValue - this.proaShieldValue) / 5;

        if (this.shieldsDisabled)
            shield.style.opacity = 0;
        else
            shield.style.opacity = 1;

        shield.style.boxShadow = horizontalValue + "px " + verticalValue + "px 10px 10px rgba(28, 240, 255, 0.5)";

    }
}