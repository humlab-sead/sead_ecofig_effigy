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
    constructor() {
        super();
    }

    create(ecoFig) {
        let lng = ecoFig.this.position[0];
        let lat = ecoFig.this.position[1];
        return this.defaultCircle.map(c => [ 0.2 * c[0] + lng, 0.15 * c[1] + lat]);
    }

}

export { SimpleCircleEcofigBoundryStrategy };
