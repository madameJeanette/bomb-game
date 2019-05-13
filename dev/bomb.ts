class Bomb {
    
    private element: HTMLElement
    private posy:number
    private posx:number
    private clicked:boolean
    private g:Game
        
    constructor(g:Game) {
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);

        this.element.addEventListener("click", ()=> this.bombClicked())
        
        this.posy = 200
        this.posx = 220
    }

    public bombClicked():void {
        this.g.scorePoint
    }
  

    public update():void {
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}