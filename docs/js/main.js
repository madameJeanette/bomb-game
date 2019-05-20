"use strict";
class Bomb extends HTMLElement {
    constructor() {
        super();
        this.geklikt = false;
        this.element = document.createElement("bomb");
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posy = 200;
        this.posx = Math.random() * (window.innerWidth - 10);
        this.speedY = (Math.random() * 5) + 1;
        this.element.addEventListener("click", () => this.klikBom());
        this.element.addEventListener("touchstart", () => this.klikBom());
    }
    update() {
        this.posy = this.posy + this.speedY;
        let h = window.innerHeight;
        if (this.posy >= h - 200) {
            this.posy = -300;
            this.game.destroyBuilding();
        }
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
    klikBom() {
        this.posy = (Math.random() + 1) * -500;
        this.geklikt = true;
        return this.geklikt;
    }
    resetPosition() {
        this.posy = -200;
    }
}
class Car extends HTMLElement {
    constructor() {
        super();
        document.body.appendChild(this);
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posx = -200;
        this.posy = window.innerHeight - 200;
        this.element.addEventListener("click", () => this.game.restartGame());
        this.element.addEventListener("touchstart", () => this.game.restartGame());
    }
    update() {
        this.posx = this.posx + 5;
        let w = window.innerWidth;
        if (this.posx >= w) {
            console.log("einde");
            this.posx = -200;
        }
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.moveImage = 0;
        this.bomb = [];
    }
    initGame() {
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car();
        for (let i = 0; i < 4; i++) {
            this.bomb.push(new Bomb());
        }
        this.gameLoop();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    gameLoop() {
        this.car.update();
        for (let b of this.bomb) {
            b.update();
            if (b.geklikt === true) {
                this.scorePoint();
                b.geklikt = false;
            }
        }
        if (this.destroyed <= 3) {
            requestAnimationFrame(() => this.gameLoop());
        }
        else {
            console.log("stop");
        }
    }
    destroyBuilding() {
        this.destroyed++;
        this.moveImage = this.moveImage - 72;
        console.log("buildings destroyed " + this.destroyed);
        this.statusbar.style.backgroundPosition = this.moveImage + "px";
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
    restartGame() {
        this.score = 0;
        this.textfield.innerHTML = "Score: " + this.score;
        this.bomb.forEach(function (element) {
            element.resetPosition();
        });
        this.destroyed = 0;
        this.moveImage = 0;
        this.statusbar.style.backgroundPosition = '0px';
        this.gameLoop();
    }
}
window.addEventListener("load", () => {
    let gameOne = Game.getInstance();
    gameOne.initGame();
});
//# sourceMappingURL=main.js.map