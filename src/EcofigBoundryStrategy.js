"use strict";
// Creates a coordinate array that specifies the boundry around a indicatorSet

class EcofigBoundryStrategy {

    constructor() {
        this.circleZRotStep = Math.PI / 4.0;
        this.defaultCircle = this.createDefaultCircle();
    }

    create() {
        return null;
    }

    createDefaultCircle() {
        var circleCoords = [];
        for (var circleZRot = 0.0; circleZRot < 2 * Math.PI; circleZRot += this.circleZRotStep) {
            circleCoords.push([ Math.sin(circleZRot), Math.cos(circleZRot) ]);
        }
        return circleCoords;
    }
}

class SimpleCircleEcofigBoundryStrategy extends EcofigBoundryStrategy {

    // A same-size circle layout strategy for marker boundry
    constructor(scale=[0.2, 0.15]) {
        super();
        this.scale = scale;
    }

    create(ecofig) {
        let origo = ecofig.this.position;
        return this.defaultCircle.map(c =>
            [ this.scale[0] * c[0] + origo[0], this.scale[1] * c[1] + origo[1]]);
    }

}

export { SimpleCircleEcofigBoundryStrategy };
