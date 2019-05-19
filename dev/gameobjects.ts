class GameObject {
    // public element: HTMLElement
    public posx:number
    public posy:number


    constructor(posx: number, posy: number) {
        //number, xpos:number, ypos:number,screenW:number, screenH:number,randomNumW:number,randomNumH:number
        this.posx = posx
        this.posy = posy
        // this.div = document.createElement(element)
        // document.body.appendChild(this.div)


    }

    update() {
        // this.div.style.transform = `translate(${this.x}px, ${this.y}px`

        // this.div.style.transform = `translate(${this.xpos}px, ${this.ypos}px`

    }


}