class Boat {

    cycleWidth = 300;
    offsetFromLeft = 270;
    offsetFromTop = 80;
    width = 30;
    height = 20;
    imgSrc = require('../data/pictures/boat.png');

    handleKeys = (keyCode) => {
        if(keyCode === 37 && this.offsetFromLeft > 0){
            this.offsetFromLeft -= 4;
        } else if (keyCode === 39 && this.offsetFromLeft < this.cycleWidth - this.width){
            this.offsetFromLeft += 4;
        }
    };

    getOffsetFromLeft = () => this.offsetFromLeft;

    render = (context, loadImage) => {
        context.clearRect(0, 0, 1000, 300);

        const obj = {
            img: this.imgSrc,
            offsetFromLeft: this.offsetFromLeft,
            offsetFromTop: this.offsetFromTop,
            width: this.width,
            height: this.height
        };

        loadImage(obj);
    };
}

export default Boat;