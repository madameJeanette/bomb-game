class Bomb {
    
    private element: HTMLElement
    private posy:number
    private posx:number
    private clicked:boolean
        
    constructor() {
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);

        this.element.addEventListener("click", ()=> this.setClicked(true))
        
        this.posy = 200
        this.posx = 220
    }

    public getClicked(){ : boolean {
        return this.clicked
    }}
    public setClicked(){ : boolean {
        return this.clicked
    }}
  

    public update():void {
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}