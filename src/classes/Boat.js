import { LEFT_ARROW_CODE, MAX_LEFT, RIGHT_ARROW_CODE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/constants';

class Boat {
    #imgSrc = require('../data/pictures/boat.png');
    #offsetFromLeft = 270;
    #offsetFromTop = 80;
    #width = 30;
    #height = 20;

    handleKeys = (keyCode) => {
        if(keyCode === LEFT_ARROW_CODE && this.#offsetFromLeft > 0){
            this.#offsetFromLeft -= 4;
        } else if (keyCode === RIGHT_ARROW_CODE && this.#offsetFromLeft < SCREEN_WIDTH - this.#width){
            this.#offsetFromLeft += 4;
        }
    };

    mouseMove = (screenX) => {
        if(this.#offsetFromLeft + screenX > 0 && this.#offsetFromLeft + screenX < MAX_LEFT)
        this.#offsetFromLeft += screenX;
    };

    getOffsetFromLeft = () => this.#offsetFromLeft;

    render = (context, loadImage) => {
        context.clearRect(0, 0, SCREEN_HEIGHT, SCREEN_WIDTH);

        const obj = {
            img: this.#imgSrc,
            offsetFromLeft: this.#offsetFromLeft,
            offsetFromTop: this.#offsetFromTop,
            width: this.#width,
            height: this.#height
        };

        loadImage(obj);
    };
}

export default Boat;