
///<reference path="gameobjects.ts"/>

class Car extends GameObject {
        
    private game: Game
    private element: HTMLElement

    constructor(posx: number, posy: number, game: Game) {
        super(posx, posy);
        this.game = game;
        this.element = document.createElement("car")                    //Creert de auto
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        
        //Start positie Car
        //Math.random() * 1800 //Returns a number between 0-1800
        this.posx = -200
        this.posy = window.innerHeight -200

        //Wanneer je op auto klikt
        this.element.addEventListener("click", ()=> this.game.restartGame());

        //Wanneer je op telefoon auto klikt
        this.element.addEventListener("touchstart", ()=> this.game.restartGame());
    }

    public update():void {
        this.posx = this.posx + 5
        let w = window.innerWidth

        
        //Auto terug als die uit het scherm rijd.
        if (this.posx >= w){
            console.log("einde")
            this.posx = -200
            
        }

        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}