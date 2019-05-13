class Bomb {
    private element: HTMLElement
    private posy:number
    private posx:number

    private speedY: number                                                //Snelheid Y-as
    private game: Game

    public geklikt: boolean = false


    constructor(g : Game) {
        this.game = g
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        
        //Random Start positie bom
        this.posy = 200
        this.posx = Math.random() * (window.innerWidth-100) //Returns a number between 0-1400
    
        //Speed
        this.speedY = (Math.random() * 5) + 1

        //Wanneer geklikt word op bom
        this.element.addEventListener("click", ()=> this.klikBom())

        //Wanneer je op telefoon scherm klikt
        this.element.addEventListener("touchstart", ()=> this.klikBom());
    }

    public update():void {
        this.posy =this.posy + this.speedY
        
        let h = window.innerHeight

        //Bom terug als die uit het scherm valt.
        if (this.posy >= h-200){
            //console.log("einde")
            this.posy = -300
            this.game.destroyBuilding()
        }
   
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }

    public klikBom(){
        //Random begin positie
        this.posy = (Math.random()  + 1) * -500
        
        //Bom is geklikt, dus voeg punt toe
        this.geklikt = true
        return this.geklikt
    }
}