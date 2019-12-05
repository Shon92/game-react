import  {MAX_LEFT } from '../components/constants';

class Plane {
    #imgSrc = require('../data/pictures/plane.png');
    #offsetFromLeft = 299;
    #offsetFromTop = 0;
    #width = 30;
    #height = 15;

    #finished = false;
    #parachutistOffsetFromLeft = Math.random() * MAX_LEFT;

    isFinished = () => this.#finished;

    updateLocations = () => {
        if(this.#offsetFromLeft > 0){
            this.#offsetFromLeft--;
        } else {
            this.#finished = true;
        }
    };

    getOffsetFromLeft = () => this.#offsetFromLeft;

    getParachutistOffsetFromLeft = () => this.#parachutistOffsetFromLeft;

    render(loadImage){
        const obj = {
            img: this.#imgSrc,
            offsetFromLeft: this.#offsetFromLeft,
            offsetFromTop: this.#offsetFromTop,
            width: this.#width,
            height: this.#height
        };

        loadImage(obj);

        this.updateLocations();
    }
}

export default Plane;