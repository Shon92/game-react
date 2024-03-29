import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/constants';

class Player {
    #lives = 3;
    #score = 0;

    die = () => {
        this.#lives--;
    };

    incrementScore = () => {
        this.#score += 10;
    };

    getLives = () => this.#lives;

    render = (fillText, context) => {
        context.clearRect(0, 0, SCREEN_HEIGHT, SCREEN_WIDTH);

        if(this.#lives > 0){
            fillText(`lives: ${this.#lives}`, 10);
            fillText(`score: ${this.#score}`, 20);
        } else {
            fillText(`Game over! score is ${this.#score}`, 10);
        }
    };
}

export default Player;