class Box {
    constructor(box, game){
        this.element = document.getElementById('box');
        this.game = game;
        this.mouseX = null;

        // feliratkozás
        game.element.addEventListener('mousemove', event => {
            this.OnMouseMove(event.clientX);
        });
    }

    // eseménykezelő
    OnMouseMove(mouseX){
        if (mouseX == this.mouseX) {
            return;
        }
       this.mouseX = mouseX;
       this.UpdatePosition();
    }

    // szélesség és magasság
    GetWidth(){
        return this.element.clientWidth;
    }

    GetHeight(){
        return this.element.clientHeight;
    }

    // pozíció
    UpdatePosition(){

        // számoláshoz szükséges értékek
        let boxWidth = this.GetWidth(),
        boxHalfWidth = boxWidth / 2,
        gameWidth = this.game.element.clientWidth,
        elementLeft = this.mouseX - boxHalfWidth;
        
        // határok betartása
        elementLeft = Math.max(0, elementLeft);
        elementLeft = Math.min(elementLeft, gameWidth - boxWidth);

        // HTML elem bal pozíciójának beállítása
        this.element.style.left = elementLeft + 'px'; 
        
        

    }

    GetLeftDistance(){
        return +this.element.style.left.replace('px', '');
    }
}