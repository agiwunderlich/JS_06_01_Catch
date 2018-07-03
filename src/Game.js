class Game {
    constructor(elementID, box) {

        // element
        this.element = document.getElementById(elementID);

        // box objektum
        this.box = box;

        // életek
        this.lifes = 3;
        this.spanLifeCounter = document.getElementById('lifeCounter');
        this.UpdateLifes();

        // pontok
        this.points = 0;
        this.spanPointCounter = document.getElementById('pointCounter');
        this.UpdatePoints();

        // doboz létrehozása
        this.box = new Box('box', this);

        // labdák indítása
        this.GenerateBalls();

        // feliratkozások
        window.addEventListener('ball/fellOff', () => {
            this.OnBallFellOff();
        });

        window.addEventListener('ball/fellInline', () => {
            this.OnBallFellInline(event);
        });

    }

    GenerateBalls() {
        new Ball(this);

        setTimeout(() => {
            this.GenerateBalls();
        }, 1000);
    }

    // eseménykezelők
    OnBallFellOff() {
        if (this.IsGameOver()) {
            return
        }

        this.DecreaseLifes();
    }

    OnBallFellInline(event) {
        if (this.IsGameOver()) {
            return
        }

        let ball = event.detail;

        if (this.HasIntersection(this.box, ball)) {
            // labda eltűnése
            ball.Destroy();

            // pontszám növelése
            this.IncreasePoints();
        }
    }



    DecreaseLifes() {
        this.lifes--;
        this.UpdateLifes();
        if (this.IsGameOver()) {
            alert('Game Over');
        }
    }

    IncreasePoints() {
        this.points++;
        this.UpdatePoints();
    }

    UpdateLifes() {
        this.spanLifeCounter.innerText = this.lifes;
    }

    UpdatePoints() {
        this.spanPointCounter.innerText = this.points;
    }

    IsGameOver() {
        return this.lifes == 0;
    }

    HasIntersection(box, ball) {
        let boxLeft = box.GetLeftDistance(),
            boxRight = boxLeft + box.GetWidth(),
            ballLeft = ball.GetLeftDistance(),
            ballRight = ballLeft + ball.GetWidth();

        if (boxLeft <= ballLeft && ballRight <= boxRight) {
            return true;
        }
        return false;
    }
}