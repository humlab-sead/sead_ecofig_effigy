"use strict";
/*
 Creates a Cesium Model for a ecofig boundry
*/

import { default as utility } from './CesiumUtility.js';

class EcofigBoundryModelStrategy {

    constructor(boundryStrategy, options)
    {
        this.boundryStrategy = boundryStrategy;
        this.options = options;
    }

    createTooltip(ecofig) {
        return ecofig.values.reduce( (a, b) => a + b.ecoCode.label + ' ' + Math.round(b.scale * 100) + '%<br/>', '');
    }

    toCartesian(coordinates)
    {
        return utility.fromDegreesArray(coordinates);
    }

    flatten(coordinates) {
        return coordinates.reduce((a, b) => a.concat(b), []);
    }
}

class PolygonEcofigBoundryModelStrategy extends EcofigBoundryModelStrategy {

    create(ecofig) {

        let coordinates = this.flatten(this.boundryStrategy.create(ecofig));

        return {
            //name : ecofig.site,
            description: this.createTooltip(ecofig),
            polygon : {
                hierarchy : {
                    positions: this.toCartesian(coordinates),
                },
                material : ecofigMaterialStrategy.create(ecofig, this.options)
            }
        }       
    }
}

class CircleEcofigBoundryModelStrategy extends EcofigBoundryModelStrategy {

    create(ecofig) {
        return {
            position: utility.cartesian3.fromDegrees(ecofig.position[0], ecofig.position[1], 0),
            //name: ecofig.site,
            description: this.createTooltip(ecofig),
            ellipse : {
                semiMinorAxis : 10000.0,
                semiMajorAxis : 15000.0,
                extrudedHeight : 0.0,
                //rotation : utility.toRadians(45),
                material : ecofigMaterialStrategy.create(ecofig, this.options),
                outline : false
            }
        }
        // return {
        //     position: ecofig.position.slice(),
        //     name : ecofig.site,
        //     ellipse : {
        //         semiMinorAxis : 0.15,
        //         semiMajorAxis : 0.2,
        //         //extrudedHeight : 0.0,
        //         //rotation : utility.toRadians(45),
        //         material : ecofigMaterialStrategy.create(ecofig, this.options),
        //         outline : false
        //     }
        // };     
    }
}

const ecofigMaterialStrategy = {
    
    // FIXME Allow more kind of materials...
    create(ecofig, options)
    {
        if ('imageUrl' in options) {
            return options.imageUrl;
        }
        let wateryScale = ecofig.wateryScale();
        if (wateryScale >= 0.4) {
            return './assets/Textures/water.jpg'
        }
        if (wateryScale >= 0.0) {
            return utility.blueColor(wateryScale * 0.25);
            //return new Cesium.Material({
                // baseWaterColor: rgba color object base color of the water.
                // blendColor: rgba color object used when blending from water to non-water areas.
                // specularMap: Single channel texture used to indicate areas of water.
                // normalMap: Normal map for water normal perturbation.
                // frequency: Number that controls the number of waves.
                // normalMap: Normal map for water normal perturbation.
                // animationSpeed: Number that controls the animations speed of the water.
                // amplitude: Number that controls the amplitude of water waves.
                // specularIntensity: Number that controls the intensity of specular reflections.
            //});
        }
        return utility.fromCssColorString(options.bgColor.rgb, options.bgColor.a)
    }
}

// FIXME Add more advanced strategies

export { CircleEcofigBoundryModelStrategy, PolygonEcofigBoundryModelStrategy } ;
