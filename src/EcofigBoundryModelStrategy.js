"use strict";
/*
 Creates a Cesium Model for a ecofig boundry
*/

// var Cesium = require('cesium/Source/Cesium');
import { default as utility } from './CesiumUtility.js';

class CircleEcofigBoundryModelStrategy {

    constructor(boundryStrategy, config)
    {
        this.boundryStrategy = boundryStrategy;
        this.config = config;
    }

    createMaterial()
    {
        return utility.fromCssColorString(this.config.bgColor.rgb, this.config.bgColor.a)
    }

    // FIXME
    createTooltip(ecofig) {
        return ecofig.values.reduce( (a, b) => a + b.ecoCode.label + ' ' + b.scale + '%<br/>', '');
    }

    transformCoordinates(coordinates)
    {
        return utility.fromDegreesArray(coordinates);
    }

    create(ecofig) {

        let coordinates = this.boundryStrategy.create(ecofig).reduce((a, b) => a.concat(b), []);

        return {
            name : "Environment",
            description: this.createTooltip(ecofig),
            polygon : {
                hierarchy : {
                    positions: this.transformCoordinates(coordinates),
                },
                material : this.createMaterial()
            }
        }       
    }


    
}

export { CircleEcofigBoundryModelStrategy } ;
