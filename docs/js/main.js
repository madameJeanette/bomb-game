"use strict";
var Bomb = (function () {
    function Bomb() {
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posy = 200;
        this.posx = 220;
    }
    Bomb.prototype.update = function () {
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    return Bomb;
}());
var Car = (function () {
    function Car() {
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posx = 100;
        this.posy = 350;
    }
    Car.prototype.update = function () {
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.bomb = new Bomb();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        console.log("updating the game");
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.destroyBuilding = function () {
        this.destroyed++;
        console.log("buildings destroyed " + this.destroyed);
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map