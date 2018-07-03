class Ball {
    constructor(game){
        // paraméterekből beállítás
        this.game = game;

        // labda HTML elem létrehozása
        this.element = document.createElement('div');
        this.element.className = 'ball';

        // játékhoz csatolás
        this.game.element.appendChild(this.element);

        // pozicionálás
        this.SetBottomDistance(
            this.game.element.clientHeight - this.GetHeight()
        );
        this.SetLeftDistance(this.GetRandomXPosition());

        // zuhanás elkezdée
        this.Fall();
    }

    Fall() {

        if (this.destroyed) {
            return;
        }

        // ha beleesett a dobozba
        if (this.GetBottomDistance() <= this.game.box.GetHeight()) {
            this.TriggerFellInline();
        }

        // megsemmisítés ha leesett
        if (this.GetBottomDistance() <= 0) {
            this.Destroy();
            this.TriggerFellOff();
            return;
        }

        // mozgás
        this.SetBottomDistance(this.GetBottomDistance() - 1);

        // mozgás időzítése
        setTimeout(() => {
            this.Fall();
        }, 5); 
    }


    // alsó távolság
    GetBottomDistance(){
        return +this.element.style.bottom.replace('px', '');
    }

    SetBottomDistance(distance){
        this.element.style.bottom = distance + 'px';
    }

    // bal oldali távolság
    GetLeftDistance(){
        return +this.element.style.left.replace('px', '');
    }

    SetLeftDistance(distance){
        this.element.style.left = distance + 'px';
    }

    // magasság és szélesség
    GetHeight(){
        return this.element.clientHeight;
    }

    GetWidth(){
        return this.element.clientWidth;
    }

    // eltűntetés
    Destroy(){
        this.element.style.display = 'none';
        this.destroyed = true;
    }


    // random X pozíció
    GetRandomXPosition(){
        let gameWidth = this.game.element.clientWidth,
            ballWidth = this.GetWidth();
        return Math.round(Math.random() * (gameWidth - ballWidth));
    }


    // események
    TriggerFellOff(){
        window.dispatchEvent(new Event('ball/fellOff'));
    }

    TriggerFellInline(){
        window.dispatchEvent(
            new CustomEvent('ball/fellInline', {
                detail: this
            })
        );
    }
}