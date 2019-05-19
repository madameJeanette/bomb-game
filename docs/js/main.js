"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(posx, posy) {
        this.posx = posx;
        this.posy = posy;
    }
    GameObject.prototype.update = function () {
    };
    return GameObject;
}());
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb(posx, posy, game) {
        var _this = _super.call(this, posx, posy) || this;
        _this.geklikt = false;
        _this.game = game;
        _this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.posy = 200;
        _this.posx = Math.random() * (window.innerWidth - 10);
        _this.speedY = (Math.random() * 5) + 1;
        _this.element.addEventListener("click", function () { return _this.klikBom(); });
        _this.element.addEventListener("touchstart", function () { return _this.klikBom(); });
        return _this;
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
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(posx, posy, game) {
        var _this = _super.call(this, posx, posy) || this;
        _this.game = game;
        _this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.posx = -200;
        _this.posy = window.innerHeight - 200;
        _this.element.addEventListener("click", function () { return _this.game.restartGame(); });
        _this.element.addEventListener("touchstart", function () { return _this.game.restartGame(); });
        return _this;
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
}(GameObject));
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.moveImage = 0;
        this.bomb = [];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car(0, 0, this);
        for (var i = 0; i < 4; i++) {
            this.bomb.push(new Bomb(0, 0, this));
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