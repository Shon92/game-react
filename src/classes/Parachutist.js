class Parachutist {
    #imgSrc = require('../data/pictures/parachutist.png');
    #offsetFromLeft;
    #offsetFromTop = 0;
    #width = 20;
    #height = 30;

    #isParachute = true;

    constructor(offsetFromLeft = 275){
        this.offsetFromLeft = offsetFromLeft;
    }

    updateLocations = () => {
        if(this.#offsetFromTop < 70){
            this.#offsetFromTop++;
        } else {
            this.#isParachute = false;
        }
    };

    isParachute = () => this.#isParachute;

    getOffsetFromTop = () => this.#offsetFromTop;

    getOffsetFromLeft = () => this.#offsetFromLeft;

    render(context, loadImage){
        if(this.#isParachute){
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
}

export default Parachutist;