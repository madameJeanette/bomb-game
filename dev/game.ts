class Game {
    
    private score:number = 0
    private destroyed:number = 0
    private moveImage:number = 0
    private textfield:HTMLElement
    private statusbar:HTMLElement
    private bomb:Bomb[] = []
    private car:Car
    private static instance: Game      
    

    private constructor() {
        
    }
    public initGame(){  //gameloop functie voor singleton
       
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement //Score-Bord
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement//Huisjes

        //this.bomb = new Bomb()
        this.car = new Car()                            //Zorgt ervoor dat de "Car"-afbeelding zichtbaar is in de game
        
        //Push aantal Bommen
        for (let i = 0; i < 4; i++) {
            this.bomb.push(new Bomb())              //In de parameter geven we game.ts mee
        }
    
        this.gameLoop()

    }

    public static getInstance() {
        if (! this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    private gameLoop():void{
        //console.log("updating the game")
        this.car.update()                               //Zegt dat functie "update" van auto in de gameloop moet zitten.
                                      
        //Update elke bom die aangemaakt word.
        for(let b of this.bomb){
            //update staat in balloon.ts
            b.update()

            if(b.geklikt === true){
                this.scorePoint()
                b.geklikt = false
            }
        }

        //if(this.bomb.geklikt === true)
        //Stop game-loop als je 4 levens verloren hebt
        if(this.destroyed <= 3){
            requestAnimationFrame(() => this.gameLoop())    //De functie roept steeds zichzelf op.
        }else{
            console.log("stop")
        }
        
    }

    public destroyBuilding(){
        this.destroyed++

        this.moveImage = this.moveImage - 72
        console.log("buildings destroyed " + this.destroyed)

        this.statusbar.style.backgroundPosition = this.moveImage + "px"
    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }

    public restartGame(){
        this.score = 0;
        this.textfield.innerHTML = "Score: " + this.score
        this.bomb.forEach(function(element){
            element.resetPosition()
        })
        this.destroyed = 0;
        this.moveImage = 0;
        this.statusbar.style.backgroundPosition = '0px'
      //  this.gameLoop()
    
    }
} 

window.addEventListener("load", () => {
    let gameOne = Game.getInstance()
    gameOne.initGame()
})