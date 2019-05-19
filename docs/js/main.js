"use strict";
var Bomb = (function () {
    function Bomb(g) {
        var _this = this;
        this.geklikt = false;
        this.game = g;
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posy = 200;
        this.posx = Math.random() * (window.innerWidth - 10);
        this.speedY = (Math.random() * 5) + 1;
        this.element.addEventListener("click", function () { return _this.klikBom(); });
        this.element.addEventListener("touchstart", function () { return _this.klikBom(); });
    }
    Bomb.prototype.update = function () {
        this.posy = this.posy + this.speedY;
        var h = window.innerHeight;
        if (this.posy >= h - 200) {
            this.posy = -300;
            this.game.destroyBuilding();
        }
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    Bomb.prototype.klikBom = function () {
        this.posy = (Math.random() + 1) * -500;
        this.geklikt = true;
        return this.geklikt;
    };
    Bomb.prototype.resetPosition = function () {
        this.posy = -200;
    };
    return Bomb;
}());
var Car = (function () {
    function Car(g) {
        var _this = this;
        this.game = g;
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posx = -200;
        this.posy = window.innerHeight - 200;
        this.element.addEventListener("click", function () { return _this.game.restartGame(); });
        this.element.addEventListener("touchstart", function () { return _this.game.restartGame(); });
    }
    Car.prototype.update = function () {
        this.posx = this.posx + 5;
        var w = window.innerWidth;
        if (this.posx >= w) {
            console.log("einde");
            this.posx = -200;
        }
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.moveImage = 0;
        this.bomb = [];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car(this);
        for (var i = 0; i < 4; i++) {
            this.bomb.push(new Bomb(this));
        }
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.update();
        for (var _i = 0, _a = this.bomb; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
            if (b.geklikt === true) {
                this.scorePoint();
                b.geklikt = false;
            }
        }
        if (this.destroyed <= 3) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
        else {
            console.log("stop");
        }
    };
    Game.prototype.destroyBuilding = function () {
        this.destroyed++;
        this.moveImage = this.moveImage - 72;
        console.log("buildings destroyed " + this.destroyed);
        this.statusbar.style.backgroundPosition = this.moveImage + "px";
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    Game.prototype.restartGame = function () {
        this.score = 0;
        this.textfield.innerHTML = "Score: " + this.score;
        this.bomb.forEach(function (element) {
            element.resetPosition();
        });
        this.destroyed = 0;
        this.moveImage = 0;
        this.statusbar.style.backgroundPosition = '0px';
        this.gameLoop();
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map