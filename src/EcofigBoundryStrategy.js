"use strict";
// Creates a coordinate array that specifies the boundry around a indicatorSet

class EcofigBoundryStrategy {

    constructor() {
        this.circleZRotStep = Math.PI / 4.0;
        this.defaultCircle = this.createDefaultCircle();
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

    create(ecofig, scale=[0.2, 0.15]) {
        let origo = ecofig.position;
        return this.defaultCircle.map(c => [ scale[0] * c[0] + origo[0], scale[1] * c[1] + origo[1]]);
    }

}

export { SimpleCircleEcofigBoundryStrategy };
