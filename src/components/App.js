import React, { Component } from 'react';
import Plane from '../classes/Plane';
import Boat from '../classes/Boat';
import Parachutist from '../classes/Parachutist';
import Player from '../classes/Player';
import { SECOND } from './constants';
import '../style/index.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();

        this.intervals = [];

        this.sky = {
            img: require('../data/pictures/background.png'),
            offsetFromLeft: 0,
            offsetFromTop: 30,
            width: 300,
            height: 85
        };

        this.sea = {
            img: require('../data/pictures/sea.png'),
            offsetFromLeft: 0,
            offsetFromTop: 95,
            width: 300,
            height: 150
        };
    }

    componentDidMount() {
        if(this.canvas.current){
            this.context = this.canvas.current.getContext('2d');

            this.boat = new Boat();
            this.player = new Player();
            this.parachutists = [];
        }

        this.intervals = [
            setInterval(this.renderCanvas, SECOND * 0.1),
            setInterval(this.renderPlaneRound, SECOND * 5),
            setInterval(this.renderParachutists, SECOND)
        ];

        setTimeout(() => {
            this.gameOver();
        }, SECOND * 60 * 60);

        window.addEventListener('keydown', ({ keyCode }) => this.boat.handleKeys(keyCode));
    }

    renderCanvas = () => {
        this.loadImage(this.sky);
        this.loadImage(this.sea);

        this.boat.render(this.context, this.loadImage);
        this.player.render(this.fillText, this.context);

        if(this.player.getLives() <= 0){
            this.gameOver();
        }
    };

    renderPlaneRound = () => {
        const plane = new Plane();

        const renderPlaneInterval = setInterval(() => {
            this.intervals = [
                ...this.intervals,
                renderPlaneInterval
            ];

            if(!plane.isFinished()){
                plane.render(this.loadImage);

                if(!plane.isDroppedParachutist() && Math.round(plane.getParachutistOffsetFromLeft()) === Math.round(plane.offsetFromLeft)) {
                    const parachutist = new Parachutist(plane.offsetFromLeft);

                    this.parachutists = [
                        ...this.parachutists,
                        parachutist
                    ];
                }
            } else {
                clearInterval(renderPlaneInterval);
            }
        }, 50);
    };

    renderParachutists = () => {
        this.parachutists.forEach((parachutist) => {
            const interval = setInterval(() => {
                this.intervals = [
                    ...this.intervals,
                    interval
                ];

                parachutist.render(this.context, this.loadImage);

                if(parachutist.isParachute() && Math.round(parachutist.getOffsetFromTop()) === 70){
                    if(Math.abs(this.boat.getOffsetFromLeft() - parachutist.getOffsetFromLeft()) < 30){
                        this.player.incrementScore();
                    } else {
                        this.player.die();
                    }
                }
            }, 100);

            if(!parachutist.isParachute()){
                clearInterval(interval);
            }
        });
    };

    gameOver = () => {
        this.intervals.forEach(interval => clearInterval(interval));

        console.log(`Game over! score is ${this.player.getScore()}`);
    };

    loadImage = ({
                     img,
                     offsetFromLeft,
                     offsetFromTop,
                     width,
                     height
    }) => {
        const image = document.createElement('img');
        image.setAttribute('src', img);

        image.onload = () => {
            this.context.drawImage(image, offsetFromLeft, offsetFromTop, width, height);
        };
    };

    fillText = (text, offsetFromTop) => {
        this.context.fillText(text, 1, offsetFromTop);
    };

    render() {
        return (
            <div className="container">
                <h1>Parachutes Game</h1>
                <canvas ref={this.canvas}/>
            </div>
        );
    }
}

export default App;