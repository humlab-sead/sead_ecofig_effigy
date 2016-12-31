"use strict";
/*
 Creates a Cesium Model for a ecofig boundry
*/

var Cesium = require('cesium/Source/Cesium');

class CircleEcofigBoundryModelStrategy {

    constructor(boundryStrategy, config)
    {
        this.boundryStrategy = boundryStrategy;
        this.config = config;
    }

    createBoundryFor(ecofig) {

        let polyCoords = this.boundryStrategy.create(ecofig).reduce((a, b) => a.concat(b), []);
        return {
            name : "Environment",
            description: this.createTooltip(ecofig),
            polygon : {
                hierarchy : {
                    positions: Cesium.Cartesian3.fromDegreesArray(polyCoords),
                },
                material : Cesium.Color.fromCssColorString(this.config.rgb, this.config.a)
            }
        }       
    }

    createTooltip(ecofig) {
        return ecofig.values.reduce( (a, b) => a + b.ecoCode.label + ' ' + b.scale + '%<br/>', '');
    }
    
}

export { CircleEcofigBoundryModelStrategy } ;
